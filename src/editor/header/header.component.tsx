import './header.style.less';
import React from 'react';
import { Component, ComponentTransform } from "@typeclient/react";
import { Flex } from '../../components/Flex';
import { Space, Button, Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';

@Component()
export class EditorHeaderComponent implements ComponentTransform {
  render() {
    return <Flex className="editor-header" align="between" valign="middle" blocked>
      <Flex className="editor-header_left" align="center" valign="middle">
        <div className="editor-header_left_item logo"></div>
        <Flex direction="column" className="editor-header_left_info">
          <div className="title">大黄蜂编辑器 <sup>v6.0.1</sup></div>
          <div className="slogen">一个每天都能写出一万字的工具</div>
        </Flex>
      </Flex>
      <Flex className="editor-header_right" valign="middle">
        <Space size="middle">
          <Button type="primary">保存</Button>
          <Dropdown overlay={this.menu()}>
            <div className="avatar">
              <Avatar src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2057588226,2402156864&fm=11&gp=0.jpg" />
            </div>
          </Dropdown>
        </Space>
      </Flex>
    </Flex>
  }

  menu() {
    return <Menu>
      <Menu.Item icon={<UserOutlined />} disabled>沈衍</Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={<SettingOutlined />}>个人设置</Menu.Item>
      <Menu.Item danger icon={<LogoutOutlined />}>退出登录</Menu.Item>
    </Menu>
  }
}