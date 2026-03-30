# Contributing

Thanks for your interest in contributing to Closet Command!

## Prerequisites

- Node.js 24+ (use `fnm`)
- Bun 1.3+
- Docker (for PostgreSQL)

## Setup

```bash
git clone https://github.com/eggfriedrice24/whatevs.git
cd whatevs
fnm use
bun install
docker compose up -d
cd apps/server && bunx drizzle-kit push && cd ../..
bun dev
```

## Development

### Commands

| Command | Description |
|---------|-------------|
| `bun dev` | Start all apps |
| `bun run lint` | Lint all workspaces |
| `bun run fmt` | Format all workspaces |
| `bun run check` | Format + lint + typecheck |
| `turbo build` | Build all |

### Adding UI Components

```bash
cd packages/ui
bun run ui:add <component>
```

### Code Style

- **Linting**: oxlint (not eslint)
- **Formatting**: oxfmt (not prettier)
- Pre-commit hooks handle both automatically via husky + lint-staged

### Forms

Use TanStack Form with Zod schemas from `@workspace/shared`. Never use raw `useState` for form fields.

### Commits

- Single-line, lowercase, imperative mood
- Keep commits granular - one logical change per commit
- Examples: `add wardrobe item upload route`, `fix google oauth redirect`

## Project Structure

- `packages/ui` - shadcn/ui primitives only. No app-specific compositions
- `packages/shared` - Zod schemas and types shared across apps
- `packages/api-client` - Hono RPC client + auth client (used by web and mobile)
- `packages/env` - Type-safe environment variables
- `apps/server` - API server, database, auth (DB code stays here)
- `apps/web` - React SPA with TanStack Router
- `apps/mobile` - Expo React Native app
