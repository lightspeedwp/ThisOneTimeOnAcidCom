# Discussion Templates

This directory contains GitHub Discussions category templates for
ThisOneTimeOnAcidCom.

## Available Categories

| Template | Purpose | Category Name | Category Slug |
|----------|---------|---------------|---------------|
| `feature-request.yml` | Feature ideas and enhancement requests | Feature Requests | `feature-requests` |
| `question-and-answer.yml` | Q&A support and troubleshooting | Questions & Answers | `questions-answers` |
| `show-and-tell.yml` | Community showcase and project sharing | Show and Tell | `show-and-tell` |
| `general.yml` | General community discussion | General | `general` |

## Setup Instructions

To enable discussions and map these templates:

1. **Enable Discussions** (one-time setup):

   - Go to your repository Settings
   - Check **"Discussions"** under "Features"
   - Click "Set up discussions"

1. **Configure Discussion Categories** (one-time setup):

   - Go to Settings → Discussions → Categories
   - For each category below, create a new discussion category:

```text
   Category: Feature Requests
   Emoji: 💡
   Description: Share ideas for new features or enhancements
   Template: feature-request.yml

   Category: Questions & Answers
   Emoji: ❓
   Description: Ask questions and get help from the community
   Template: question-and-answer.yml

   Category: Show and Tell
   Emoji: 🎉
   Description: Share projects and creative uses of this project
   Template: show-and-tell.yml

   Category: General
   Emoji: 💬
   Description: General conversation and community discussion
   Template: general.yml

```text

1. **Enable in README** (documentation):

   - Add a "Discussions" link in README.md
   - Point to: `https://github.com/{owner}/{repo}/discussions`

## Template Fields

Each template includes:

- **Title** - Pre-filled discussion title
- **Labels** - Automatically applied labels
- **Body** - Form fields with validation rules

Forms guide users to provide:

- Clear descriptions of their question/feature/project
- Context and use cases
- Research confirmation (what they've already tried)
- Links and media (screenshots, repos, demos)

## Maintenance

When adding new discussion categories:

1. Create a new YAML file in this directory

1. Update the table above

1. Configure the category in repository settings

1. Update the setup instructions here

## More Information

- [GitHub Discussions Documentation](https://docs.github.com/en/discussions)
- [Discussion Category Forms](https://docs.github.com/en/discussions/managing-discussions-for-your-community/about-discussions)
- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Community guidelines
