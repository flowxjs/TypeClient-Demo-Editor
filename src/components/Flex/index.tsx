import React, { MouseEvent } from 'react';
import './style.less';
import classnames from 'classnames';

interface FlexProps {
  span?: number;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  align?: 'left' | 'right' | 'center' | 'between' | 'around';
  valign?: 'top' | 'middle' | 'bottom' | 'stretch' | 'baseline';
  alignContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'stretch';
  blocked?: boolean;
  fulled?: boolean;
  overflow?: 'hide' | 'scroll' | 'auto';
  className?: string;
  id?: string,
  onClick?(e: MouseEvent<HTMLElement>): void
  style?: object,
  onScroll?(e: React.UIEvent<HTMLDivElement, UIEvent>): void,
}

interface FlexState {
  prefix: string;
}

export class Flex extends React.Component<FlexProps, FlexState> {
  state = {
    prefix: 'eigen-flex',
  }

  get className() {
    const props = this.props;
    const state = this.state;
    const classes = props.className ? [props.className] : [];
    if (this.props.span) {
      if (
        props.direction ||
        props.wrap ||
        props.align ||
        props.valign ||
        props.alignContent
      ) {
        classes.push(this.state.prefix);
      }
      classes.push(
        `${state.prefix}-item`,
        `${state.prefix}-span-${props.span}`
      );
    } else {
      classes.push(state.prefix);
    }
    
    props.direction &&
    classes.push(`${state.prefix}-dir-${props.direction}`);
    props.wrap && classes.push(`${state.prefix}-${props.wrap}`);
    if (props.align) {
      classes.push(`${state.prefix}-align-${props.align}`);
    } else {
      classes.push(`${state.prefix}-align-left`);
    }
    if (props.valign) {
      classes.push(`${state.prefix}-valign-${props.valign}`);
    } else {
      classes.push(`${state.prefix}-valign-top`);
    }
    props.alignContent &&
    classes.push(`${state.prefix}-align-content-${props.alignContent}`);
    props.blocked && classes.push(`${state.prefix}-blocked`);
    props.fulled && classes.push(`${state.prefix}-fulled`);
    props.overflow && classes.push(`${state.prefix}-${props.overflow}`);
    return classes;
  }

  render() {
    return <div 
      className={classnames(...this.className)} 
      style={this.props.style} 
      id={this.props.id} 
      onClick={this.props.onClick}
      onScroll={this.props.onScroll}
    >{this.props.children}</div>
  }
}