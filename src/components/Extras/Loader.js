import React, { Component } from 'react';
import { Spin } from 'antd';

export default class Loading extends Component {
  render() {
    return this.props.loading ? (
      <Spin
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          marginTop: '30vh',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
        size="large"
      />
    ) : null;
  }
}
