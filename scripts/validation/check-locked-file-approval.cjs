/**
 * Locked Files Guard — Constitution Principle II
 *
 * Validates that changes to locked configuration files are approved
 * via linked change-request issues or the change-requests register.
 *
 * Locked files are loaded from .github/PROTECTED_FILES.txt, which serves
 * as the canonical list of protected files and directories.
 */

const fs = require('fs');
const path = require('path');

// Load protected files from canonical list
function loadLockedPaths() {
  const protectedFilesPath = path.join(__dirname, '../../.github/PROTECTED_FILES.txt');
  const content = fs.readFileSync(protectedFilesPath, 'utf8');

  const paths = [];
  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith('#')) return;

    if (trimmed.endsWith('/')) {
      // Directory pattern: convert to regex
      const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      paths.push(new RegExp(`^${escaped}`));
    } else {
      // Exact path match
      paths.push(trimmed);
    }
  });

  return paths;
}

const LOCKED_PATHS = loadLockedPaths();

const REGISTER_PATH = '.github/reports/audits/2026-09-14-label-audit/evidence/change-requests.json';

/**
 * Check if a file path is locked
 */
function isLocked(filePath) {
  for (const pattern of LOCKED_PATHS) {
    if (pattern instanceof RegExp) {
      if (pattern.test(filePath)) return true;
    } else {
      if (filePath === pattern) return true;
    }
  }
  return false;
}

/**
 * Check if a title is a change-request issue
 */
function isChangeRequestTitle(title) {
  return /\[(?:LABEL|ISSUE-TYPE|TEMPLATE)-UPDATE-REQUEST\]/.test(title);
}

/**
 * Extract linked issues from PR body using GitHub's link patterns
 */
async function linkedIssues(github, body, repo) {
  if (!body) return [];

  // Use GitHub's own issue link detection: look for #NNN patterns
  // This matches what GitHub's REST API returns when rendering the body
  const issuePattern = /#(\d+)/g;
  const issues = [];
  let match;

  while ((match = issuePattern.exec(body)) !== null) {
    issues.push(parseInt(match[1], 10));
  }

  return issues;
}

/**
 * Evaluate whether locked file changes are approved
 */
function evaluate({
  changedFiles,
  issues,
  register,
  commentsByIssue,
  titlesByIssue,
  lookupFailures,
}) {
  const lockedFiles = changedFiles.filter(isLocked);

  if (lockedFiles.length === 0) {
    return {
      ok: true,
      message: '✅ Locked Files Guard\n\nNo locked configuration files were changed.',
    };
  }

  // Some locked files were changed; check for approval
  const messages = ['### Locked Files Guard\n'];
  messages.push(`**${lockedFiles.length}** locked configuration file(s) changed:\n`);

  lockedFiles.forEach((file) => {
    messages.push(`- \`${file}\``);
  });
  messages.push('');

  // Check if any linked issue is an approved change request
  let approvalFound = false;
  const approvedByIssue = {};

  for (const issue of issues) {
    const title = titlesByIssue[issue];
    if (!title) continue;
    if (!isChangeRequestTitle(title)) continue;

    // Check if the issue has an "Approved" comment by @ashley
    const comments = commentsByIssue[issue] || [];
    const hasApproval = comments.some((comment) => {
      const isAshley = comment.user && comment.user.login === 'ashley';
      const isApprovedComment = /^approved/i.test(comment.body.trim());
      return isAshley && isApprovedComment;
    });

    // Also check the change-requests register
    let inRegister = false;
    if (register && register.approved) {
      inRegister = register.approved.some(
        (req) => req.issue_number === issue && req.status === 'approved'
      );
    }

    if (hasApproval || inRegister) {
      approvalFound = true;
      approvedByIssue[issue] = true;
    }
  }

  if (approvalFound) {
    messages.push('✅ **Approval found** for locked file changes.\n');
    messages.push(
      'This pull request links to an approved change-request issue.'
    );
    return {
      ok: true,
      message: messages.join('\n'),
    };
  }

  // No approval found; fail the check
  messages.push(
    '❌ **Approval required** to change locked configuration files.\n'
  );
  messages.push(
    'To change these files, open a GitHub issue with one of these tags:'
  );
  messages.push('- `[LABEL-UPDATE-REQUEST]` — to change `.github/labels.yml`');
  messages.push(
    '- `[ISSUE-TYPE-UPDATE-REQUEST]` — to change `.github/issue-types.yml`'
  );
  messages.push(
    '- `[TEMPLATE-UPDATE-REQUEST]` — to change PR/issue templates'
  );
  messages.push('');
  messages.push(
    'Then link that issue in your pull request description and wait for approval.'
  );

  if (lookupFailures.length > 0) {
    messages.push('');
    messages.push(
      '⚠️ **Warning:** Some linked issues could not be checked for approval:'
    );
    lookupFailures.forEach((failure) => {
      messages.push(`- Issue #${failure.issue}: ${failure.message}`);
    });
    messages.push('');
    messages.push(
      'Re-run this check after the issues are accessible.'
    );
  }

  return {
    ok: false,
    message: messages.join('\n'),
  };
}

module.exports = {
  isLocked,
  isChangeRequestTitle,
  linkedIssues,
  evaluate,
  LOCKED_PATHS,
  REGISTER_PATH,
};
