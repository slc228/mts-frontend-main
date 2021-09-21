import React, { Component } from 'react';
import Lodash from 'lodash';
import moment from 'moment';
import { Form, Input, Layout, Button, Divider, List, Row, Col, Radio, Table } from 'antd';
import { SearchOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MultiFilter from '../common/MultiFilter/MultiFilter';
import GlobalMultiFilter from '../common/GlobalMultiFilter/GlobalMultiFilter';
import DataList from '../common/DataList/DataList';
import getOverallData from '../../services/request/data/getOverallData';
import getOverallDataWithObject from '../../services/request/data/getOverallDataWithObject';
import getOverallDatOnNetwork from '../../services/request/data/getOverallDataOnNetwork';
import getOverallData360 from '../../services/request/data/getOverallData360';
import getOverallDataBing from '../../services/request/data/getOverallDataBing';
import getOverallDataBaidu from '../../services/request/data/getOverallDataBaidu';
import getContentTag from '../../services/request/data/getContentTag';
import getContentEmotion from '../../services/request/data/getContentEmotion';
import AutofitWrap from '../common/AutofitWrap/AutofitWrap';
import './Overall.scss';

import { actions } from '../../redux/actions';
import getSensitiveType from '../../services/request/data/getSensitiveType';
import GlobalDataList from '../common/GlobalDataList/GlobalDataList';

const PAGE_SIZE = 10;
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class Overall extends Component {
  constructor() {
    super();
    this.state = {
      pageId: 0,
      pageIdBaidu: 0,
      pageId360: 0,
      pageIdBing: 0,
      pageSize: PAGE_SIZE,
      keyword: '',
      source: null,
      startPublishedDay: null,
      endPublishedDay: null,
      sensi: null,
      emotion: null,
      dateRange: null,
      timeOrder: 0,
      data: {},
      loading: false,
      loadingBaidu: false,
      loading360: false,
      loadingBing: false,
      keywords: [],
      radiovalue: 1,
      dataOfBaidu: [],
      dataOf360: [],
      dataOfBing: [],
    };
    this.columnsBaidu = [
      {
        title: '百度搜索',
        dataIndex: 'title',
        key: 'title',
        render: this.renderTitle,
      },
    ];
    this.columns360 = [
      {
        title: '360搜索',
        dataIndex: 'title',
        key: 'title',
        render: this.renderTitle,
      },
    ];
    this.columnsBing = [
      {
        title: '必应搜索',
        dataIndex: 'title',
        key: 'title',
        render: this.renderTitle,
      },
    ];
  }

  handleOpen = (text) => {
    window.open(text);
  };

  renderTitle = (text, record) => {
    const { title, url } = record;
    return (
      <a
        onClick={e => this.handleOpen(url)}
      >
        {title}
      </a>
    );
  };

  getCriteria = () => {
    const { keyword, source, startPublishedDay, endPublishedDay, sensi, emotion, timeOrder, pageSize, pageId, keywords } = this.state;
    const criteria = { keyword, source, startPublishedDay, endPublishedDay, sensi, emotion, timeOrder, pageSize, pageId, keywords };
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
            moment(current).startOf('day'),
            moment(current),
          ]);
          break;
        case -1:

        case null:
          this.handleDateChange();
          break;
        default:
          this.handleDateChange([
            moment(current).subtract(value, 'days'),
            moment(current),
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
    const { keyword, source, startPublishedDay, endPublishedDay, sensi, emotion, timeOrder, pageSize, pageId, data, keywords } = this.state;
    const params = [keyword, source, startPublishedDay, endPublishedDay, sensi, emotion, timeOrder, pageSize, pageId, keywords];
    if (this.props.userEventLimiter !== '' && this.props.userEventLimiter) {
      let eventLimiter = this.props.userEventLimiter ? this.props.userEventLimiter.split(/\s+/) : [];
      eventLimiter = Array.from(new Set(eventLimiter));
      let arrayInput = keyword ? keyword.split(/\s+/) : [];
      arrayInput = Array.from(new Set(arrayInput));
      const subArray = arrayInput.filter((i) => !eventLimiter.includes(i));
      if (subArray.length > 0) {
        alert(`${subArray.toString()}  关键词不允许搜索`);
        return;
      }
    }
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

  onRadioChange= e => {
    this.setState({ radiovalue: e.target.value });
  };

  handleSearchOnNetwork = async () => {
    await this.setState({
      loadingBaidu: true,
      loading360: true,
      loadingBing: true,
    });
    const { keyword, pageIdBaidu, pageId360, pageIdBing } = this.state;
    this.props.onOverallPathChange({ path: '/network' });
    this.recDataBaidu(keyword, pageIdBaidu);
    this.recData360(keyword, pageId360);
    this.recDataBing(keyword, pageIdBing);
  };

  recDataBaidu= async (keyword, pageId) => {
    const resultBaidu = await getOverallDataBaidu(keyword, pageId);
    console.log(resultBaidu);
    this.setState({
      loadingBaidu: false,
      dataOfBaidu: resultBaidu,
    });
  };

  recData360= async (keyword, pageId) => {
    const result360 = await getOverallData360(keyword, pageId);
    console.log(result360);
    this.setState({
      loading360: false,
      dataOf360: result360,
    });
  };

  recDataBing= async (keyword, pageId) => {
    let resultBing = await getOverallDataBing(keyword, pageId);
    console.log(resultBing);
    resultBing = resultBing || {};
    this.setState({
      loadingBing: false,
      dataOfBing: resultBing,
    });
  };

  handleSearch = async () => {
    const { radiovalue } = this.state;
    if (radiovalue === 1) {
      await this.handleSearchWithObject();
    } else {
      await this.handleSearchOnNetwork();
    }
  };

  handleBaiduPageChange = (pagination) => {
    this.setState({ pageIdBaidu: pagination.current - 1, loadingBaidu: true }, () => {
      const { keyword, pageIdBaidu } = this.state;
      this.recDataBaidu(keyword, pageIdBaidu);
    });
  };

  handle360PageChange = (pagination) => {
    this.setState({ pageId360: pagination.current - 1, loading360: true }, () => {
      const { keyword, pageId360 } = this.state;
      this.recData360(keyword, pageId360);
    });
  };

  handleBingPageChange = (pagination) => {
    this.setState({ pageIdBing: pagination.current - 1, loadingBing: true }, () => {
      const { keyword, pageIdBing } = this.state;
      this.recDataBing(keyword, pageIdBing);
    });
  };

  render() {
    const params = ['sensi', 'source', 'timeOrder', 'dateRange', 'startPublishedDay', 'endPublishedDay', 'emotion'];
    const criteria = this.getCriteria();
    const curPath = this.props.overallPath;
    const current = Lodash.pick(this.state, params);
    const { pageSize, keyword, loading, radiovalue, loadingBaidu, loading360, loadingBing, dataOfBaidu, dataOf360 } = this.state;
    const data = this.state.data[criteria]?.data || [];
    const dataSize = this.state.data[criteria]?.dataSize || 0;
    const dataOfBing = this.state.dataOfBing ? this.state.dataOfBing : [];
    const { src } = this.state;
    const dataList = [
      'Racing car sprays burning fuel into crowd.',
      'Japanese princess to wed commoner.',
      'Australian walks 100km after outback crash.',
      'Man charged over missing wedding girl.',
      'Los Angeles battles huge wildfires.',
    ];
    switch (curPath) {
      case '/network':
        return (
          <div>
            <Row gutter={16}>
              <Col className="gutter-row" span={8}>
                <Table
                  rowKey={(record) => record.title}
                  columns={this.columnsBaidu}
                  dataSource={dataOfBaidu}
                  pagination={{
                    position: ['none', 'bottomRight'],
                    total: 100,
                  }}
                  loading={loadingBaidu}
                  onChange={this.handleBaiduPageChange}
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <Table
                  rowKey={(record) => record.title}
                  columns={this.columns360}
                  dataSource={dataOf360}
                  pagination={{
                    position: ['none', 'bottomRight'],
                    total: 100,
                  }}
                  loading={loading360}
                  onChange={this.handle360PageChange}
                />
              </Col>
              <Col className="gutter-row" span={8}>
                <Table
                  rowKey={(record) => record.title}
                  columns={this.columnsBing}
                  dataSource={dataOfBing}
                  pagination={{
                    position: ['none', 'bottomRight'],
                    total: 100,
                  }}
                  loading={loadingBing}
                  onChange={this.handleBingPageChange}
                />
              </Col>
            </Row>
          </div>
        );
      case '/result':
        return (
          <div className="overall-wrap">
            <div className="mts-overall-container">
              <GlobalMultiFilter
                initialKeyword={keyword}
                current={current}
                userType={this.props.userType}
                userEventLimiter={this.props.userEventLimiter}
                onSelect={this.handleSelect}
                onSearch={this.handleKeywordChange}
                onDateChange={this.handleDateChange}
              />
              <GlobalDataList
                data={data}
                dataSize={dataSize}
                pageSize={pageSize}
                loading={loading}
                onPageChange={this.handlePageChange}
                onPageSizeChange={this.handlePageSizeChange}
              />
            </div>
          </div>
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
              <Radio.Group onChange={this.onRadioChange} value={radiovalue}>
                <Radio value={1}>库内搜索</Radio>
                <Radio value={2}>网络搜索</Radio>
              </Radio.Group>
              <Input.Search
                className="search-entry-input"
                onChange={e => this.setState({ keyword: e.target.value })}
                value={keyword}
                size="large"
                onSearch={this.handleSearch}
              />
            </div>
          </AutofitWrap>
        );
    }
  }
}

const mapStateToProps = (state) => ({
  overallPath: state.overallPath,
  userType: state.userType,
  userEventLimiter: state.userEventLimiter,
});
const mapDispatchToProps = {
  onOverallPathChange: actions.onOverallPathChange,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Overall));
