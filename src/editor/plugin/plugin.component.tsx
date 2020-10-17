import './plugin.style.less';
import React, { useCallback } from 'react';
import { Component, ComponentTransform, useApplicationContext, useComponent, useContextState, useReactiveState } from "@typeclient/react";
import { Flex } from '../../components/Flex';
import { TEditorContext } from '../editor.state';
import { Tooltip } from 'antd';
import classnames from 'classnames';
import { inject } from '@typeclient/core';
import { TEditorPluginChannel } from './plugin.interface';

@Component()
class EditorPluginChannelComponent implements ComponentTransform {
  render(props: React.PropsWithoutRef<{ channel: TEditorPluginChannel }>) {
    const channel = props.channel;
    const ctx = useApplicationContext<TEditorContext>();
    const id = useReactiveState(() => ctx.state.plugins.id);
    const click = useCallback(() => {
      setImmediate(() => ctx.self.pluginFactory.setup(channel.id));
      if (ctx.state.plugins.id === channel.id) return ctx.state.plugins.id = 0;
      ctx.state.plugins.id = channel.id;
    }, [channel.id, ctx.state.plugins.id, ctx.self.pluginFactory]);
    return <Flex className={classnames('plugin', { active: id === channel.id })} blocked align="center" valign="middle" onClick={click}>
      <Tooltip placement="left" title={channel.title}>
        <div>
          <Flex className="image" align="center" valign="middle">
            <img src={channel.icon} alt={channel.label} />
          </Flex>
        </div>
      </Tooltip>
    </Flex>
  }
}

@Component()
export class EditorPluginComponent implements ComponentTransform {
  @inject(EditorPluginChannelComponent) private readonly channel: EditorPluginChannelComponent;
  render() {
    const Channel = useComponent(this.channel);
    const plugins = useContextState((ctx: TEditorContext) => {
      return ctx.state.plugins.list.map(channel => <Channel channel={channel} key={channel.id} />);
    });
    return <Flex className={classnames('editor-plugin', {
      active: !!plugins.length,
    })} direction="column">{plugins}</Flex>
  }
}