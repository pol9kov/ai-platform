# AI Platform

Модульная AI платформа с plugin архитектурой.

## Repositories

| Repo | Description |
|------|-------------|
| [ai-platform](https://github.com/pol9kov/ai-platform) | Docs + submodules |
| [ai-platform-core](https://github.com/pol9kov/ai-platform-core) | Core: auth, spaces, events |
| [ai-platform-plugin-thoughts](https://github.com/pol9kov/ai-platform-plugin-thoughts) | Data: мысли, extraction |
| [ai-platform-plugin-chat](https://github.com/pol9kov/ai-platform-plugin-chat) | UI: чат с AI |
| [ai-platform-plugin-graph](https://github.com/pol9kov/ai-platform-plugin-graph) | UI: визуализация графа |
| [ai-platform-plugin-ml](https://github.com/pol9kov/ai-platform-plugin-ml) | Service: Python embeddings |

## Quick Start

```bash
# Clone all
git clone --recursive https://github.com/pol9kov/ai-platform
cd ai-platform

# Install
cd core && pnpm install

# Run
pnpm dev
```

## Architecture

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

## Plugins

Плагины независимы и общаются через events:

```typescript
// emit событие
events.emit('message:received', { content })

// слушать событие
events.on('thought:created', handler)

// запрос с ответом
const result = await request('ml:embed', { text })
```

## Create Your Plugin

```bash
# Create repo
gh repo create ai-platform-plugin-myname

# Implement manifest
export const manifest = {
  name: 'myname',
  depends: ['core'],
  emits: [...],
  components: { SpaceView }
}
```

## License

MIT
