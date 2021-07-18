import React, { Component } from 'react';
import Lodash from 'lodash';
import moment from 'moment';
import { Form, Input, Layout, Button, Divider, List } from 'antd';
import { SearchOutlined, LeftOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MultiFilter from '../common/MultiFilter/MultiFilter';
import GlobalMultiFilter from '../common/GlobalMultiFilter/GlobalMultiFilter';
import DataList from '../common/DataList/DataList';
import getOverallData from '../../services/request/data/getOverallData';
import getOverallDataWithObject from '../../services/request/data/getOverallDataWithObject';
import getContentTag from '../../services/request/data/getContentTag';
import getContentEmotion from '../../services/request/data/getContentEmotion';
import AutofitWrap from '../common/AutofitWrap/AutofitWrap';
import './Overall.scss';

import { actions } from '../../redux/actions';
import getSensitiveType from '../../services/request/data/getSensitiveType';

const PAGE_SIZE = 10;
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class Overall extends Component {
  constructor() {
    super();
    this.state = {
      pageId: 0,
      pageSize: PAGE_SIZE,
      keyword: '',
      source: null,
      startPublishedDay: null,
      endPublishedDay: null,
      sensi: null,
      dateRange: null,
      timeOrder: 0,
      data: {},
      loading: false,
      src: undefined,
      keywords: [],
    };
  }

  getCriteria = () => {
    const { keyword, source, startPublishedDay, endPublishedDay, sensi, timeOrder, pageSize, pageId, keywords } = this.state;
    const criteria = { keyword, source, startPublishedDay, endPublishedDay, sensi, timeOrder, pageSize, pageId, keywords };
    return JSON.stringify(criteria);
  };

  handleDateChange = (moments) => {
    if (!moments) {
      this.setState({
        startPublishedDay: '',
        endPublishedDay: '',
      });
      return;
    }
    const [startMoment, endMoment] = moments;
    this.setState({
      startPublishedDay: startMoment.format(DATE_FORMAT),
      endPublishedDay: endMoment.format(DATE_FORMAT),
    });
  };

  handleSelect = (name, value) => {
    const newState = {};
    newState[name] = value;
    this.setState(newState);
    const current = moment();
    if (name === 'dateRange') {
      switch (value) {
        case 0:
          this.handleDateChange([
            moment(current),
            moment(current).startOf('day'),
          ]);
          break;
        case -1:
        case null:
          this.handleDateChange();
          break;
        default:
          this.handleDateChange([
            moment(current),
            moment(current).subtract(value, 'days'),
          ]);
          break;
      }
    }
    this.handleSearchWithObject();
  };

  handlePageChange = (pageId) => {
    this.setState({ pageId }, () => {
      this.handleSearchWithObject();
    });
  };

  handlePageSizeChange = (current, pageSize) => {
    this.setState({ pageSize, pageId: 0 }, () => {
      this.handleSearchWithObject();
    });
  };

  handleSearchWithObject = async () => {
    await this.setState({ loading: true });
    const { keyword, source, startPublishedDay, endPublishedDay, sensi, timeOrder, pageSize, pageId, data, keywords } = this.state;
    const params = [keyword, source, startPublishedDay, endPublishedDay, sensi, timeOrder, pageSize, pageId, keywords];
    this.props.onOverallPathChange({ path: '/result' });
    const result = await getOverallDataWithObject(...params);
    const newData = { ...data };
    newData[this.getCriteria()] = result;
    this.setState({
      loading: false,
      data: newData,
    });
  };

  handleKeywordChange = (keywordObject) => {
    this.setState({ keyword: keywordObject.keyWord, keywords: keywordObject.Keywords }, () => {
      this.handleSearchWithObject();
    });
  };

  handleBaiduSearch = () => {
    const { keyword } = this.state;
    this.setState({
      src: encodeURI(`https://www.baidu.com/s?ie=UTF-8&wd=${keyword}`),
    });
  };

  closeIframe = () => {
    this.setState({
      src: undefined,
    });
  };

  handle360Search = () => {
    const { keyword } = this.state;
    this.setState({
      src: encodeURI(`https://www.so.com/s?ie=utf-8&fr=none&src=home_suggst_revise&nlpv=base_bt65&q=${keyword}&eci=`),
    });
  };

  render() {
    const params = ['sensi', 'source', 'timeOrder', 'dateRange', 'startPublishedDay', 'endPublishedDay'];
    const criteria = this.getCriteria();
    const curPath = this.props.overallPath;
    const current = Lodash.pick(this.state, params);
    const { pageSize, keyword, loading } = this.state;
    const data = this.state.data[criteria]?.data || [];
    const dataSize = this.state.data[criteria]?.dataSize || 0;
    const { src } = this.state;
    const dataList = [
      'Racing car sprays burning fuel into crowd.',
      'Japanese princess to wed commoner.',
      'Australian walks 100km after outback crash.',
      'Man charged over missing wedding girl.',
      'Los Angeles battles huge wildfires.',
    ];
    switch (curPath) {
      case '/result':
        return (
          <div>
            <Divider type="vertical">Default Size</Divider>
            <div width="30%" align="center">
              <List
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={dataList}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </div>
            <Divider type="vertical">Small Size</Divider>
            <div width="30%" align="center">
              <List
                size="small"
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={dataList}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </div>
            <Divider type="vertical">Large Size</Divider>
            <div width="30%" align="center">
              <List
                size="large"
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={dataList}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </div>
          </div>
        /* <div className="overall-wrap">
            <div className="mts-overall-container">
              <GlobalMultiFilter
                initialKeyword={keyword}
                current={current}
                onSelect={this.handleSelect}
                onSearch={this.handleKeywordChange}
                onDateChange={this.handleDateChange}
              />
              <DataList
                data={data}
                dataSize={dataSize}
                pageSize={pageSize}
                loading={loading}
                onPageChange={this.handlePageChange}
                onPageSizeChange={this.handlePageSizeChange}
              />
            </div>
          </div> */
        );
      case '':
        return (
          <AutofitWrap
            minHeight={600}
            padding={150}
            className="main-wrap"
          >
            <div className="search-entry-wrap">
              <div className="title">全网搜索 <SearchOutlined /></div>
              <Input
                className="search-entry-input"
                onChange={e => this.setState({ keyword: e.target.value })}
                value={keyword}
                size="large"
                onSearch={this.handleSearchWithObject}
              />
              <div className="btn-group">
                <Button type="primary" onClick={this.handleSearchWithObject}>全库搜素</Button>
                <Button type="primary" onClick={this.handleBaiduSearch}>百度搜素</Button>
                <Button type="primary" onClick={this.handle360Search}>360搜素</Button>
              </div>
            </div>
            {src && (
            <div className="iframe-wrap">
              <button className="close-btn" onClick={this.closeIframe}>x</button>
              {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
              <iframe className="iframe-content" src={src} />
            </div>
            )}
          </AutofitWrap>
        );
    }
  }
}

const mapStateToProps = (state) => ({
  overallPath: state.overallPath,
});
const mapDispatchToProps = {
  onOverallPathChange: actions.onOverallPathChange,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Overall));
