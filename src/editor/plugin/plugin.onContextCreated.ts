import { TEditorContext } from "../editor.state";
import { EditorPluginFactory } from './plugin.factory';

export function onEditorPluginContextCreated(ctx: TEditorContext) {
  const factory = new EditorPluginFactory(ctx);
  Object.defineProperty(ctx, 'pluginFactory', {
    get: () => factory,
  });
  factory.addLoader('micro', async (el, resource) => {
    if (el.id.endsWith('2'))  throw new Error('插件加载失败');
    el.innerHTML = `System load ${resource.html} which using qiankun Micro loader.`;
  });
}