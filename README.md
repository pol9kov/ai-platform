# AI Platform

Modular AI platform with plugin architecture.

## Structure

```
apps/
├── web/           # Next.js frontend
└── ml-service/    # Python embeddings service

plugins/
└── thought-graph/ # RAG + DAG knowledge graph

packages/
└── core/          # Shared types & plugin system
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Run development
pnpm dev

# Type check
pnpm type-check
```

## Plugins

### thought-graph

Extract and connect thoughts using RAG (vector search) + DAG (temporal graph).

Features:
- Extract multiple thoughts from text
- Find similar thoughts via embeddings
- Build temporal knowledge graph
- Supports multiple AI sources (Claude, GPT, Gemini)

## License

MIT
