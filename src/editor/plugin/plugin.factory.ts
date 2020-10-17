import { TEditorContext } from "../editor.state";
import { reactive } from '@vue/reactivity';
import { TEditorPluginChannel } from "./plugin.interface";
import { useReactiveState } from "@typeclient/react";


export class EditorPluginFactory {
  private readonly context: TEditorContext;
  private readonly containers = reactive<number[]>([]);
  public loader: (el: HTMLElement, url: string) => Promise<void>;
  constructor(ctx: TEditorContext) {
    this.context = ctx;
  }

  public setup(id: number) {
    const i = this.containers.indexOf(id);
    if (i === -1) {
      this.containers.push(id);
    }
    return this;
  }

  public each(callback: (chunk: TEditorPluginChannel, index: number) => void, deps?: any[]) {
    return useReactiveState(() => this.containers.map((id, index) => {
      const chunk = this.context.state.plugins.list.find(plugin => plugin.id === id);
      if (chunk) return callback(chunk, index);
      return null;
    }).filter(Boolean), deps);
  }

  public addLoader(callback: (el: HTMLElement, url: string) => Promise<void>) {
    this.loader = callback;
    return this;
  }
}