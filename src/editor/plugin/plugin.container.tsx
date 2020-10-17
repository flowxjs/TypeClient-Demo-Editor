import React, { useEffect, useState } from 'react';
import { Component, ComponentTransform, useApplicationContext, useComponent, useReactiveState } from "@typeclient/react";
import { Empty, Spin, Avatar, Space } from 'antd';
import { TEditorContext } from "../editor.state";
import { inject } from '@typeclient/core';
import { TEditorPluginChannel } from './plugin.interface';
import classnames from 'classnames';
import { Flex } from '../../components/Flex';

@Component()
class EditorPluginContainerItemArea implements ComponentTransform {
  render(props: React.PropsWithoutRef<{ item: TEditorPluginChannel }>) {
    const [loading, setLoading] = useState<0 | 1 | 2>(0);
    const ctx = useApplicationContext<TEditorContext>();
    const id = useReactiveState(() => ctx.state.plugins.id);
    useEffect(() => {
      if (ctx.self.pluginFactory.loader) {
        ctx.self.pluginFactory.loader(
          document.getElementById('editor-plugin-' + props.item.id), 
          props.item.html
        ).then(() => {
          setLoading(1);
        }).catch(e => {
          setLoading(2);
        })
      }
    }, []);
    return <div className={classnames('editor-plugins-area-item', {
      active: id === props.item.id,
    })}>
      <Spin spinning={loading === 0} tip="插件加载中...">
        <Flex blocked fulled direction="column">
          <Flex className="editor-plugin-header" blocked align="left" valign="middle">
            <Space>
              <Avatar src={props.item.icon} />
              <div className="info">{props.item.label}</div>
            </Space>
          </Flex>
          <Flex className="editor-plugin-body" span={1} blocked>
            {
              loading === 2
                ? <div className="error"><Empty description="插件加载失败，请检查网络链接或者联系大黄蜂客服解决此问题！" image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>
                : <div className="page" id={'editor-plugin-' + props.item.id}></div>
            }
          </Flex>
        </Flex>
      </Spin>
    </div>;
  }
}

@Component()
export class EditorPluginContainer implements ComponentTransform {
  @inject(EditorPluginContainerItemArea) private readonly Area: EditorPluginContainerItemArea;
  render() {
    const ctx = useApplicationContext<TEditorContext>();
    const factory = ctx.self?.pluginFactory;
    if (!factory) return null;
    const Area = useComponent(this.Area);
    const plugins = factory.each(chunk => <Area item={chunk} key={chunk.id} />);
    return <div className="editor-plugins-area">{plugins}</div>
  }
}