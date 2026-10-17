#!/bin/bash

# Test script for pre-push branch validation
# Simulates various git pre-push input scenarios

echo "🧪 Testing pre-push branch validator..."
echo ""

TEST_DIR="/tmp/toa-push-tests"
mkdir -p "$TEST_DIR"
cd "$TEST_DIR"

# Initialize test git repo
git init > /dev/null 2>&1
git config user.email "test@example.com"
git config user.name "Test User"

# Test 1: Single valid branch push
echo "Test 1: Single valid branch push (feat/my-feature)"
echo "refs/heads/feat/my-feature abc123 refs/heads/feat/my-feature abc123" | \
  node /home/user/TOA/scripts/validate-push-branch.js > /dev/null 2>&1
if [ $? -eq 0 ]; then echo "✅ PASS"; else echo "❌ FAIL"; fi

# Test 2: Single invalid branch push
echo "Test 2: Single invalid branch push (claude/bad-branch)"
echo "refs/heads/claude/bad-branch abc123 refs/heads/claude/bad-branch abc123" | \
  node /home/user/TOA/scripts/validate-push-branch.js > /dev/null 2>&1
if [ $? -eq 1 ]; then echo "✅ PASS (correctly rejected)"; else echo "❌ FAIL"; fi

# Test 3: Multiple branches (first valid, second invalid)
echo "Test 3: Multiple branches - first valid, second invalid"
{
  echo "refs/heads/feat/feature-one abc123 refs/heads/feat/feature-one abc123"
  echo "refs/heads/claude/bad-branch def456 refs/heads/claude/bad-branch def456"
} | node /home/user/TOA/scripts/validate-push-branch.js > /dev/null 2>&1
if [ $? -eq 1 ]; then echo "✅ PASS (correctly rejected on second)"; else echo "❌ FAIL"; fi

# Test 4: Multiple valid branches
echo "Test 4: Multiple valid branches"
{
  echo "refs/heads/feat/feature-one abc123 refs/heads/feat/feature-one abc123"
  echo "refs/heads/fix/bugfix-two def456 refs/heads/fix/bugfix-two def456"
  echo "refs/heads/docs/readme-update ghi789 refs/heads/docs/readme-update ghi789"
} | node /home/user/TOA/scripts/validate-push-branch.js > /dev/null 2>&1
if [ $? -eq 0 ]; then echo "✅ PASS"; else echo "❌ FAIL"; fi

# Test 5: Branch deletion (should be skipped)
echo "Test 5: Branch deletion (should be skipped)"
echo "refs/heads/feat/old-feature abc123 refs/heads/feat/old-feature 0000000000000000000000000000000000000000" | \
  node /home/user/TOA/scripts/validate-push-branch.js > /dev/null 2>&1
if [ $? -eq 0 ]; then echo "✅ PASS (deletion skipped)"; else echo "❌ FAIL"; fi

# Test 6: Tag push (should be skipped, only validates branch refs)
echo "Test 6: Tag push (should be skipped)"
echo "refs/tags/v1.0.0 abc123 refs/tags/v1.0.0 def456" | \
  node /home/user/TOA/scripts/validate-push-branch.js > /dev/null 2>&1
if [ $? -eq 0 ]; then echo "✅ PASS (tag skipped)"; else echo "❌ FAIL"; fi

# Test 7: Mixed refs (branch + tag + deletion)
echo "Test 7: Mixed refs (valid branch + tag + deletion)"
{
  echo "refs/heads/feat/my-feature abc123 refs/heads/feat/my-feature abc123"
  echo "refs/tags/v1.0.0 def456 refs/tags/v1.0.0 ghi789"
  echo "refs/heads/feat/old-feature jkl012 refs/heads/feat/old-feature 0000000000000000000000000000000000000000"
} | node /home/user/TOA/scripts/validate-push-branch.js > /dev/null 2>&1
if [ $? -eq 0 ]; then echo "✅ PASS"; else echo "❌ FAIL"; fi

# Test 8: Exemption (dependabot)
echo "Test 8: Exemption - dependabot branch"
echo "refs/heads/dependabot/npm/my-package abc123 refs/heads/dependabot/npm/my-package abc123" | \
  node /home/user/TOA/scripts/validate-push-branch.js > /dev/null 2>&1
if [ $? -eq 0 ]; then echo "✅ PASS"; else echo "❌ FAIL"; fi

# Test 9: Release branch
echo "Test 9: Exemption - release branch"
echo "refs/heads/release/v1.0.0 abc123 refs/heads/release/v1.0.0 abc123" | \
  node /home/user/TOA/scripts/validate-push-branch.js > /dev/null 2>&1
if [ $? -eq 0 ]; then echo "✅ PASS"; else echo "❌ FAIL"; fi

echo ""
echo "🎉 Pre-push validator tests complete"
