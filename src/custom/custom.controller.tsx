import React, { useCallback } from 'react';
import { Controller, Route, Context } from "@typeclient/core";
import { Flex } from '../components/Flex';
import { Button } from 'antd';

@Controller()
export class CustomController {
  @Route()
  IndexPage(ctx: Context) {
    const click = useCallback(() => ctx.redirect('/editor'), [ctx]);
    return <Flex blocked fulled align="center" valign="middle">
      <Button type="primary" onClick={click}>进入编辑器</Button>
    </Flex>
  }
}