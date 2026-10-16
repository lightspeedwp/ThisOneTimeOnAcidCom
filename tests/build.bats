#!/usr/bin/env bats

setup_file() {
  export PROJECT_ROOT="$(cd "$(dirname "${BATS_TEST_FILENAME}")/.." && pwd)"
  cd "$PROJECT_ROOT"
  # Clean dist directory if it exists (from previous builds)
  if [ -d "dist" ]; then
    rm -rf dist
  fi
}

setup() {
  export PROJECT_ROOT="$(cd "$(dirname "${BATS_TEST_FILENAME}")/.." && pwd)"
  cd "$PROJECT_ROOT"
}

@test "build directory does not exist before build" {
  [ ! -d "dist" ]
}

@test "public/_redirects exists as regular file" {
  [ -f "public/_redirects" ]
  [ ! -d "public/_redirects" ]
}

@test "public/_redirects file is readable" {
  [ -r "public/_redirects" ]
}

@test "public/_redirects contains SPA redirect rule" {
  grep -q "/\*.*index.html.*200" "public/_redirects"
}

@test "pnpm run build succeeds" {
  pnpm run build
}

@test "dist directory created after build" {
  [ -d "dist" ]
}

@test "dist/index.html exists after build" {
  [ -f "dist/index.html" ]
}

@test "build/public/_redirects file exists in dist output" {
  [ -f "dist/_redirects" ] || [ -f "dist/public/_redirects" ]
}

@test "redirects file is regular file (not directory) in dist" {
  if [ -f "dist/_redirects" ]; then
    [ -f "dist/_redirects" ] && [ ! -d "dist/_redirects" ]
  elif [ -f "dist/public/_redirects" ]; then
    [ -f "dist/public/_redirects" ] && [ ! -d "dist/public/_redirects" ]
  else
    false
  fi
}

@test "dist output includes CSS assets" {
  [ -d "dist/assets" ]
}

@test "dist output includes compiled JavaScript" {
  find "dist" -name "*.js" -type f | grep -q .
}

@test "no build warnings about _redirects structure" {
  output=$(pnpm run build 2>&1)
  ! echo "$output" | grep -qi "redirects.*directory"
  ! echo "$output" | grep -qi "redirects.*invalid"
}
