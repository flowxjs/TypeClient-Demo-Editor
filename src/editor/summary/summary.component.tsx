import './summary.style.less';
import React from 'react';
import { Component, ComponentTransform } from '@typeclient/react';

@Component()
export class EditorSummaryComponent implements ComponentTransform {
  render() {
    return <div className="editor-summary">
      <div className="item h2">日前，哈弗F7明星直播季在</div>
      <div className="item h3">王祖蓝和李亚男对2021款哈弗F7不俗实力后均赞不绝口</div>
      <div className="item h2">祖蓝更是秒变2021款哈弗</div>
      <div className="item h3">王祖蓝更是进入到了车内体验了2021款哈弗F7</div>
      <div className="item h4">其中语音交互系统支持一次唤醒连续对话</div>
      <div className="item h2">下来无论是听歌</div>
      <div className="item h3">驶员调整符合其个人喜好的</div>
    </div>
  }
}