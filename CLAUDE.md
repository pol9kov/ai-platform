# AI Platform Development Rules

<critical>
MUST decompose to atomic (<5min, <50 lines) before executing
MUST run: pnpm type-check && pnpm lint before commits
MUST use feature branches: git checkout -b feature/name
MUST keep each commit focused on single change
FORBIDDEN: `any`, committing to main directly, skipping type-check
</critical>

## Project Structure

```
ai-platform/
├── apps/
│   ├── web/              # Next.js 15 (App Router)
│   └── ml-service/       # Python FastAPI
├── plugins/
│   └── thought-graph/    # RAG + DAG plugin
└── packages/
    └── core/             # Shared types, plugin system
```

## Task Decomposition

**Atomic task:** <5min | <50 lines | clear pass/fail | independent commit

**Process:** Analyze → Decompose → Recurse → Execute atomic

**Stop decomposing when:** Single file | <100 lines | Single concept | Clear commit msg

**Git:** Feature branch → atomic commits → squash to main

## Tech Stack Rules

| Package | Tech | Required | Forbidden |
|---------|------|----------|-----------|
| `apps/web` | Next.js 15, React 19 | Server Components, App Router | `any`, `<img>` |
| `apps/ml-service` | Python 3.11+, FastAPI | Type hints, Pydantic | `Any`, no types |
| `packages/core` | TypeScript | Explicit types, ESM | `any`, CJS |
| `plugins/*` | TypeScript | Depend on `@ai-platform/core` | Direct DB access |

## Commands

```bash
# Development
pnpm dev              # Run all apps
pnpm dev --filter=web # Run only web

# Checks (run before commit)
pnpm type-check
pnpm lint
pnpm build

# Python (ml-service)
cd apps/ml-service
uv run uvicorn src.main:app --reload
```

## Pre-Commit Checklist

```bash
pnpm type-check && pnpm lint && pnpm build
```

- ✅ Types pass
- ✅ Single focused change
- ✅ Commit message describes WHY

## Commit Convention

```
type(scope): description

type: feat|fix|refactor|docs|test|chore
scope: web|ml-service|core|thought-graph
```

Examples:
- `feat(core): add User and Space types`
- `feat(thought-graph): implement RAG search`
- `fix(web): handle anonymous auth edge case`

## Current Goals

### Phase 1: MVP Auth + Spaces
1. [ ] Anonymous user creation
2. [ ] Space CRUD
3. [ ] Basic UI (list spaces)

### Phase 2: Thought Graph Plugin
1. [ ] Port types from existing thought-graph
2. [ ] DB schema with space_id
3. [ ] LLM extraction
4. [ ] RAG search

### Phase 3: Public/Private
1. [ ] OAuth (GitHub)
2. [ ] Claim anonymous account
3. [ ] Visibility settings

## Architecture Principles

- **Plugins are isolated**: communicate via events, not direct imports
- **Core is minimal**: only shared types and plugin system
- **Web is thin**: UI + API routes, business logic in plugins
- **ML service is optional**: fallback to OpenAI API if unavailable

## Quick Reference

- [README.md](./README.md) - Project overview
- [packages/core/src/types.ts](./packages/core/src/types.ts) - Core types
- [packages/core/src/plugin.ts](./packages/core/src/plugin.ts) - Plugin system

---

**Last Updated:** 2025-12-03
