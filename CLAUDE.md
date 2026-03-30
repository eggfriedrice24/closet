# Closet Command - AI Wardrobe Assistant

## Project Overview

Personal app for daily outfit suggestions. User uploads wardrobe items, AI suggests outfits based on trends, celebrity fashion, and existing inventory.

## Architecture

- **Monorepo**: Bun workspaces + Turborepo
- **Server** (`apps/server`): Hono API on port 3001, Better Auth (email/password + Google OAuth + account linking), Drizzle ORM + PostgreSQL
- **Web** (`apps/web`): React + Vite SPA, TanStack Router (file-based), TanStack Query, TanStack Form with Zod validation
- **Mobile** (`apps/mobile`): Expo React Native (hello world placeholder)
- **UI** (`packages/ui`): shadcn/ui primitives only (base-vega preset, Base UI). No app-specific compositions here
- **Shared** (`packages/shared`): Zod schemas, TypeScript types, constants
- **API Client** (`packages/api-client`): Hono RPC client (`hc<AppType>`) + Better Auth React client. Shared by web and mobile
- **Env** (`packages/env`): Type-safe env vars via @t3-oss/env-core. Server and client exports

## TanStack Libraries

We use the TanStack ecosystem extensively. Always prefer TanStack solutions over alternatives:

- **@tanstack/react-router**: File-based routing for the web app. Use `createFileRoute`, `createRootRoute`, route context for auth
- **@tanstack/react-query**: Server state management, data fetching, caching. Use with Hono RPC client
- **@tanstack/react-form**: All form handling. Use with Zod validators from `@workspace/shared`. Never use useState for form fields
- **@tanstack/pacer**: Rate limiting, debouncing, throttling utilities
- **@tanstack/ai** (planned): AI integration with Claude API via `@tanstack/ai-anthropic` for wardrobe suggestions

When adding new features, check if TanStack has a solution before reaching for other libraries.

## Key Conventions

- **Package manager**: Bun. Use `bun add` to install deps, never hardcode versions
- **Node version**: 24+ (`.node-version` file, use `fnm`)
- **Linting**: oxlint (config at root `.oxlintrc.json`)
- **Formatting**: oxfmt (config at root `.oxfmtrc.json`)
- **Never** use prettier or eslint
- **Pre-commit**: husky + lint-staged runs oxfmt + oxlint --fix
- **Web app lint/fmt** scripts need explicit `-c ../../.oxlintrc.json` / `-c ../../.oxfmtrc.json` flags due to vite.config.ts auto-detection bug
- **Forms**: TanStack Form + Zod schemas from `@workspace/shared`. Use shadcn Field/FieldGroup/FieldLabel with `data-invalid`/`aria-invalid` for validation states
- **Auth client**: Lives in `packages/api-client`, not in individual apps
- **DB**: Lives in `apps/server`, not a shared package (only server talks to DB)
- **Env loading**: Server uses `tsx watch --env-file=.env`. Vite loads `.env` automatically
- **shadcn components**: Add via `bun run ui:add <component>` from `packages/ui`. Preset is base-vega (Base UI primitives, not Radix)
- **Route protection**: `_authenticated.tsx` layout uses `beforeLoad` + `authClient.getSession()`. Sign out uses `router.invalidate()` to re-trigger guard

## Commands

```bash
bun dev              # start all apps (turbo)
bun run lint         # oxlint all workspaces
bun run fmt          # oxfmt all workspaces
bun run check        # fmt + lint + typecheck
turbo build          # build all
```
