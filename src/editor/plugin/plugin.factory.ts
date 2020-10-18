import { TypeClientContainer } from "@typeclient/core";
import { TEditorContext } from "../editor.state";
import { reactive } from '@vue/reactivity';
import { TEditorPluginChannel, TEditorPluginResource } from "./plugin.interface";
import { useReactiveState } from "@typeclient/react";
import { EditorService } from "../editor.service";

type TLoader = (el: HTMLElement, id: TEditorPluginChannel['resourceID']) => Promise<void>

export class EditorPluginFactory {
  private readonly context: TEditorContext;
  private readonly containers = reactive<number[]>([]);
  private readonly loaders: Map<TEditorPluginChannel['loader'], TLoader> = new Map();
  private readonly service = TypeClientContainer.get(EditorService);
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

  public addLoader<T extends TEditorPluginChannel['loader']>(
    loader: T, 
    callback: (el: HTMLElement, resource: TEditorPluginResource[T]) => Promise<void>
  ) {
    const fn = ((l: T) => async (el: HTMLElement, id: TEditorPluginChannel['resourceID']) => {
      const res = await this.service.getEditorPluginResource(l, id);
      await callback(el, res);
    })(loader);
    this.loaders.set(loader, fn);
    return this;
  }

  public async load<T extends TEditorPluginChannel['loader']>(loader: T, el: HTMLElement, id: TEditorPluginChannel['resourceID']) {
    if (!this.loaders.has(loader)) throw new Error('找不到插件加载方式');
    const fn = this.loaders.get(loader);
    return await fn(el, id);
  }
}