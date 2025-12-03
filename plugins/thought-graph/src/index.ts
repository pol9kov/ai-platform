import type { Plugin, PluginManifest } from '@ai-platform/core';

export const manifest: PluginManifest = {
  name: 'thought-graph',
  version: '0.0.1',
  description: 'RAG + DAG: Extract and connect thoughts',
  emits: ['thought:extracted', 'thought:linked', 'thought:searched'],
  listens: ['message:received', 'thought:search'],
};

// Plugin will be implemented here
// - Types (Thought, Relation)
// - DB operations
// - LLM extraction
// - RAG search
// - DAG traversal

export const plugin: Plugin = {
  manifest,
  handlers: new Map(),
};
