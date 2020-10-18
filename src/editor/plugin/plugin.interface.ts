export interface TEditorPluginChannel {
  id: number,
  icon: string,
  title: string,
  label: string,
  version: string,
  loader: 'micro' | 'amd' | 'ama',
  resourceID: number,
}

export interface TEditorPluginMicroResource {
  html?: string
}

export interface TEditorPluginAmdResource {
  js: string,
  css: string | string[]
}

export interface TEditorPluginAmaResource {

}

export interface TEditorPluginResource {
  micro: TEditorPluginMicroResource,
  amd: TEditorPluginAmdResource,
  ama: TEditorPluginAmaResource,
};

export interface TEditorPluginList {
  data: TEditorPluginChannel[],
}