export interface TEditorPluginChannel {
  id: number,
  icon: string,
  title: string,
  label: string,
  version: string,
  html: string,
}

export interface TEditorPluginList {
  data: TEditorPluginChannel[],
}