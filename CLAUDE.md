# AI Platform

Monorepo: `apps/` (web, ml-service) + `plugins/` (thought-graph) + `packages/` (core)

## Rules

- Atomic commits: <50 lines, single focus
- Feature branches: `git checkout -b feat/name`
- NO: `any`, direct commits to main

## Commands

```bash
pnpm dev                    # all apps
pnpm type-check && pnpm build  # before commit
```

## Commit Format

```
type(scope): description
# type: feat|fix|docs|refactor
# scope: web|core|thought-graph|ml-service
```

## Current Phase: MVP

1. Anonymous auth + Spaces (core, web)
2. Thought-graph plugin (port from existing)
3. OAuth claim flow

## Key Files

- `packages/core/src/types.ts` — User, Space, Session
- `packages/core/src/plugin.ts` — Plugin system
- `plugins/thought-graph/` — RAG + DAG
