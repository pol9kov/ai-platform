# AI Platform

Docs repo with submodules.

## Documentation

- [docs/DOCS_INDEX.md](./docs/DOCS_INDEX.md) — index of all docs
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) — full architecture
- [docs/ROADMAP.md](./docs/ROADMAP.md) — development phases
- [docs/LIVING_DOCS_POLICY.md](./docs/LIVING_DOCS_POLICY.md) — doc standards

## Structure

```
ai-platform/                    # This repo (docs + submodules)
├── core/                       → ai-platform-core
└── plugins/
    ├── thoughts/               → ai-platform-plugin-thoughts
    ├── chat/                   → ai-platform-plugin-chat
    ├── graph/                  → ai-platform-plugin-graph
    └── ml/                     → ai-platform-plugin-ml
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

See [docs/ROADMAP.md](./docs/ROADMAP.md) — Phase 3: Chat UI
