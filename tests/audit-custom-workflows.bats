#!/usr/bin/env bats
# Audit test suite for Phase 2.5 Custom Workflow Validation.
# Validates the audit-custom-workflows.sh script for governance consolidation compliance.

setup() {
  local repo_root
  repo_root="$(cd "$(dirname "${BATS_TEST_FILENAME}")/.." && pwd)"
  export AUDIT_SCRIPT="${repo_root}/.github/scripts/audit-custom-workflows.sh"
  export PROJECT_ROOT="${BATS_TEST_TMPDIR}/project"
  export AUDIT_REPORT="${PROJECT_ROOT}/.github/.tmp/phase2-audit/workflow-audit-phase-2-5.md"
  export TEST_WORKFLOW="${PROJECT_ROOT}/.github/workflows/test-violation.yml"
  mkdir -p "${PROJECT_ROOT}/.github/workflows"
  cat > "${PROJECT_ROOT}/.github/workflows/clean.yml" << 'EOF'
name: Clean workflow
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: echo "test"
EOF
  # These workflows are deliberately excluded by the audit.
  cp "${PROJECT_ROOT}/.github/workflows/clean.yml" "${PROJECT_ROOT}/.github/workflows/drift-detection.yml"
  cp "${PROJECT_ROOT}/.github/workflows/clean.yml" "${PROJECT_ROOT}/.github/workflows/pr-template-routing.yml"
  cd "$PROJECT_ROOT"
}

teardown() {
  rm -f "$TEST_WORKFLOW"
}

@test "audit script exists and is executable" {
  [ -f "$AUDIT_SCRIPT" ]
  [ -x "$AUDIT_SCRIPT" ]
}

@test "audit script starts with shebang" {
  head -n 1 "$AUDIT_SCRIPT" | grep -q "^#!/bin/bash"
}

@test "audit script has proper comments" {
  grep -q "audit-custom-workflows.sh" "$AUDIT_SCRIPT"
  grep -q "Phase 2.5" "$AUDIT_SCRIPT"
}

@test "audit script source .github/workflows directory" {
  grep -q "WORKFLOW_DIR=" "$AUDIT_SCRIPT"
}

@test "running audit script without arguments succeeds" {
  "$AUDIT_SCRIPT"
  status=$?
  [ $status -eq 0 ]
}

@test "audit report file is generated" {
  # Remove old report if it exists
  rm -f "$AUDIT_REPORT"

  # Run audit
  "$AUDIT_SCRIPT" > /dev/null 2>&1

  # Check report exists
  [ -f "$AUDIT_REPORT" ]
}

@test "audit report has proper structure" {
  "$AUDIT_SCRIPT" > /dev/null 2>&1

  # Check for key sections
  grep -q "Phase 2.5 Custom Workflow Audit Report" "$AUDIT_REPORT"
  grep -q "Executive Summary" "$AUDIT_REPORT"
  grep -q "Workflow Analysis" "$AUDIT_REPORT"
  grep -q "Summary" "$AUDIT_REPORT"
}

@test "audit detects workflow violations (negative test with violation file)" {
  # Create a test workflow with violation
  cat > "$TEST_WORKFLOW" << 'EOF'
name: Test Violation
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    env:
      LABELS_CONFIG: .github/labels.yml
    steps:
      - run: echo "test"
EOF

  # Run audit
  run "$AUDIT_SCRIPT"
  [ "$status" -eq 1 ]

  # Check report mentions test violation
  grep -q "### ⚠️ test-violation.yml" "$AUDIT_REPORT"
}

@test "audit detects local labeler configuration" {
  printf '%s\n' 'LABELER_RULES: ".github/labeler.yml"' > "$TEST_WORKFLOW"

  run "$AUDIT_SCRIPT"
  [ "$status" -eq 1 ]
  grep -q "### ⚠️ test-violation.yml" "$AUDIT_REPORT"
}

@test "audit detects removed template references without copy commands" {
  for template in PULL_REQUEST_TEMPLATE ISSUE_TEMPLATE; do
    printf 'TEMPLATE: .github/%s/bug.md\n' "$template" > "$TEST_WORKFLOW"

    run "$AUDIT_SCRIPT"
    [ "$status" -eq 1 ]
    grep -q "### ⚠️ test-violation.yml" "$AUDIT_REPORT"
  done
}

@test "audit still detects template copy commands" {
  for template in PULL_REQUEST_TEMPLATE ISSUE_TEMPLATE; do
    printf 'run: cp legacy/%s/bug.md /tmp/bug.md\n' "$template" > "$TEST_WORKFLOW"

    run "$AUDIT_SCRIPT"
    [ "$status" -eq 1 ]
    grep -q "Template copy command" "$AUDIT_REPORT"
  done
}

