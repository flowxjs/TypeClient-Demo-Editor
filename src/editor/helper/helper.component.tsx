import './helper.style.less';
import React from 'react';
import { Component, ComponentTransform } from '@typeclient/react';

@Component()
export class EditorHelperComponent implements ComponentTransform {
  render() {
    return <div className="editor-helper"></div>
  }
}