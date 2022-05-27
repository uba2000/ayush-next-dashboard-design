import React, { Component } from 'react';
import tw from 'tailwind-styled-components'
import { Scrollbars } from 'react-custom-scrollbars-2';

const RenderThumbStyle = tw.div`
  dark:bg-white
  bg-black
`;

const RenderViewStyle = tw.div`
  py-4 pr-0
  overflow-x-hidden
`;

const RenderTrackView = tw.div`
  absolute
  w-[14px]
  right-[2px]
  bottom-[2px]
  top-[2px]
  rounded-2xl
`;

export default class ScrollbarsLayout extends Component {

  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = { top: 0 };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.renderView = this.renderView.bind(this);
    this.renderThumb = this.renderThumb.bind(this);
    this.renderTrack = this.renderTrack.bind(this);
  }


  handleUpdate(values) {
    const { top } = values;
    this.setState({ top });
  }

  renderView({ style, ...props }) {
    const { top } = this.state;
    return (
      <RenderViewStyle
        style={{ height: `${this.props.h ? this.props.h : 745}`, ...style, ...this.props.style }}
        {...props} />
    );
  }

  renderThumb({ style, ...props }) {
    const { top } = this.state;
    return (
      <RenderThumbStyle
        style={{ ...style, width: 14, borderRadius: 16 }}
        {...props} />
    );
  }

  renderTrack({ style, ...props }) {
    const { top } = this.state;
    return (
      <RenderTrackView
        style={{ ...style, transition: 'opacity 200ms ease 0s' }}
        {...props} />
    );
  }

  render() {
    return (
      <Scrollbars
        renderView={this.renderView}
        renderThumbHorizontal={this.renderThumb}
        renderThumbVertical={this.renderThumb}
        renderTrackVertical={this.renderTrack}
        onUpdate={this.handleUpdate}
        style={{ height: `${this.props.h ? this.props.h : 745}` }}
        autoHide={!!!this.props.autoHide}
        {...this.props} />
    );
  }
}