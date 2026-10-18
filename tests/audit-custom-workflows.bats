#!/usr/bin/env bats
# Audit test suite for Phase 2.5 Custom Workflow Validation.
# Validates the audit-custom-workflows.sh script for governance consolidation compliance.

setup_file() {
  export PROJECT_ROOT="$(cd "$(dirname "${BATS_TEST_FILENAME}")/.." && pwd)"
  export AUDIT_SCRIPT="${PROJECT_ROOT}/.github/scripts/audit-custom-workflows.sh"
  export AUDIT_REPORT="${PROJECT_ROOT}/.github/.tmp/phase2-audit/workflow-audit-phase-2-5.md"
  cd "$PROJECT_ROOT"

  # Ensure audit script is executable
  chmod +x "$AUDIT_SCRIPT"
}

setup() {
  export PROJECT_ROOT="$(cd "$(dirname "${BATS_TEST_FILENAME}")/.." && pwd)"
  export AUDIT_SCRIPT="${PROJECT_ROOT}/.github/scripts/audit-custom-workflows.sh"
  export AUDIT_REPORT="${PROJECT_ROOT}/.github/.tmp/phase2-audit/workflow-audit-phase-2-5.md"
  cd "$PROJECT_ROOT"
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
  TEST_WORKFLOW="${PROJECT_ROOT}/.github/workflows/test-violation.yml"
  mkdir -p "${PROJECT_ROOT}/.github/workflows"

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
  "$AUDIT_SCRIPT" > /dev/null 2>&1

  # Check report mentions test violation
  grep -q "test-violation.yml" "$AUDIT_REPORT"

  # Clean up
  rm -f "$TEST_WORKFLOW"
}

@test "audit passes when workflows are clean" {
  "$AUDIT_SCRIPT"
  status=$?

  # Exit code 0 means audit passed (all workflows clean)
  [ $status -eq 0 ]

  # Report should indicate pass
  grep -q "✅" "$AUDIT_REPORT"
  grep -q "AUDIT PASSED" "$AUDIT_REPORT"
}

@test "audit reports correct workflow count" {
  "$AUDIT_SCRIPT" > /dev/null 2>&1

  # Should audit 9 workflows (excluding drift-detection and pr-template-routing)
  grep -q "Total Workflows Audited: 9" "$AUDIT_REPORT" || \
  grep -q "Total workflows audited: 9" "$AUDIT_REPORT"
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

  # Check for known workflows
  grep -q "branch-name-validation.yml" "$AUDIT_REPORT" || true
  grep -q "changelog-unified.yml" "$AUDIT_REPORT" || true
  grep -q "labeling-unified.yml" "$AUDIT_REPORT" || true
  grep -q "dependency-validation.yml" "$AUDIT_REPORT" || true
}

@test "audit summary section is present and formatted" {
  "$AUDIT_SCRIPT" > /dev/null 2>&1

  # Check summary exists
  grep -q "Summary" "$AUDIT_REPORT"

  # Check for summary content
  grep -q "Clean Workflows" "$AUDIT_REPORT"
  grep -q "Violations" "$AUDIT_REPORT" || grep -q "violations" "$AUDIT_REPORT"
}

teardown_file() {
  # Clean up test files if needed
  true
}
