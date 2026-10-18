#!/usr/bin/env bats

# Specification audit tests
# Phase 1: validates script structure and output
# Full specification validation deferred to Phase 2

@test "Audit scripts exist and are executable" {
  [ -x ".specify/scripts/bash/audit-specs.sh" ] &&
  [ -x ".specify/scripts/bash/validate-catalog.sh" ]
}

@test "Audit script returns success and produces output" {
  output=$(bash .specify/scripts/bash/audit-specs.sh)
  [ -n "$output" ]
  [[ "$output" == *"✓"* ]]
}

@test "Catalog validation script returns success and produces output" {
  output=$(bash .specify/scripts/bash/validate-catalog.sh)
  [ -n "$output" ]
  [[ "$output" == *"✓"* ]]
}

@test "Phase 1 specification stub: .github/specs directory exists" {
  [ -d ".github/specs" ]
}
