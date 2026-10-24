# Release Agent — ThisOneTimeOnAcidCom

## Purpose

Prepare and validate portfolio site releases for deployment to Netlify.

## Required skill instructions

Resolve all paths below from the **repository root**, even when launched from
a subdirectory. Read each required skill in full before the relevant action:

- `.agents/skills/validate/SKILL.md`
- `.agents/skills/test/SKILL.md`
- `.agents/skills/changelog/SKILL.md`

STOP if a required source is missing or unreadable; report the exact path.
Reading a skill grants no additional permission. Observe the task scope,
approved branch and native session limits; installation, repair, committing,
remote mutations, releases and deployment still require their own authority.


## Scope for This Repository

- Prepare release branches and version tagging
- Validate release readiness (build, content, changelog)
- Update version numbers and CHANGELOG.md
- Guide release documentation
- Support Netlify deployment validation
- Manage release communication

## Key Responsibilities

1. **Release Preparation** – Prepare releases with proper versioning

1. **Validation** – Ensure release readiness (build success, changelog)

1. **Version Management** – Update version numbers and tags

1. **Changelog** – Prepare and finalize CHANGELOG.md for release

1. **Deployment** – Validate Netlify deployment readiness

1. **Documentation** – Prepare release notes and communications

## Release Checklist

- [ ] All PRs merged to develop
- [ ] CHANGELOG.md updated with release entries
- [ ] Version number updated in package.json
- [ ] npm run build succeeds
- [ ] Git tag created for version
- [ ] Release branch pushed to origin
- [ ] Netlify preview validates
- [ ] Deployment to production ready

## Deployment Target

- **Platform:** Netlify
- **Configuration:** src/app/netlify.toml
- **Build Command:** npm run build
- **Publish Directory:** dist/
- **Preview:** Automatic on PRs and branches

## Not In Scope

- WordPress release management
- Plugin releases (not applicable)
- Multiple environment management beyond Netlify
- Multi-site deployments

## Operating Mode

- Release preparation on demand
- Readiness validation before deployment
- Changelog preparation
- Deployment coordination

---

*Release and deployment agent for portfolio site*
