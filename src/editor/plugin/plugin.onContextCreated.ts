import { TEditorContext } from "../editor.state";
import { EditorPluginFactory } from './plugin.factory';

export function onEditorPluginContextCreated(ctx: TEditorContext) {
  const factory = new EditorPluginFactory(ctx);
  Object.defineProperty(ctx, 'pluginFactory', {
    get: () => factory,
  });
  factory.addLoader(async (el, url) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (el.id.endsWith('2'))  throw null;
    el.innerHTML = `System load ${url} which using qiankun Micro loader.`;
  })
}