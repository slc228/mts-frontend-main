import React from 'react';
import '../../utils/tagCanvas';
import './Home.scss';
import { Carousel, Card, Table } from 'antd';
import moment from 'moment';
import { LoadingOutlined } from '@ant-design/icons';
import Lodash from 'lodash';
import requests from '../../services/requests';
import constant from '../../config/constant';
import DataContent from '../common/DataContent/DataContent';
import getOverallData from '../../services/request/data/getOverallData';
import AutofitWrap from '../common/AutofitWrap/AutofitWrap';
import Loading from '../common/Loading/Loading';
import criteria from '../common/MultiFilter/criteria';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      curRecord: undefined,
      visible: false,
      tags: [],
      sensitiveInfo: undefined,
      latestInfo: undefined,
      sensitiveLoading: false,
      latestLoading: false,
    };
  }

  componentDidMount() {
    // this.handleRefresh();
    this.handleSearch();
    this.event = setInterval(this.handleSearch, 20000);
  }

  componentWillUnmount() {
    clearInterval(this.event);
  }

  handleSearch = () => {
    this.getSensitiveInfo();
    this.getLatestInfo();
  };

  getSensitiveInfo = async () => {
    this.setState({ sensitiveLoading: true });
    const PAGE_SIZE = 10;
    const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
    const params = [
      '', // keyword
      null, // source
      '', // startPublishDay
      '', // endPublishDay
      1, // sensitiveFlag
      0, // timeOrder
      PAGE_SIZE, // pageSize
      0, // pageId
    ];
    const result = await getOverallData(...params);
    this.setState({
      sensitiveInfo: result.data,
      sensitiveLoading: false,
    });
  };

  getLatestInfo = async () => {
    this.setState({ latestLoading: true });
    const PAGE_SIZE = 10;
    const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
    const params = [
      '', // keyword
      null, // source
      '', // startPublishDay
      '', // endPublishDay
      null, // sensitiveFlag
      0, // timeOrder
      PAGE_SIZE, // pageSize
      0, // pageId
    ];
    const result = await getOverallData(...params);
    this.setState({
      latestLoading: false,
      latestInfo: result.data,
    });
  };

  handleRefresh = () => {
    fetch(requests.getTopics.url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        new Promise((resolve) => {
          this.setState({ tags: result.tags });
          resolve();
        })
          .then(() => {
            try {
              window.TagCanvas.Start('canvas', 'tags', {
                textColour: '#1890ff',
                outlineColour: '#1890ff',
                reverse: true,
                depth: 0.8,
                dragControl: true,
                decel: 0.95,
                maxSpeed: 0.05,
                initial: [-0.2, 0],
              });
            } catch (e) { console.error('Load word cloud error, result =', result); }
          });
      });
  };

  handleTitleClick = (item) => {
    // e.preventDefault();
    // console.log(e.target.innerHTML);
    this.setState({
      visible: true,
      curRecord: item,
    });
  };

  handleModalCancel = () => {
    this.setState({
      visible: false,
    });
  };

  renderSource = (text) => {
    const options = Lodash.find(criteria, { name: 'source' })?.options || [];
    return Lodash.find(options, { value: text })?.label || '';
  };

  render() {
    const { tags, curRecord, visible, sensitiveInfo, latestInfo, sensitiveLoading, latestLoading } = this.state;
    return (
      <div
        className="home-wrap"
      >
        <Card
          title="敏感信息列表"
          className="home-card"
          loading={sensitiveLoading}
        >
          {sensitiveInfo ?
            sensitiveInfo.map((item) => (item.content ? (
              <div
                className="item"
                onClick={e => this.handleTitleClick(item)}
              >
                <span className="subtitle2">{item.title}</span>
                <span className="addr2">
                  [{this.renderSource(item.source)} {moment(item.publishedDay).subtract(8, 'hours').month() + 1}/{moment(item.publishedDay).subtract(8, 'hours').date()}]
                </span>
                <span className="content2">
                  {item.content.replace(/\\n/g, '')}
                </span>
              </div>
            ) : null)) :
            <Loading />}
        </Card>
        <Card
          title="最新舆情"
          className="home-card"
          loading={latestLoading}
        >
          {latestInfo ?
            latestInfo.map((item) => (item.content ? (
              <div
                className="item"
                onClick={e => this.handleTitleClick(item)}
              >
                <span className="subtitle2">{item.title}</span>
                <span className="addr2">
                  [{this.renderSource(item.source)} {moment(item.publishedDay).subtract(8, 'hours').month() + 1}/{moment(item.publishedDay).subtract(8, 'hours').date()}]
                </span>
                <span className="content2">
                  {item.content.replace(/\\n/g, '')}
                </span>
              </div>
            ) : null)) :
            <Loading />}
        </Card>
        <DataContent
          record={curRecord}
          visible={visible}
          handleModalCancel={this.handleModalCancel}
        />
      </div>
    );
  }
}

export default Home;