@test "canonical labels reference does not hide a separate local reference" {
  cat > "$TEST_WORKFLOW" << 'EOF'
CANONICAL_LABELS_PATH: .canonical-github/.github/labels.yml
LOCAL_LABELS_PATH: .github/labels.yml
EOF

  run "$AUDIT_SCRIPT"
  [ "$status" -eq 1 ]
  grep -q "### ⚠️ test-violation.yml" "$AUDIT_REPORT"
}

@test "canonical labels reference does not hide a local reference on the same line" {
  for references in \
    '.canonical-github/.github/labels.yml .github/labels.yml' \
    '.github/labels.yml .canonical-github/.github/labels.yml'; do
    printf 'run: diff %s\n' "$references" > "$TEST_WORKFLOW"

    run "$AUDIT_SCRIPT"
    [ "$status" -eq 1 ]
    grep -q "### ⚠️ test-violation.yml" "$AUDIT_REPORT"
  done
}

@test "canonical variable names do not exempt local labels paths" {
  printf '%s\n' 'CANONICAL_LABELS_PATH: .github/labels.yml' > "$TEST_WORKFLOW"

  run "$AUDIT_SCRIPT"
  [ "$status" -eq 1 ]
  grep -q "### ⚠️ test-violation.yml" "$AUDIT_REPORT"
}

@test "audit allows canonical governance references and API label operations" {
  cat > "$TEST_WORKFLOW" << 'EOF'
CANONICAL_LABELS_PATH: .canonical-github/.github/labels.yml
LABELER_RULES: .canonical-github/.github/labeler.yml
PR_TEMPLATE: .canonical-github/.github/PULL_REQUEST_TEMPLATE/bug.md
ISSUE_TEMPLATE: .canonical-github/.github/ISSUE_TEMPLATE/bug.yml
run: gh api repos/owner/repo/labels
EOF

  run "$AUDIT_SCRIPT"
  [ "$status" -eq 0 ]
  grep -q "### ✅ test-violation.yml" "$AUDIT_REPORT"
}

@test "audit passes when workflows are clean" {
  "$AUDIT_SCRIPT"
  status=$?

  # Exit code 0 means audit passed (all workflows clean)
  [ $status -eq 0 ]

  # Report should indicate pass
  grep -q "✅" "$AUDIT_REPORT"
  grep -Fq '✅ **PASSED**' "$AUDIT_REPORT"
}

@test "audit reports correct workflow count" {
  "$AUDIT_SCRIPT" > /dev/null 2>&1

  # Only the clean fixture is audited; drift-detection and routing are excluded.
  grep -q 'Total Workflows Audited:\*\* 1$' "$AUDIT_REPORT"
}

@test "audit script handles verbose flag" {
  # Run with verbose flag
  output=$("$AUDIT_SCRIPT" --verbose 2>&1)

  # Should contain verbose output
  echo "$output" | grep -q "Checking" || echo "$output" | grep -q "clean"
}

@test "audit includes canonical reference patterns" {
  # Verify script has patterns for canonical references
  grep -q "canonical-github" "$AUDIT_SCRIPT"
  grep -q "\.canonical-github" "$AUDIT_SCRIPT"
}

@test "audit script creates .tmp directory" {
  TMP_DIR="${PROJECT_ROOT}/.github/.tmp/phase2-audit"
  rm -rf "$TMP_DIR"

  "$AUDIT_SCRIPT" > /dev/null 2>&1

  [ -d "$TMP_DIR" ]
  [ -f "${TMP_DIR}/workflow-audit-phase-2-5.md" ]
}

@test "all custom workflows in report" {
  "$AUDIT_SCRIPT" > /dev/null 2>&1

  grep -q "### ✅ clean.yml" "$AUDIT_REPORT"
  ! grep -q "### .*drift-detection.yml" "$AUDIT_REPORT"
  ! grep -q "### .*pr-template-routing.yml" "$AUDIT_REPORT"
}

@test "audit summary section is present and formatted" {
  "$AUDIT_SCRIPT" > /dev/null 2>&1

  # Check summary exists
  grep -q "Summary" "$AUDIT_REPORT"

  # Check for summary content
  grep -q "Clean Workflows" "$AUDIT_REPORT"
  grep -q "Violations" "$AUDIT_REPORT" || grep -q "violations" "$AUDIT_REPORT"
}
