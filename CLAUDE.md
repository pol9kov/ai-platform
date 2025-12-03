# AI Platform

Docs repo with submodules. See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for full architecture.

## Structure

```
ai-platform/                    # This repo (docs)
├── core/                       → ai-platform-core
├── plugin-thoughts/            → ai-platform-plugin-thoughts
├── plugin-chat/                → ai-platform-plugin-chat
├── plugin-graph/               → ai-platform-plugin-graph
└── plugin-ml/                  → ai-platform-plugin-ml
```

## Core (minimal)

- Auth (login, sessions, OAuth)
- Spaces (create, select)
- Plugin loader
- Event bus: emit(), on(), request(), handle()

## Events

```
chat        → message:received → thoughts
thoughts    → thought:created  → graph
```

## Commands

```bash
git clone --recursive pol9kov/ai-platform
git submodule update --remote    # update all
```

## Current Phase

1. Setup repos + submodules
2. Core: auth + spaces + events
3. plugin-thoughts: data + extraction
4. plugin-chat: UI
5. plugin-graph: visualization
