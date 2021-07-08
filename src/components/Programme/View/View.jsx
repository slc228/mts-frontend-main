import React from 'react';
import moment from 'moment';
import './View.scss';
import { connect } from 'react-redux';
import { Button, Carousel, Modal } from 'antd';
import { Divider } from 'antd/es';
import Echart from '../../common/Echart/Echart';
import getAmountTrend from '../../../services/request/data/getAmountTrend';
import getSensiLayout from '../../../services/request/data/getSensiLayout';
import getSourceLayout from '../../../services/request/data/getSourceLayout';
import getRegionLayout from '../../../services/request/data/getRegionLayout';
import getTraceTree from '../../../services/request/data/getTraceTree';
import WordCloud from '../../common/WordCloud/WordCloud';
import getKeywordsCloud from '../../../services/request/data/getKeywordsCloud';
import getProgrammeData from '../../../services/request/data/getProgrammeData';
import AutofitWrap from '../../common/AutofitWrap/AutofitWrap';
import getProgrammeSensiLayout from '../../../services/request/programme/getProgrammeSensiLayout';
import getProgrammeSourceLayout from '../../../services/request/programme/getProgrammeSourceLayout';
import getProgrammeAmountTrend from '../../../services/request/programme/getProgrammeAmountTrend';
import getProgrammeRegionLayout from '../../../services/request/programme/getProgrammeRegionLayout';
import getEventTree from '../../../services/request/data/getEventTree';
import getProgrammeSentimentLayout from '../../../services/request/programme/getProgrammeSentimentLayout';
import getProgrammeSentimentTrend from '../../../services/request/programme/getProgrammeSentimentTrend';
import DateSelector from '../../common/DateSelector/DateSelector';
import getProgrammeSummary from '../../../services/request/programme/getProgrammeSummary';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class View extends React.Component {
  constructor() {
    super();
    this.state = {
      endPublishedDay: moment().format(DATE_FORMAT),
      startPublishedDay: moment().subtract(1, 'month').format(DATE_FORMAT),
      sensiLayout: {},
      sourceLayout: {},
      totalAmountTrend: {},
      sourceAmountTrend: {},
      regionLayout: {},
      traceTree: {},
      keywordsCloud: {},
      emotionLayout: {},
      eventTree: {},
      emotionTrend: {},
      data: {},
      summary: {},
      curPage: 0,
      visible: false,
      curEvent: undefined,
    };
  }

  getCriteria = () => {
    const fid = this.props.curProgramme?.fid;
    const { startPublishedDay, endPublishedDay } = this.state;
    const criteria = { fid, startPublishedDay, endPublishedDay };
    return JSON.stringify(criteria);
  };

  formatSummary = (summary) => {
    summary = summary.replace(/\s/g, '');
    const arr = [];
    while (summary.length) {
      arr.push(summary.substr(0, 8));
      summary = summary.substr(8);
    }
    return arr.join('\n');
  };

  formatEventTree = (rawData) => {
    const list = [rawData];
    rawData.summary = this.props.curProgramme.name;
    rawData.time = '';
    while (list.length) {
      const head = list.shift();
      head.name = ` ${head.time}\n${this.formatSummary(head.summary)}`;
      head.children = head.childList;
      head.data = {
        clusterNum: head.clusterNum,
        clusterData: head.clusterDatas,
        time: head.time,
        summary: head.summary.replace(' ', ''),
      };
      head.children && head.children.forEach((item) => {
        list.push(item);
      });
    }
    console.log(rawData);
    return rawData;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.curProgramme?.fid !== this.props.curProgramme?.fid) {
      this.carousel.goTo(0);
      this.handleCarouselChange(0);
    }
  }

  componentDidMount() {
    this.handleCarouselChange(0);
    this.mouseWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.deltaY > 0) this.carousel.next();
      else this.carousel.prev();
    };
    this.carouselWrap.addEventListener('mousewheel', this.mouseWheel);
  }

  componentWillUnmount() {
    this.carouselWrap.removeEventListener('mousewheel', this.mouseWheel);
  }

  handleCarouselChange = (current) => {
    const criteria = this.getCriteria();
    const { fid } = this.props.curProgramme;
    switch (current) {
      case 0: if (!this.state.keywordsCloud[fid]) this.getKeywordsCloud(); break;
      case 2: if (!this.state.sensiLayout[fid]) this.getSensiLayout(); break;
      case 3: if (!this.state.sourceLayout[fid]) this.getSourceLayout(); break;
      case 4: if (!this.state.totalAmountTrend[criteria]) this.getAmountTrend(); break;
      case 5: if (!this.state.sourceAmountTrend[criteria]) this.getAmountTrend(); break;
      case 6: if (!this.state.regionLayout[fid]) this.getRegionLayout(); break;
      case 1: if (!this.state.data[fid]) this.getLatestInfo(); break;
      case 7: if (!this.state.emotionLayout[fid]) this.getEmotionLayout(); break; // 情感分布
      case 8: if (!this.state.emotionTrend[criteria]) this.getEmotionTrend(); break; // 情感趋势
      case 9: if (!this.state.eventTree[fid]) this.getEventTree(); break; // 事件溯源
      case 10: if (!this.state.traceTree[fid]) this.getTraceTree(); break; // 话题溯源1
      case 11: if (!this.state.traceTree[fid]) this.getTraceTree(); break; // 话题溯源2
      default: break;
    }
    this.setState({ curPage: current });
  };

  getLatestInfo = async () => {
    const PAGE_SIZE = 12;
    const params = [
      this.props.curProgramme.fid,
      '', // keyword
      null, // source
      '', // startPublishDay
      '', // endPublishDay
      null, // sensitiveFlag
      0, // timeOrder
      PAGE_SIZE, // pageSize
      0, // pageId
    ];
    const result = await getProgrammeData(...params);
    const { fid } = this.props.curProgramme;
    const newData = { ...this.state.data };
    newData[fid] = result.data;
    this.setState({ data: newData });
    const summaryResult = await getProgrammeSummary(fid, '', '');
    const newSummary = { ...this.state.summary };
    newSummary[fid] = summaryResult.summary;
    this.setState({ summary: newSummary });
  };

  getEmotionTrend = async () => {
    const { startPublishedDay, endPublishedDay } = this.state;
    const { fid } = this.props.curProgramme;
    const emotionTrend = await getProgrammeSentimentTrend(fid, startPublishedDay, endPublishedDay);
    const criteria = this.getCriteria();
    const newData = { ...this.state.emotionTrend };
    newData[criteria] = emotionTrend;
    this.setState({ emotionTrend: newData });
  };

  getEmotionLayout = async () => {
    const { startPublishedDay, endPublishedDay } = this.state;
    const { fid } = this.props.curProgramme;
    const emotionLayout = await getProgrammeSentimentLayout(fid, startPublishedDay, endPublishedDay);
    const criteria = this.getCriteria();
    const newData = { ...this.state.emotionLayout };
    newData[fid] = emotionLayout;
    this.setState({ emotionLayout: newData });
  };

  getKeywordsCloud = async () => {
    const { startPublishedDay, endPublishedDay } = this.state;
    const { fid } = this.props.curProgramme;
    const wordNumber = 50;
    const keywordsCloud = await getKeywordsCloud(fid, startPublishedDay, endPublishedDay, wordNumber);
    const criteria = this.getCriteria();
    const newData = { ...this.state.keywordsCloud };
    newData[fid] = keywordsCloud;
    this.setState({ keywordsCloud: newData });
  };

  getTraceTree = async () => {
    const { fid } = this.props.curProgramme;
    const { startPublishedDay, endPublishedDay } = this.state;
    const traceTree = await getTraceTree(fid, startPublishedDay, endPublishedDay);
    if (traceTree.children && !traceTree.children.length) traceTree.children = [{ name: '无信息' }];
    // if (traceTree.children && traceTree.children.length > 50) traceTree.children = traceTree.children.slice(0, 50);
    if (traceTree.children && traceTree.children.length > 20) {
      const withChildren = traceTree.children.filter(item => item.children.length);
      const noChildren = traceTree.children.filter(item => !item.children.length);
      if (withChildren.length > 20) traceTree.children = withChildren.slice(0, 20);
      else traceTree.children = withChildren.concat(noChildren.slice(0, 20 - withChildren.length));
    }
    traceTree.name = this.props.curProgramme.name;
    const criteria = this.getCriteria();
    const newData = { ...this.state.traceTree };
    newData[fid] = traceTree;
    this.setState({ traceTree: newData });
  };

  getRegionLayout = async () => {
    const { fid } = this.props.curProgramme;
    const { startPublishedDay, endPublishedDay } = this.state;
    const regionLayout = await getProgrammeRegionLayout(fid, startPublishedDay, endPublishedDay);
    const criteria = this.getCriteria();
    const newData = { ...this.state.regionLayout };
    newData[fid] = regionLayout;
    this.setState({ regionLayout: newData });
  };

  getSourceLayout = async () => {
    const { fid } = this.props.curProgramme;
    const { startPublishedDay, endPublishedDay } = this.state;
    const sourceLayout = await getProgrammeSourceLayout(fid, startPublishedDay, endPublishedDay);
    const criteria = this.getCriteria();
    const newData = { ...this.state.sourceLayout };
    newData[fid] = sourceLayout;
    this.setState({ sourceLayout: newData });
  };

  getSensiLayout = async () => {
    const { fid } = this.props.curProgramme;
    const { startPublishedDay, endPublishedDay } = this.state;
    const sensiLayout = await getProgrammeSensiLayout(fid, startPublishedDay, endPublishedDay);
    const criteria = this.getCriteria();
    const newData = { ...this.state.sensiLayout };
    newData[fid] = sensiLayout;
    this.setState({ sensiLayout: newData });
  };

  getAmountTrend = async () => {
    const { fid } = this.props.curProgramme;
    const { startPublishedDay, endPublishedDay } = this.state;
    const [totalAmountTrend, sourceAmountTrend] =
        await getProgrammeAmountTrend(fid, startPublishedDay, endPublishedDay);
    const criteria = this.getCriteria();
    const newData1 = { ...this.state.totalAmountTrend };
    newData1[criteria] = totalAmountTrend;
    const newData2 = { ...this.state.sourceAmountTrend };
    newData2[criteria] = sourceAmountTrend;
    this.setState({ sourceAmountTrend: newData2, totalAmountTrend: newData1 });
  };

  getEventTree = async () => {
    const { fid } = this.props.curProgramme;
    const { startPublishedDay, endPublishedDay } = this.state;
    const eventTree = await getEventTree(fid, startPublishedDay, endPublishedDay);
    const formatedEventTree = this.formatEventTree(eventTree);
    const criteria = this.getCriteria();
    const newData = { ...this.state.eventTree };
    newData[fid] = formatedEventTree;
    this.setState({ eventTree: newData });
  };

  handleDateChange = (moments) => {
    const [startMoment, endMoment] = moments;
    this.setState({
      startPublishedDay: startMoment.format(DATE_FORMAT),
      endPublishedDay: endMoment.format(DATE_FORMAT),
    }, () => {
      this.getAmountTrend();
      this.getEmotionTrend();
    });
  };

  handleWeiboTreeClick = (e) => {
    const url = e.data?.data?.url;
    if (/^http/.test(url)) window.open(url);
  };

  handleEventTreeClick = (e) => {
    const data = e?.data?.data;
    console.log(e?.data?.data);
    this.setState({
      visible: true,
      curEvent: {
        sumamry: data.summary,
        clusterData: data.clusterData,
      },
    });
  };

  handleModalCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { data, curEvent, visible, summary, emotionTrend, emotionLayout, eventTree, sensiLayout, regionLayout, sourceLayout, totalAmountTrend, sourceAmountTrend, traceTree, keywordsCloud, traceTreeFormat } = this.state;
    const criteria = this.getCriteria();
    const { fid } = this.props.curProgramme;
    const { curPage } = this.state;
    console.log(curEvent);
    return (
      <div
        className="view"
        ref={r => this.carouselWrap = r}
      >
        {curEvent && (
          <Modal
            title={curEvent.sumamry}
            visible={visible}
            onCancel={this.handleModalCancel}
            wrapClassName="mts-data-list2"
            className="mts-content-modal2"
            footer={[]}
          >
            {curEvent.clusterData.map((item) => (
              <a onClick={() => { window.open(item.webpageUrl); }}>{item.webpageUrl}</a>
            ))}
          </Modal>
        )}
        {(curPage === 4 || curPage === 5 || curPage === 8) && (
          <DateSelector
            className="view-date-selector"
            onDateSelect={this.handleDateChange}
          />
        )}
        {curPage === 6 && (
          <div className="region-rank">
            {regionLayout[fid] && regionLayout[fid].regions.sort((a, b) => (b.value - a.value)).map((item) => (
              <div className="region-rank-item">{item.name} {item.value}</div>
            ))}
          </div>
        )}
        <Carousel
          ref={r => this.carousel = r}
          dotPosition="left"
          dots={{ className: 'dots' }}
          afterChange={this.handleCarouselChange}
          className="view-wrap"
        >
          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <WordCloud
                option={keywordsCloud[fid]}
              />
            </AutofitWrap>
          </div>
          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <div className="latest-info">
                <div className="theme">最新舆情</div>
                <div className="summary">话题摘要：{summary[fid]?.replace(/\s/g, '')}</div>
                <div className="latest-info-item-group">
                  {data[fid] && data[fid].map((item) => (
                    <div className="latest-info-item">
                      <div className="title">{item.title}</div>
                      <div className="content">{item.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AutofitWrap>
          </div>
          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <Echart
                title="敏感度分布"
                type="doughnutPie"
                data={sensiLayout[fid]}
                size="big"
              />
            </AutofitWrap>
          </div>
          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <Echart
                title="来源分布"
                type="defaultPie"
                data={sourceLayout[fid]}
                size="big"
              />
            </AutofitWrap>
          </div>
          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <Echart
                title="总量趋势"
                type="areaLine"
                data={totalAmountTrend[criteria]}
                size="big"
              />
            </AutofitWrap>
          </div>
          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <Echart
                title="来源趋势"
                type="horizontalBar"
                data={sourceAmountTrend[criteria]}
                size="big"
              />
            </AutofitWrap>
          </div>
          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >

              <Echart
                title="地域分布"
                type="chinaMap"
                data={regionLayout[fid]}
                size="big"
              />
            </AutofitWrap>
          </div>

          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <Echart
                title="情感分析"
                type="defaultPie"
                data={emotionLayout[fid]}
                size="big"
              />
            </AutofitWrap>
          </div>
          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <Echart
                title="情感趋势图"
                type="horizontalBar"
                data={emotionTrend[criteria]}
                size="big"
              />
            </AutofitWrap>
          </div>
          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <Echart
                title="事件溯源"
                type="connGraph"
                size="big"
                data={eventTree[fid]}
                onClick={this.handleEventTreeClick}
              />
            </AutofitWrap>
          </div>
          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <Echart
                title="微博溯源"
                type="defaultTree"
                size="big"
                data={traceTree[fid]}
                onClick={this.handleWeiboTreeClick}
              />
            </AutofitWrap>
          </div>
          <div className="carousel-item">
            <AutofitWrap
              minHeight={550}
              padding={200}
            >
              <Echart
                title="微博溯源"
                type="circleTree"
                size="big"
                data={traceTree[fid]}
                onClick={this.handleWeiboTreeClick}
              />
            </AutofitWrap>
          </div>
        </Carousel>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  curProgramme: state.curProgramme,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(View);
