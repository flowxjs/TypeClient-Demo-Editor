import React from 'react';
import { Component, ComponentTransform, useContextState } from "@typeclient/react";
import { Spin } from 'antd';
import { TEditorContext } from "../editor.state";

@Component()
export class EditorPluginContainer implements ComponentTransform {
  render() {
    const { id } = useContextState((ctx: TEditorContext) => ({
      id: ctx.state.plugins.id,
    }));
    return <Spin spinning={id > 0} tip="插件加载中..."><div style={{ width: '100%', height: '100%' }}></div></Spin>
  }
}