# Helpdesk — Claude Code Guide

AI-powered ticket management system for support teams. See `project-scope.md`, `tech-stack.md`, and `implementation-plan.md` for full context.

## Repo layout

Bun workspaces monorepo. Two packages:

- `client/` — React 18 + TypeScript + Vite + Tailwind v4 + React Router. Dev server on port 5173.
- `server/` — Express 4 + TypeScript, run via Bun (`bun --hot`). Listens on port 3001.

Root scripts:

- `bun run dev` — starts both apps in parallel via `bun run --filter '*' dev`.
- `bun run dev:client` / `bun run dev:server` — individual apps.
- `bun run build` / `bun run typecheck` — all workspaces.

## API conventions

- All server routes live under `/api/*` (e.g. `/api/health`).
- Vite proxies `/api` → `http://localhost:3001` during dev (see `client/vite.config.ts`).
- Client code calls `fetch("/api/...")` — never hardcode the server origin.

## Tech stack (planned)

- Auth: database sessions (not JWT).
- DB: PostgreSQL via Prisma.
- AI: Anthropic Claude API for classification, summaries, suggested replies.
- Email: SendGrid or Mailgun (inbound webhooks + outbound replies).

## Prisma (v7)

- Schema: `server/prisma/schema.prisma` — datasource block has `provider` only (v7 no longer accepts `url` in schema).
- Config: `server/prisma.config.ts` — holds the `DATABASE_URL` via `env()`, plus migration path.
- Generated client: `server/generated/client/` (gitignored). Import from `../generated/client/client`.
- Runtime wiring: `server/src/db.ts` — constructs `PrismaClient` with the `PrismaPg` driver adapter.
- Connection string lives in `server/.env` as `DATABASE_URL`. `.env.example` has the default local shape.
- Common commands (run from `server/`): `bunx --bun prisma generate`, `bunx --bun prisma migrate dev --name <name>`, `bunx --bun prisma studio`.

## Using context7 for documentation

Use the `context7` MCP server to fetch up-to-date documentation for any library, framework, SDK, API, or CLI tool used in this project — React, Express, Prisma, Tailwind, Vite, Bun, React Router, Anthropic SDK, SendGrid/Mailgun, etc. Prefer context7 over web search or training-data recall, since library APIs change between versions.

Workflow:
1. `mcp__context7__resolve-library-id` with the library name to get the context7 ID.
2. `mcp__context7__query-docs` with that ID and a specific question or topic.

Trigger context7 when adding a new dependency, upgrading a version, debugging library-specific behavior, or writing non-trivial integration code. Skip it for plain business logic or language-level questions.
