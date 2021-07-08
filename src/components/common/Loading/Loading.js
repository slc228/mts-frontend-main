import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import LoadingImg from '../../../materials/loading.gif';
import './loading.scss';

class Loading extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="caseVerteClaire">
        <div id="load">
          <p>加载中 {this.props.title || ''}</p>
        </div>
        <div id="transform">
          <div id="transform1" />
          <div id="transform2" />
          <div id="transform3" />
        </div>
      </div>
    );
  }
}

export default Loading;
