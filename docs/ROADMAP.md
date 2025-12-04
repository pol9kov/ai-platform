---
id: docs-roadmap
owner: @pol9kov
status: active
review_by: 2025-03-01
---

# Roadmap

## Phase 0: Infrastructure ✓

- [x] Create ai-platform (docs repo)
- [x] Documentation: ARCHITECTURE, LIVING_DOCS_POLICY
- [x] Create ai-platform-core repo
- [x] Create ai-platform-plugin-thoughts repo
- [x] Create ai-platform-plugin-chat repo
- [x] Create ai-platform-plugin-graph repo
- [x] Create ai-platform-plugin-ml repo
- [x] Configure git submodules

## Phase 1: Core MVP ✓

**ai-platform-core**

- [x] Project setup (Next.js 15, TypeScript, Tailwind)
- [x] Event bus: emit(), on(), request(), handle()
- [x] Plugin loader: manifest validation, registration
- [x] Auth: anonymous user (localStorage UUID)
- [x] Spaces: create, select, delete
- [x] Layout: header, sidebar, content area
- [x] Plugin tabs rendering

**Result:** Empty platform with spaces, ready for plugins

## Phase 2: Data Layer

**ai-platform-plugin-thoughts**

- [ ] Manifest + registration
- [ ] Database: Turso/SQLite setup
- [ ] Schema: thoughts table (id, content, embedding, created_at)
- [ ] Handle: `thoughts:create`, `thoughts:list`, `thoughts:search`
- [ ] Listen: `message:received` → extract thoughts
- [ ] Emit: `thought:created`

**Result:** Thoughts storage and search

## Phase 3: Chat UI

**ai-platform-plugin-chat**

- [ ] Manifest + registration
- [ ] SpaceView component: chat interface
- [ ] Message input + send
- [ ] Emit: `message:received`
- [ ] AI integration: OpenAI/Anthropic API
- [ ] Context from thoughts (RAG)

**Result:** Working AI chat

## Phase 4: Visualization

**ai-platform-plugin-graph**

- [ ] Manifest + registration
- [ ] SpaceView component: graph view
- [ ] Listen: `thought:created`
- [ ] Request: `thoughts:list`
- [ ] Graph rendering (D3/Cytoscape)
- [ ] Node interactions

**Result:** Visualization of thought connections

## Phase 5: ML Service (optional)

**ai-platform-plugin-ml**

- [ ] Python FastAPI service
- [ ] Handle request: `ml:embed` → returns vector (sentence-transformers)
- [ ] Deploy: Railway/Fly.io
- [ ] Fallback: OpenAI embeddings API

**Result:** Local embeddings

## Future

- OAuth (Google, GitHub)
- Claim anonymous account
- File import plugin
- Obsidian sync plugin
- Mobile app
- Sharing/collaboration
