---
id: docs-roadmap
owner: @pol9kov
status: active
review_by: 2025-03-01
---

# Roadmap

## Phase 0: Infrastructure ✓

- [x] Создать ai-platform (docs repo)
- [x] Документация: ARCHITECTURE, LIVING_DOCS_POLICY
- [x] Создать ai-platform-core repo
- [x] Создать ai-platform-plugin-thoughts repo
- [x] Создать ai-platform-plugin-chat repo
- [x] Создать ai-platform-plugin-graph repo
- [x] Создать ai-platform-plugin-ml repo
- [x] Настроить git submodules

## Phase 1: Core MVP

**ai-platform-core**

- [ ] Project setup (Next.js 15, TypeScript, Tailwind)
- [ ] Event bus: emit(), on(), request(), handle()
- [ ] Plugin loader: manifest validation, registration
- [ ] Auth: anonymous user (localStorage UUID)
- [ ] Spaces: create, select, delete
- [ ] Layout: header, sidebar, content area
- [ ] Plugin tabs rendering

**Результат:** Пустая платформа с spaces, готовая к плагинам

## Phase 2: Data Layer

**ai-platform-plugin-thoughts**

- [ ] Manifest + registration
- [ ] Database: Turso/SQLite setup
- [ ] Schema: thoughts table (id, content, embedding, created_at)
- [ ] Handle: `thoughts:create`, `thoughts:list`, `thoughts:search`
- [ ] Listen: `message:received` → extract thoughts
- [ ] Emit: `thought:created`

**Результат:** Хранение и поиск мыслей

## Phase 3: Chat UI

**ai-platform-plugin-chat**

- [ ] Manifest + registration
- [ ] SpaceView component: chat interface
- [ ] Message input + send
- [ ] Emit: `message:received`
- [ ] AI integration: OpenAI/Anthropic API
- [ ] Context from thoughts (RAG)

**Результат:** Работающий чат с AI

## Phase 4: Visualization

**ai-platform-plugin-graph**

- [ ] Manifest + registration
- [ ] SpaceView component: graph view
- [ ] Listen: `thought:created`
- [ ] Request: `thoughts:list`
- [ ] Graph rendering (D3/Cytoscape)
- [ ] Node interactions

**Результат:** Визуализация связей между мыслями

## Phase 5: ML Service (optional)

**ai-platform-plugin-ml**

- [ ] Python FastAPI service
- [ ] Handle: `ml:embed` (sentence-transformers)
- [ ] Deploy: Railway/Fly.io
- [ ] Fallback: OpenAI embeddings API

**Результат:** Локальные embeddings

## Future

- OAuth (Google, GitHub)
- Claim anonymous account
- File import plugin
- Obsidian sync plugin
- Mobile app
- Sharing/collaboration
