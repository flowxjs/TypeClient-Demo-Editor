import { Service } from '@typeclient/core';
import { TEditorPluginChannel, TEditorPluginList, TEditorPluginResource } from './plugin/plugin.interface';

@Service()
export class EditorService {
  async getEditorPluginList(): Promise<TEditorPluginList> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      data: [
        {
          id: 1,
          icon: 'https://www.gstatic.com/companion/icon_assets/calendar_2x.png',
          title: '素材推荐',
          label: '大黄蜂编辑器插件之素材推荐',
          version: '1.13.59',
          resourceID: 1,
          loader: 'micro',
        },
        {
          id: 2,
          icon: 'https://www.gstatic.com/companion/icon_assets/keep_2x.png',
          title: '标题推荐',
          label: '大黄蜂编辑器插件之标题推荐',
          version: '2.8.12',
          resourceID: 2,
          loader: 'micro',
        },
        {
          id: 3,
          icon: 'https://www.gstatic.com/companion/icon_assets/tasks2_2x.png',
          title: '原创检测',
          label: '大黄蜂编辑器插件之原创检测',
          version: '1.1.3',
          resourceID: 3,
          loader: 'micro',
        }
      ]
    }
  }

  async getEditorPluginResource<T extends TEditorPluginChannel['loader']>(loader: T, id: TEditorPluginChannel['resourceID']): Promise<TEditorPluginResource[T]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    switch (loader) {
      // @ts-ignore
      case 'micro': return {
        html: 'https://baidu.com/' + id
      } as TEditorPluginResource['micro'];
      // @ts-ignore
      case 'amd': return {
        js: 'https://baidu.com/a.js',
        css: 'https://baidu.com/a.css'
      } as TEditorPluginResource['amd'];
      // @ts-ignore
      case 'ama': return {} as TEditorPluginResource['ama'];
      default: throw new Error('unknow loader.');
    }
  }
}