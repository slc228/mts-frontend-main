import React from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
import Specific from '../Specific/Specific';
import Origin from '../Origin/Origin';
import Config from '../Config/Config';
import View from '../View/View';
import HotArticle from "../HotArticle/HotArticle";
import Monitor from "../Monitor/Monitor";
import { actions } from '../../../redux/actions';
import './Content.scss'
import AutofitWrap from "../../common/AutofitWrap/AutofitWrap";
import Alert from "../Alert/Alert";
import Trace from "../Trace/Trace";

class Content extends React.Component {
  handleTabPageSelect = (e) => {
    this.props.onPageTagChange({
      curPageTag: e.key,
    });
  };

  render() {
    const { curProgramme, curPageTag } = this.props;
    return (
      <Layout.Content>
        <Menu
          theme="light"
          defaultSelectedKeys={curPageTag}
          mode="horizontal"
          onClick={this.handleTabPageSelect}
          className="mts-programme-content-menu"
        >
          <Menu.Item key="info">信息列表</Menu.Item>
          <Menu.Item key="alert">研判预警</Menu.Item>
          <Menu.Item key="trace">用户跟踪</Menu.Item>
          <Menu.Item key="config">方案配置</Menu.Item>
          <Menu.Item key="origin">定向监测</Menu.Item>
          <Menu.Item key="view">事件分析</Menu.Item>
          <Menu.Item key="monitor">定向用户监测</Menu.Item>
        </Menu>
        <Layout.Content className="site-layout-background">
          {curPageTag === 'info' && curProgramme && <Specific />}
          {curPageTag === 'view' && curProgramme && <View />}
          {curPageTag === 'config' && curProgramme && <Config />}
          {curPageTag === 'alert' && curProgramme && <Alert />}
          {curPageTag === 'trace' && curProgramme && <Trace />}
          {curPageTag === 'origin' && curProgramme && <Origin />}
          {curPageTag === 'monitor' && curProgramme && <Monitor />}
        </Layout.Content>
      </Layout.Content>
    );
  }
}

const mapStateToProps = (state) => ({
  curProgramme: state.curProgramme,
  curPageTag: state.curPageTag,
});
const mapDispatchToProps = {
  onPageTagChange: actions.onPageTagChange,
  onProgrammeChange: actions.onProgrammeChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Content);
