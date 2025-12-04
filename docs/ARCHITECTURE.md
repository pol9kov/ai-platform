---
id: docs-architecture
owner: @pol9kov
status: active
review_by: 2025-03-01
---

# AI Platform Architecture

## Overview

Modular AI platform with plugin architecture. Plugins are independent and communicate via events.

## Repositories

```
pol9kov/ai-platform                    # Docs + submodules
pol9kov/ai-platform-core               # Core: auth, spaces, events
pol9kov/ai-platform-plugin-thoughts    # Data: thoughts storage, extraction
pol9kov/ai-platform-plugin-chat        # UI: AI chat
pol9kov/ai-platform-plugin-graph       # UI: graph visualization
pol9kov/ai-platform-plugin-ml          # Service: Python embeddings
```

## Core (ai-platform-core)

Minimal core:
- **Auth**: login/logout, anonymous users, OAuth claim
- **Spaces**: create, select, settings
- **Plugin loader**: loading and registering plugins
- **Event bus**: emit(), on(), request(), handle()

Core does NOT know about thoughts, chat, graph. Only plugins do.

## Plugin Types

### UI Plugins (views)
- Have user interface
- Render in content area
- Switch as tabs
- Examples: chat, graph

### Data Plugins
- Store and process data
- Provide API to other plugins
- Examples: thoughts

### Service Plugins
- No UI
- Provide API (request/handle)
- Examples: ml (embeddings)

## Communication

### Events (fire-and-forget)
```typescript
// Notifications
events.emit('message:received', { content })
events.emit('thought:created', { thought })

// Subscribe
events.on('message:received', handler)
```

### Requests (need response)
```typescript
// Request
const embedding = await request('ml:embed', { text })
const thoughts = await request('thoughts:list', { spaceId })

// Handler
handle('ml:embed', async ({ text }) => model.encode(text))
```

## Data Flow

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│    chat     │  │ file-import │  │   obsidian  │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │
       └────────────────┼────────────────┘
                        │
                        ▼ emit('message:received')
                 ┌──────────────┐
                 │  event bus   │
                 └──────┬───────┘
                        │
                        ▼ on('message:received')
                ┌───────────────┐
                │   thoughts    │
                │  - extract    │
                │  - store      │
                └───────┬───────┘
                        │
                        ▼ emit('thought:created')
                 ┌──────────────┐
                 │  event bus   │
                 └──────┬───────┘
                        │
          ┌─────────────┴─────────────┐
          ▼                           ▼
   ┌─────────────┐             ┌─────────────┐
   │    graph    │             │    list     │
   └─────────────┘             └─────────────┘
```

## UI Structure

```
┌─────────────────────────────────────────────────────────────┐
│  Header (core)                          [@user] [Settings]  │
├────────────────┬────────────────────────────────────────────┤
│                │                                            │
│  Sidebar       │   Tabs: [Chat] [Graph] [List]  ← plugins   │
│  (core)        │   ─────────────────────────────            │
│                │                                            │
│  Spaces:       │   ┌────────────────────────────────────┐  │
│  ┌──────────┐  │   │                                    │  │
│  │ Space 1  │  │   │   Active Plugin UI                 │  │
│  └──────────┘  │   │   (rendered by plugin)             │  │
│  ┌──────────┐  │   │                                    │  │
│  │ Space 2  │  │   └────────────────────────────────────┘  │
│  └──────────┘  │                                            │
│                │                                            │
│  [+ New Space] │                                            │
│  [Plugins]     │                                            │
│  [Settings]    │                                            │
└────────────────┴────────────────────────────────────────────┘
       CORE                         PLUGINS
```

## Plugin Manifest

```typescript
// plugin-chat/src/index.ts
export const manifest = {
  name: 'chat',
  version: '1.0.0',

  // Dependencies
  depends: ['core'],
  optional: ['thoughts'],

  // Communication
  emits: ['message:received'],
  listens: [],
  handles: [],

  // UI
  components: {
    SpaceView: ChatView,
    Settings: ChatSettings,
  },
}
```

## Local Development

```bash
# Clone all
git clone --recursive pol9kov/ai-platform
cd ai-platform

# Or clone individually
git clone pol9kov/ai-platform-core
git clone pol9kov/ai-platform-plugin-thoughts
```

## Tech Stack

- **Core**: TypeScript, Next.js 15
- **Plugins**: TypeScript, React
- **ML Service**: Python 3.11+, FastAPI, sentence-transformers
- **Database**: Turso (SQLite edge) / SQLite local
- **Deploy**: Vercel (web), Railway (ml-service)
