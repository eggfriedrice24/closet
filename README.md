# Closet

AI-powered wardrobe assistant. Upload your closet, get daily outfit suggestions based on current fashion trends, celebrity looks, and what you already own.

## Stack

- **Server**: [Hono](https://hono.dev) + [Better Auth](https://better-auth.com) + [Drizzle ORM](https://orm.drizzle.team) + PostgreSQL
- **Web**: React + [Vite](https://vite.dev) + [TanStack Router](https://tanstack.com/router) / [Query](https://tanstack.com/query) / [Form](https://tanstack.com/form)
- **Mobile**: React Native + [Expo](https://expo.dev)
- **AI**: Claude API via [@tanstack/ai-anthropic](https://tanstack.com/ai)
- **UI**: [shadcn/ui](https://ui.shadcn.com) (base-vega preset) + Tailwind CSS v4
- **Monorepo**: Bun workspaces + [Turborepo](https://turbo.build)

## Structure

```
apps/
  server/         # Hono API, auth, database
  web/            # React SPA with file-based routing
  mobile/         # Expo React Native app
packages/
  ui/             # shadcn/ui component primitives
  shared/         # Zod schemas, types, constants
  api-client/     # Hono RPC client + TanStack Query hooks
  env/            # Type-safe env vars via @t3-oss/env
```

## Getting Started

### Prerequisites

- Node.js 24+ (via `fnm use`)
- Bun 1.3+
- Docker (for PostgreSQL)

### Setup

```bash
# install dependencies
bun install

# start postgres
docker compose up -d

# push database schema
cd apps/server && bunx drizzle-kit push

# copy and configure env files
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env

# start dev servers
bun dev
```

### Services

| Service | URL |
|---------|-----|
| Web     | http://localhost:5173 |
| API     | http://localhost:3001 |

## Tooling

- **Linting**: oxlint
- **Formatting**: oxfmt
- **Pre-commit**: husky + lint-staged
- **Type checking**: TypeScript strict mode
