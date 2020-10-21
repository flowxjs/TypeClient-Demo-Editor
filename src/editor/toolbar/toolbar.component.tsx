import './toolbar.style.less';
import React from 'react';
import { Component, ComponentTransform } from "@typeclient/react";
import { Flex } from '../../components/Flex';
import { Divider, Tooltip, Checkbox } from 'antd';
import { UpOutlined, QuestionCircleOutlined, FullscreenOutlined, CommentOutlined, SendOutlined, SisternodeOutlined } from '@ant-design/icons';

@Component()
export class EditorToolbarComponent implements ComponentTransform {
  render(props: React.PropsWithoutRef<{
    toggleHeader: () => void,
    headerStatus: boolean,
  }>) {
    return <div className="editor-toolbar">
      <Flex blocked fulled align="between" valign="middle">
        <div className="editor-base-tools">Toolbars...</div>
        <Flex className="editor-extra-tools" fulled align="right" valign="middle">
          <CommentOutlined />
          <QuestionCircleOutlined />
          <FullscreenOutlined />
          <Divider type="vertical" />
          <Tooltip placement="bottom" title="发布"><SendOutlined /></Tooltip>
          <Tooltip placement="bottom" title="加入待发布"><SisternodeOutlined /></Tooltip>
          <Divider type="vertical" />
          <Checkbox checked>自动保存</Checkbox>
          <Divider type="vertical" />
          <Tooltip placement="bottom" title={props.headerStatus ? '收起顶部导航' : '展开顶部导航'}><UpOutlined onClick={props.toggleHeader} /></Tooltip>
        </Flex>
      </Flex>
    </div>
  }
}