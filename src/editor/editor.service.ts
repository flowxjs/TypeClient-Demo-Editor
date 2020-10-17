import { Service } from '@typeclient/core';
import { TEditorPluginList } from './plugin/plugin.interface';

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
          html: 'https://baidu.com',
        },
        {
          id: 2,
          icon: 'https://www.gstatic.com/companion/icon_assets/keep_2x.png',
          title: '标题推荐',
          label: '大黄蜂编辑器插件之标题推荐',
          version: '2.8.12',
          html: 'https://baidu.com',
        },
        {
          id: 3,
          icon: 'https://www.gstatic.com/companion/icon_assets/tasks2_2x.png',
          title: '原创检测',
          label: '大黄蜂编辑器插件之原创检测',
          version: '1.1.3',
          html: 'https://baidu.com',
        }
      ]
    }
  }
}