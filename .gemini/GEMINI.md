# ThisOneTimeOnAcid — Workspace Rules

## Project Overview
This is a React + Vite + TailwindCSS v4 web application. It uses TypeScript, Radix UI primitives, shadcn/ui patterns, and Motion (Framer Motion) for animations.

## Tech Stack
- **Framework**: React 18 + Vite 6
- **Styling**: TailwindCSS v4 (`@tailwindcss/vite` plugin)
- **UI Components**: Radix UI primitives, shadcn/ui patterns, Lucide icons, Phosphor icons
- **Animation**: Motion (Framer Motion)
- **Routing**: React Router v7
- **Build**: Vite with Figma asset resolver plugin
- **Package Manager**: pnpm

## Path Aliases
- `@` → `./src/app`

## Development Commands
- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm journal:parse` — parse journal markdown content
- `pnpm journal:validate` — validate journal markdown
- `pnpm journal:check-links` — check journal link integrity

## Coding Conventions
- Use TypeScript for all new code
- Follow existing component patterns in `src/app`
- Use Radix UI + shadcn/ui patterns for new components
- Use TailwindCSS v4 utility classes for styling (import-based config, no `tailwind.config.js`)
- Use Motion for animations
- Prefer named exports for components
- Keep components focused and composable

## Spec Kit Integration
- Spec Kit is installed with the Gemini integration
- Use `/speckit.*` commands for spec-driven development workflows
- Specs, plans, and tasks are stored in `.specify/`
- Constitution template is in `.specify/memory/constitution.md`
