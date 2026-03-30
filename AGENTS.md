# Agents Guide

## Product

**Closet Command** is an AI-powered wardrobe assistant. Users upload photos of their clothing, and AI suggests daily outfits based on current fashion trends, celebrity looks, and what they already own.

## Stack

| Layer | Technology |
|-------|-----------|
| Server | Hono, Better Auth, Drizzle ORM, PostgreSQL |
| Web | React 19, Vite 7, Tailwind CSS v4 |
| Mobile | React Native, Expo |
| AI | Claude API via @tanstack/ai-anthropic |
| UI | shadcn/ui (base-vega preset, Base UI primitives) |
| Monorepo | Bun workspaces, Turborepo |
| Env | @t3-oss/env-core with Zod validation |
| Auth | Better Auth (email/password + Google OAuth + account linking) |

## TanStack Ecosystem

This project is built on TanStack. Use these libraries as the default choice:

| Library | Purpose | Package |
|---------|---------|---------|
| Router | File-based routing (web) | @tanstack/react-router |
| Query | Server state, data fetching, caching | @tanstack/react-query |
| Form | Form state, validation (with Zod) | @tanstack/react-form |
| Pacer | Debouncing, throttling, rate limiting | @tanstack/pacer |
| AI | LLM integration with Claude API | @tanstack/ai, @tanstack/ai-anthropic |

## Workspace Layout

```
apps/
  server/         # Hono API - auth, db, ai routes
  web/            # React SPA - TanStack Router file-based routing
  mobile/         # Expo React Native app
packages/
  ui/             # shadcn/ui primitives (base-vega). No app logic here
  shared/         # Zod schemas, types, constants. Shared across all apps
  api-client/     # Hono RPC client + auth client. Used by web and mobile
  env/            # Type-safe env vars. Server and client exports
```

## Rules

- Use Bun for everything. `bun add` for deps, `bun run` for scripts
- Use oxlint for linting, oxfmt for formatting. Never prettier or eslint
- Use TanStack Form for all forms, with Zod schemas from `@workspace/shared`
- shadcn components go in `packages/ui`. App compositions go in the app
- DB code stays in `apps/server`. Frontend apps call the API, not the DB
- Auth client lives in `packages/api-client`, shared by web and mobile
- All env vars are type-safe via `@workspace/env/server` or `@workspace/env/client`
- Node 24+ required (`.node-version`)
