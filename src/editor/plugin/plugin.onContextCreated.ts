import { TEditorContext } from "../editor.state";
import { EditorPluginFactory } from './plugin.factory';

export function onEditorPluginContextCreated(ctx: TEditorContext) {
  const factory = new EditorPluginFactory();
  Object.defineProperty(ctx, 'pluginFactory', {
    get: () => factory,
  });
}