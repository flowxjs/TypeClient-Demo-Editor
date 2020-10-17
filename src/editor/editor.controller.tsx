import React, { useCallback, useEffect, useState } from 'react';
import { Controller, inject, onContextCreated, Route, State, useMiddleware } from "@typeclient/core";
import { useComponent, useReactiveState } from '@typeclient/react';
import { EditorTemplateComponent } from './editor.template';
import { EditorState, TEditorContext } from './editor.state';
import { Flex } from '../components/Flex';
import { Spin } from 'antd';
import { EditorHeaderComponent } from './header/header.component';
import { EditorToolbarComponent } from './toolbar/toolbar.component';
import { EditorPluginComponent } from './plugin/plugin.component';
import { EditorInformationComponent } from './information/information.component';
import { EditorSummaryComponent } from './summary/summary.component';
import { EditorWritterComponent } from './writter/writter.component';
import { EditorHelperComponent } from './helper/helper.component';
import { EditorSetupMiddleware } from './middlewares/editor.setup';
import { onEditorPluginContextCreated } from './plugin/plugin.onContextCreated';
import { EditorPluginMiddleware } from './plugin/plugin.middleware';

@Controller('/editor')
export class EditorController {
  @inject(EditorTemplateComponent) private readonly EditorTemplateComponent: EditorTemplateComponent;
  @inject(EditorHeaderComponent) private readonly EditorHeaderComponent: EditorHeaderComponent;
  @inject(EditorToolbarComponent) private readonly EditorToolbarComponent: EditorToolbarComponent;
  @inject(EditorPluginComponent) private readonly EditorPluginComponent: EditorPluginComponent;
  @inject(EditorInformationComponent) private readonly EditorInformationComponent: EditorInformationComponent;
  @inject(EditorSummaryComponent) private readonly EditorSummaryComponent: EditorSummaryComponent;
  @inject(EditorWritterComponent) private readonly EditorWritterComponent: EditorWritterComponent;
  @inject(EditorHelperComponent) private readonly EditorHelperComponent: EditorHelperComponent;
  @Route()
  @State(EditorState)
  @useMiddleware(EditorSetupMiddleware)
  @useMiddleware(EditorPluginMiddleware)
  @onContextCreated(onEditorPluginContextCreated)
  EditorPage(props: React.PropsWithoutRef<TEditorContext>) {
    const [headerShow, setHeaderShow] = useState(true);
    const Template = useComponent(this.EditorTemplateComponent);
    const Header = useComponent(this.EditorHeaderComponent);
    const Toolbar = useComponent(this.EditorToolbarComponent);
    const Plugin = useComponent(this.EditorPluginComponent);
    const Information = useComponent(this.EditorInformationComponent);
    const Summary = useComponent(this.EditorSummaryComponent);
    const Writter = useComponent(this.EditorWritterComponent);
    const Helper = useComponent(this.EditorHelperComponent);
    const toggleHeaderShow = useCallback(() => {
      if (headerShow) return setHeaderShow(false);
      return setHeaderShow(true);
    }, [headerShow]);
    const loading = useReactiveState(() => props.status.value);
    useEffect(() => {
      document.body.classList.add('editor');
      return () => document.body.classList.remove('editor');
    });
    return <Spin spinning={loading === 100} tip="正在加载本文数据信息，请稍后...">
      <Template>
        <Flex blocked fulled direction="column">
          { headerShow ? <Header /> : null }
          <Flex blocked align="between" span={1} style={{ overflow: 'hidden' }}>
            <Flex span={1} direction="column" fulled overflow="hide">
              <Toolbar toggleHeader={toggleHeaderShow} headerStatus={headerShow} />
              <Flex span={1} blocked fulled className="editor-zone">
                <div className="editor-wrap">
                  <Flex fulled blocked>
                    <Summary />
                    <Flex fulled className="editor-content">
                      <div className="space"></div>
                      <Writter />
                      <Helper />
                    </Flex>
                  </Flex>
                </div>
              </Flex>
              <Information />
            </Flex>
            <Plugin />
          </Flex>
        </Flex>
      </Template>
    </Spin>;
  }
}