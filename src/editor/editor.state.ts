import { Context } from "@typeclient/core";
import { EditorPluginFactory } from "./plugin/plugin.factory";
import { TEditorPluginList } from "./plugin/plugin.interface";

interface TEditorState {
  plugins: {
    list: TEditorPluginList['data'],
    id: number,
  }
}

export const EditorState = (): TEditorState => ({
  plugins: {
    list: [],
    id: 0,
  }
})

export type TEditorContext = Context<TEditorState> & {
  pluginFactory: EditorPluginFactory
}