# T021: Hash validation report

**Validated**: 2026-10-25\
**Baseline commit**: `b7c3c4413f5fc7ed2e73a50ca7462d45a8e2e1b9`\
**Compared checkout revision**: `bb5888cf4681ed40402b2fc0b05d1366f109f4ad`\
**Result**: PASS — all 116 Markdown guideline paths and SHA-256 hashes match.

## Evidence and scope

The [baseline manifest](./T021-baseline.sha256) contains one SHA-256 hash and
repository-relative path for each of the 116 Markdown files. It was regenerated
from Git blobs at the baseline commit and compared with current disk contents.
The manifest SHA-256 is
`9f987a7900a2aede0e1f05e2d6aa4a20589cff157864aa1f68dbdc30062aaa30`.

This rerun verifies equality with the named Git commit. It does not authenticate
the original observation attachment, whose repository path is not recorded in
[spec.md](../spec.md), or establish `locked-files-guard` approval.

## Reproduction

Run from the repository root using Bash, Git and GNU coreutils:

```bash
set -euo pipefail
baseline=b7c3c4413f5fc7ed2e73a50ca7462d45a8e2e1b9
manifest=.github/specs/003-refactor-guidelines/validation-reports/T021-baseline.sha256
tmpdir=$(mktemp -d)
trap 'rm -rf "$tmpdir"' EXIT
git ls-tree -r --name-only "$baseline" -- guidelines/ | LC_ALL=C sort |
  while IFS= read -r path; do
    case "$path" in
      *.md)
        digest=$(git show "$baseline:$path" | sha256sum)
        printf '%s  %s\n' "${digest%% *}" "$path"
        ;;
    esac
  done > "$tmpdir/t021-baseline.sha256"
find guidelines/ -type f -name '*.md' -print0 | LC_ALL=C sort -z |
  xargs -0 sha256sum > "$tmpdir/t021-current.sha256"
wc -l "$tmpdir/t021-baseline.sha256" "$tmpdir/t021-current.sha256"
cmp "$manifest" "$tmpdir/t021-baseline.sha256"
cmp "$tmpdir/t021-baseline.sha256" "$tmpdir/t021-current.sha256"
sha256sum -c "$manifest" > "$tmpdir/t021-check.log"
printf 'Verified files: '
wc -l < "$tmpdir/t021-check.log"
sha256sum "$manifest"
```

Observed output (both `cmp` commands produced no output and exited 0):

```text
  116 /tmp/t021-baseline.sha256
  116 /tmp/t021-current.sha256
  232 total
Verified files: 116
9f987a7900a2aede0e1f05e2d6aa4a20589cff157864aa1f68dbdc30062aaa30  .github/specs/003-refactor-guidelines/validation-reports/T021-baseline.sha256
```

## Conclusion

T021's Git baseline comparison passes: 116 files, no added or removed paths,
and zero changed hashes. The saved manifest supports the result reported in
[spec.md](../spec.md#source-inventory).

**Phase 2B remains blocked** pending recorded T017 `locked-files-guard` approval.
Do not begin T022–T026 guideline edits until that approval is recorded.
