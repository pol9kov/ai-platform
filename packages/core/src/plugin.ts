// Plugin system types

export interface PluginManifest {
  name: string;
  version: string;
  description?: string;
  emits: string[];    // Events this plugin emits
  listens: string[];  // Events this plugin listens to
}

export interface PluginContext {
  userId: string;
  spaceId: string;
}

export type EventHandler<T = unknown> = (
  payload: T,
  context: PluginContext
) => Promise<void>;

export interface Plugin {
  manifest: PluginManifest;
  handlers: Map<string, EventHandler>;
  init?: () => Promise<void>;
  destroy?: () => Promise<void>;
}
