import { Component, ComponentTransform } from '@typeclient/react';
import './information.style.less';
import React from 'react';
import { Flex } from '../../components/Flex';
import { Space, Divider } from 'antd';

@Component()
export class EditorInformationComponent implements ComponentTransform {
  render() {
    return <Flex className="editor-infomation" align="center" valign="middle">
      <Space>
        <span>字数：1889个</span>
        <Divider type="vertical" />
        <span>批注：20个</span>
        <Divider type="vertical" />
        <span>修订：37个</span>
      </Space>
    </Flex>
  }
}