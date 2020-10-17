import './editor.template.style.less';
import React from 'react';
import classnames from 'classnames';
import { Component, ComponentTransform, useComponent, useContextState } from "@typeclient/react";
import { Flex } from '../components/Flex';
import { TEditorContext } from './editor.state';
import { inject } from '@typeclient/core';
import { EditorPluginContainer } from './plugin/plugin.container';

@Component()
export class EditorTemplateComponent implements ComponentTransform {
  @inject(EditorPluginContainer) private readonly EditorPluginContainer: EditorPluginContainer;
  render(props: React.PropsWithChildren<{}>) {
    const id = useContextState((ctx: TEditorContext) => ctx.state.plugins.id);
    const Container = useComponent(this.EditorPluginContainer);
    return <Flex blocked fulled align="between" overflow="hide">
      <Flex className="editor-main" span={1} fulled>
        <div className="inital">{props.children}</div>
      </Flex>
      <Flex className="editor-plugins" fulled>
        <div className={classnames('inital', { active: id > 0 })}>
          <Container />
        </div>
      </Flex>
    </Flex>
  }
}