# T068: Static skill evidence — validation pending

**Updated:** 2026-10-26\
**Specification:** [Spec 003](../spec.md)\
**Task references:** T042 and T068 in [tasks.md](../tasks.md#skill--specification-validation)\
**Status:** PENDING — source inspection and lexical path scan only.

## Scope and corrected outcomes

All six `.claude/skills/<name>/SKILL.md` sources were read through their shared
`.agents/skills/` symlinks. The previous report did not retain commands or outputs
supporting its 24/24 scenario results, 18/18 path count, 158-label taxonomy,
functional validation scripts or 15 passing Figma Jest tests. Those results are
withdrawn. Static inspection cannot establish successful execution, rejection
behavior, complete coverage or remote label availability. No Jest results are
claimed here.

T042 requires draft, report and permission-denied scenarios for each skill.
An invalid format or branch name is not evidence of handling permission denial.
No captured scenario execution is available, so all required exercises remain
pending. “Missing policy” was an extra scenario in the previous report and also
has no captured result.

| Skill | Static finding | Draft | Report | Permission denied |
| --- | --- | --- | --- | --- |
| branch-validation | Documents a naming script and branch restrictions | PENDING | PENDING | PENDING |
| changelog | Documents entry format and an explicit protected-file boundary | PENDING | PENDING | PENDING |
| labeling | Documents label prefixes and a remote-write authority boundary | PENDING | PENDING | PENDING |
| test | Documents test commands; configured commands do not prove successful tests | PENDING | PENDING | PENDING |
| validate | Describes assessment and separately authorised execution | PENDING | PENDING | PENDING |
| workflow-orchestration | Provides prompt/report/task templates and lifecycle instructions | PENDING | PENDING | PENDING |

## Path evidence

[Captured scan output](./T068-path-scan.txt) lists every candidate selected by the
command below with its source line numbers, literal reference, resolved path and
result. It also records each resolved skill source's full SHA-256 and the checkout
revision. Counts are unique lexical candidates **per skill**, not distinct files
or a replacement “all paths passed” total. Repeated references retain all source
line numbers. The scan reads prose, code fences and examples; it removes URLs
without fetching remote policies.

Resolution rules: `./` and `../` are relative to the skill source directory;
other local references are repository-root-relative, with a leading `/` treated
as the documented repository path convention. `EXISTS` checks filesystem presence
only. `MISSING` reports literal absence, including hypothetical output/example
names; it is not automatically a broken-link finding. `GLOB` records matches,
`TEMPLATE` requires instantiation, and `NONPATH` marks recognised syntax examples.

| Skill source | Captured candidate results |
| --- | --- |
| `.claude/skills/branch-validation/SKILL.md` | `{'EXISTS': 6, 'GLOB': 1, 'MISSING': 2, 'NONPATH': 3}` |
| `.claude/skills/changelog/SKILL.md` | `{'EXISTS': 3}` |
| `.claude/skills/labeling/SKILL.md` | `{'EXISTS': 4}` |
| `.claude/skills/test/SKILL.md` | `{'EXISTS': 9, 'GLOB': 2, 'MISSING': 1}` |
| `.claude/skills/validate/SKILL.md` | `{'EXISTS': 8, 'MISSING': 2, 'NONPATH': 1}` |
| `.claude/skills/workflow-orchestration/SKILL.md` | `{'EXISTS': 15, 'GLOB': 1, 'MISSING': 29, 'NONPATH': 2, 'TEMPLATE': 28}` |

Specific unresolved references include `.github/CLAUDE.md` and
`.github/docs/BRANCHING_STRATEGY.md` in branch-validation, and the skill-relative
`../guidelines/accessibility-checklist.md` and
`../guidelines/backend-integration-deployment.md` links in test and
workflow-orchestration. Workflow template filenames are also mentioned as
examples of files that do not exist. Source-relative shorthand, generated-output
names, Figma-style paths and template instantiations need contextual review.
The lexical scan is reproducible evidence of these observations; it does not
prove exhaustive semantic path validation or satisfy all T042 exercises.

## Executed check and reproduction

Run this exact command from the repository root with Python 3 and Git. It reads
skill text as data and never executes commands from skill examples. The only
subprocess reads the Git revision. Captured stdout is linked above; exit status
was **0**. No skill-driven workflow, label change, PR creation or test suite was
executed for this report.

```bash
python3 - <<'PYSCAN' > .github/specs/003-refactor-guidelines/validation-reports/T068-path-scan.txt
from pathlib import Path
from collections import Counter, defaultdict
import hashlib, posixpath, re, subprocess
names = ('branch-validation', 'changelog', 'labeling', 'test', 'validate', 'workflow-orchestration')
pattern = re.compile(r'(?:\.{1,2}/|/)?(?:[\w.*{}@<>-]+/)+[\w.*{}@<>-]*|(?<![\w.-])[\w*.-]+\.(?:md|ya?ml|[cm]?js|tsx?|json|css)\b')
print('Static lexical path scan; repository root; no referenced commands executed.')
print('Revision:', subprocess.check_output(['git', 'rev-parse', 'HEAD'], text=True).strip())
totals = Counter()
for name in names:
    source = Path(f'.claude/skills/{name}/SKILL.md')
    print('\nSOURCE', source)
    print('Resolved SHA-256:', hashlib.sha256(source.read_bytes()).hexdigest())
    candidates = defaultdict(list)
    for number, line in enumerate(source.read_text().splitlines(), 1):
        line = re.sub(r'https?://[^\s)<>`]+', '', line)
        for match in pattern.finditer(line):
            token = match[0].rstrip('.')
            if re.search(r'\.(?:md|ya?ml|[cm]?js|tsx?|json|css)(?:\b|$)', token) or token.startswith(('./', '../', '/')) or token.split('/')[0] in {'.agents', '.claude', '.github', '.git', 'src', 'tests', 'docs', 'guidelines', 'templates', 'prompts', 'reports', 'tasks', 'dist', 'archived', 'mock', 'styles'}:
                candidates[token].append(number)
    counts = Counter()
    for token, lines in candidates.items():
        if token in {'Next.js', '/s/'} or (token.startswith('docs/') and not token.endswith('/') and not re.search(r'\.(?:md|ya?ml|[cm]?js|tsx?|json|css)\b', token)):
            result = 'NONPATH (framework, branch example or sed expression)'
        elif re.search(r'[{}<>]|YYYY-MM-DD', token):
            result = 'TEMPLATE (requires instantiation)'
        else:
            path = posixpath.normpath(posixpath.join(str(source.parent), token)) if token.startswith(('../', './')) else token.lstrip('/')
            if '*' in path:
                result = f'GLOB ({len(list(Path().glob(path)))} matches): {path}'
            else:
                result = ('EXISTS: ' if Path(path).exists() else 'MISSING: ') + path
        counts[result.split(' ', 1)[0].rstrip(':')] += 1
        print(f'{",".join(map(str, lines))}\t{token}\t{result}')
    totals.update(counts)
    print('COUNTS', dict(sorted(counts.items())))
print('\nTOTAL', dict(sorted(totals.items())))
PYSCAN
```

## Remaining T042/T068 work

- [ ] Capture a concrete draft, report and permission-denied exercise for each skill, with inputs and outputs or explicitly bounded static findings.
- [ ] Resolve or explain every example/reference path, including templates, globs and missing literals.
- [ ] Record exact commands and captured output for any runtime outcome before calling it verified.
- [ ] Reconcile the checklist and final sign-off only after the required evidence is available.

**Conclusion:** Six skill sources inspected; path scan recorded; scenario and
full path verification remain PENDING. This report does not establish Phase 3
readiness.
