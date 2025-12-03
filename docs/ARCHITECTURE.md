# AI Platform Architecture

## Overview

Модульная AI платформа с plugin архитектурой. Плагины независимы и общаются через events.

## Repositories

```
pol9kov/ai-platform                    # Docs + submodules
pol9kov/ai-platform-core               # Core: auth, spaces, events
pol9kov/ai-platform-plugin-thoughts    # Data: хранение мыслей, extraction
pol9kov/ai-platform-plugin-chat        # UI: чат с AI
pol9kov/ai-platform-plugin-graph       # UI: визуализация графа
pol9kov/ai-platform-plugin-ml          # Service: Python embeddings
```

## Core (ai-platform-core)

Минимальное ядро:
- **Auth**: login/logout, anonymous users, OAuth claim
- **Spaces**: create, select, settings
- **Plugin loader**: загрузка и регистрация плагинов
- **Event bus**: emit(), on(), request(), handle()

Core НЕ знает про thoughts, chat, graph. Только плагины.

## Plugin Types

### UI Plugins (views)
- Имеют интерфейс
- Рендерятся в content area
- Переключаются как вкладки
- Примеры: chat, graph

### Data Plugins
- Хранят и обрабатывают данные
- Предоставляют API другим плагинам
- Примеры: thoughts

### Service Plugins
- Не имеют UI
- Предоставляют API (request/handle)
- Примеры: ml (embeddings)

## Communication

### Events (fire-and-forget)
```typescript
// Уведомления
events.emit('message:received', { content })
events.emit('thought:created', { thought })

// Подписка
events.on('message:received', handler)
```

### Requests (нужен ответ)
```typescript
// Запрос
const embedding = await request('ml:embed', { text })
const thoughts = await request('thoughts:list', { spaceId })

// Обработчик
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
│  └──────────┘  │   │   (рендерится плагином)            │  │
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
