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
- Pure UI, no business logic
- Examples: chat (UI only), graph

### Data/Intelligence Plugins
- Store and process data
- Own business logic (RAG, prompts, LLM calls)
- Provide API to other plugins
- Examples: thoughts (data + AI completion)

### Service Plugins
- No UI
- Provide API (request/handle)
- Examples: ml (embeddings)

**Key principle:** Thoughts plugin owns AI logic. Chat is pure UI that calls thoughts for answers.

## Communication (Pub/Sub)

Plugins communicate via events. **No direct imports between plugins.**

### Publishers (emit)
- Emit events without knowing who listens
- Decoupled from subscribers

### Subscribers (on)
- Choose which events to listen
- Know about publishers' events (this is intentional integration)

```typescript
// Chat plugin (publisher) - doesn't know who listens
events.emit('chat:message', { spaceId, content })

// Thoughts plugin (subscriber) - knows about chat events
events.on('chat:message', async ({ spaceId, content }) => {
  const answer = await processWithLLM(spaceId, content)
  events.emit('chat:response', { spaceId, content: answer })
})

// Chat plugin (subscriber) - listens for responses
events.on('chat:response', ({ content }) => {
  displayMessage(content)
})
```

### Request/Handle (sync response)
For cases when you need a direct response:
```typescript
const embedding = await events.request('ml:embed', { text })
events.handle('ml:embed', async ({ text }) => model.encode(text))
```

## Data Flow

### Chat → Thoughts → Chat (AI Response)
```
┌─────────────┐                           ┌─────────────┐
│    Chat     │                           │  Thoughts   │
│  (publish)  │                           │ (subscribe) │
└──────┬──────┘                           └──────┬──────┘
       │                                         │
       │ emit('chat:message')                    │
       └──────────────────►──────────────────────┤
                                                 │
                                          ┌──────┴──────┐
                                          │ - RAG       │
                                          │ - LLM call  │
                                          │ - save      │
                                          └──────┬──────┘
                                                 │
       ┌──────────────────◄──────────────────────┘
       │ emit('chat:response')
       │
┌──────┴──────┐
│    Chat     │
│ (subscribe) │
│ - display   │
└─────────────┘
```

### Thoughts → Graph (Visualization)
```
┌─────────────┐                           ┌─────────────┐
│  Thoughts   │  emit('thought:created')  │    Graph    │
│  (publish)  │ ────────────────────────► │ (subscribe) │
└─────────────┘                           │ - update    │
                                          └─────────────┘
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

## Plugin Manifests

### Chat Plugin (UI)
```typescript
export const chatManifest = {
  name: 'Chat',
  version: '1.0.0',
  depends: ['core'],

  emits: ['chat:message'],      // публикует сообщения
  listens: ['chat:response'],   // слушает ответы

  components: { SpaceView: ChatView },
}
```

### Thoughts Plugin (Intelligence)
```typescript
export const thoughtsManifest = {
  name: 'Thoughts',
  version: '1.0.0',
  depends: ['core'],

  emits: ['chat:response', 'thought:created'],
  listens: ['chat:message'],    // слушает сообщения чата

  // init регистрирует обработчики
}
```

### Graph Plugin (Visualization)
```typescript
export const graphManifest = {
  name: 'Graph',
  version: '1.0.0',
  depends: ['core'],

  listens: ['thought:created'], // слушает новые мысли

  components: { SpaceView: GraphView },
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
