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
import getProgrammeSourceTrend from '../../../services/request/programme/getProgrammeSourceTrend';
import getProgrammeTotalAmountTrend from '../../../services/request/programme/getProgrammeTotalAmountTrend';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const data1 = {
  'name': '',
  'children': [
    {
      'name': '??????????????????????????????',
      'children': [
        {
          'name': '???????????????',
          'children': [
            { 'name': '??????????????? ',
              'children': [
                { 'name': '??????' },
                { 'name': '?????????????????????' },
              ],
            }],
        },
        {
          'name': '?????????998001',
          'children': [
            { 'name': 'PoiPoiPoooooo' },
          ],
        },
        {
          'name': '??????????????????',
          'children': [
            { 'name': 'SH????????????' },
          ],
        },
        {
          'name': '?????????????????????',
          'children': [
            { 'name': '??????????????????',
              'children': [
                { 'name': 'Tracy0791' },
              ],
            },
          ],
        },
      ],
    },
    {
      'name': 'mj??????',
      'children': [
        { 'name': '????????????????????????' },
        { 'name': '??????????' },
        { 'name': '???????????????' },
        { 'name': '?????????' },
        { 'name': '????????????89365' },
        {
          'name': '?????????',
          'children': [
            { 'name': '????????????' },
            { 'name': 'oliviatian' },
            { 'name': '????????????-????????????' },
            { 'name': '????????????' },
            { 'name': '?????????????????????' },
            { 'name': '??????????????????' },
          ],
        },
        { 'name': 'whowho??????',
          'children': [
            { 'name': 'tina??????' },
          ],
        },
      ],
    },
    {
      'name': '????????????',
      'children': [
        { 'name': '????????????' },
        { 'name': 'Mmin70' },
        { 'name': '???????????????' },
        { 'name': '?????????' },
        { 'name': '????????????28861' },
        { 'name': '????????????576' },
        { 'name': '????????????????????????' },
        { 'name': '????????????????????????' },
        {
          'name': '??????900',
          'children': [
            { 'name': 'lower??????' },
            { 'name': '?????????80906' },
            { 'name': '???hulixiao' },
          ],
        },
        { 'name': '????????????' },
      ],
    },
    {
      'name': '?????????',
      'children': [
        { 'name': '??????????????????' },
        { 'name': '?????????????????????' },
        { 'name': '??????????????????' },
        { 'name': '????????????poi' },
        { 'name': '?????????' },
        { 'name': '???????????????????????????' },
        {
          'name': '?????????',
          'children': [
            { 'name': '????????????' },
            { 'name': '??????????????????' },
            { 'name': '????????????w' },
          ],
        },
        { 'name': '???????????????76846' },
        {
          'name': 'JW2014',
          'children': [
            { 'name': '????????????????????????' },
          ],
        },
      ],
    },
    {
      'name': '????????????',
      'children': [
        { 'name': '??????HAlf' },
        { 'name': '????????????' },
        {
          'name': '????????????',
          'children': [
            { 'name': '????????????' },
            { 'name': '???????????????' },
            { 'name': '??????-?????????jjy' },
            {
              'name': 'Luuuuuuuhani',
              'children': [
                { 'name': '???????????????' },
              ],
            },
            {
              'name': '?????????',
              'children': [
                { 'name': 'CaryCox' },
              ],
            },
          ],
        },
      ],
    },
    {
      'name': '?????????',
      'children': [
        { 'name': '???????????????' },
        { 'name': '????????????' },
        {
          'name': '????????????',
          'children': [
            {
              'name': '???????????????',
              'children': [
                { 'name': '????????????' },
              ],
            },
            {
              'name': '?????????????????????',
              'children': [
                { 'name': '??????????????' },
                { 'name': '527agp5tw47jdpgtamwg' },
                { 'name': '???????????????????????????' },
              ],
            },
          ],
        },
        {
          'name': '?????????',
          'children': [
            { 'name': '??????' },
          ],
        },
        {
          'name': '?????????????????????',
          'children': [
            {
              'name': '???????????????',
              'children': [
                { 'name': '???????????????????????????' },
              ],
            },
            {
              'name': '????????????????????????',
            },
          ],
        },
      ],
    },
    {
      'name': '????????????',
      'children': [
        { 'name': '???????????????' },
        { 'name': '???????????????????????????' },
        { 'name': '???????????????' },
        {
          'name': '?????????????????????',
          'children': [
            { 'name': 'TwentiethCenturyBot' },
          ],
        },
      ],
    },
  ],
};

const data2 = {
  'name': '',
  'children': [
    {
      'name': '??????????????????',
      'data': { 'time': '2022-02-24 12:28' },
      'children': [
        { 'name': '?????????1????????????', 'data': { 'time': '2022-03-01 20:14' } },
        { 'name': 'SWIFT', 'data': { 'time': '2022-02-27 06:42' } },
        { 'name': '????????????', 'data': { 'time': '2022-02-27 01:54' } },
        { 'name': '???????????????', 'data': { 'time': '2022-02-28 08:52' } },
        { 'name': '????????????',
          'data': { 'time': '2022-02-26 15:53' },
          'children': [
            { 'name': '????????????', 'data': { 'time': '2022-02-27 20:01' } },
            { 'name': '?????????', 'data': { 'time': '2022-02-28 09:02' } },
          ] },
      ],
    },
    {
      'name': '????????????',
      'data': { 'time': '2022-02-22 07:24' },
      'children': [
        { 'name': '??????', 'data': { 'time': '2022-02-26 14:23' } },
        { 'name': '??????', 'data': { 'time': '2022-03-01 00:08' } },
        { 'name': '????????????', 'data': { 'time': '2022-02-28 17:01' } },
        {
          'name': '????????????',
          'data': { 'time': '2022-02-28 18:36' },
          'children': [
            { 'name': '????????????', 'data': { 'time': '2022-02-28 19:01' } },
            { 'name': '?????????????????????', 'data': { 'time': '2022-03-01 19:31' } },
            { 'name': '?????????', 'data': { 'time': '2022-03-02 01:57' } },
          ],
        },
      ],
    },
    {
      'name': '??????',
      'data': { 'time': '2022-02-22 23:26' },
      'children': [
        { 'name': '????????????', 'data': { 'time': '2022-02-23 07:17' } },
        { 'name': '?????????????????????', 'data': { 'time': '2022-02-24 12:56' } },
        { 'name': '????????????????????????', 'data': { 'time': '2022-02-24 11:34' } },
      ],
    },
    {
      'name': '????????????',
      'data': { 'time': '2022-02-24 11:26' },
      'children': [
        {
          'name': '??????',
          'data': { 'time': '2022-02-24 14:42' },
          'children': [
            { 'name': '???????????????', 'data': { 'time': '2022-03-01 02:34' } },
            { 'name': '????????????', 'data': { 'time': '2022-02-24 20:01' } },
            { 'name': '??????????????????', 'data': { 'time': '2022-02-28 19:01' } },
            { 'name': '????????????', 'data': { 'time': '2022-02-28 18:02' } },
          ],
        },
        {
          'name': '??????',
          'data': { 'time': '2022-02-25 21:55' },
          'children': [
            { 'name': '?????????????????????', 'data': { 'time': '2022-02-26 02:35' } },
            { 'name': '????????????', 'data': { 'time': '2022-02-26 01:05' } },
            { 'name': '????????????', 'data': { 'time': '2022-02-26 15:48' } },
          ],
        },
        {
          'name': '??????????????????????????????',
          'data': { 'time': '2022-02-25 01:25' },
          'children': [
            { 'name': '?????????', 'data': { 'time': '2022-02-26 03:02' } },
            { 'name': '???????????????', 'data': { 'time': '2022-02-27 15:16' } },
          ],
        },
      ],
    },
    {
      'name': '??????????????????',
      'data': { 'time': '2022-02-25 23:25' },
      'children': [
        { 'name': '???????????????', 'data': { 'time': '2022-02-27 16:02' } },
        { 'name': '?????????????????????', 'data': { 'time': '2022-02-28 12:49' } },
        { 'name': '????????????????????????', 'data': { 'time': '2022-03-01 16:46' } },
        { 'name': '????????????', 'data': { 'time': '2022-02-26 02:03' } },
      ],
    },
  ],
};

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
      case 4: if (!this.state.totalAmountTrend[criteria]) this.getTotalAmountTrend(); break;
      case 5: if (!this.state.sourceAmountTrend[criteria]) this.getSourceTrend(); break;
      case 6: if (!this.state.regionLayout[fid]) this.getRegionLayout(); break;
      case 1: if (!this.state.data[fid]) this.getLatestInfo(); break;
      case 7: if (!this.state.emotionLayout[fid]) this.getEmotionLayout(); break; // ????????????
      case 8: if (!this.state.emotionTrend[criteria]) this.getEmotionTrend(); break; // ????????????
      case 9: if (!this.state.eventTree[fid]) this.getEventTree(); break; // ????????????
      case 10: if (!this.state.traceTree[fid]) this.getTraceTree(); break; // ????????????1
      case 11: if (!this.state.traceTree[fid]) this.getTraceTree(); break; // ????????????2
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
      this.state.startPublishedDay, // startPublishDay
      this.state.endPublishedDay, // endPublishDay
      null, // sensitiveFlag
      null, // emotion
      0, // timeOrder
      PAGE_SIZE, // pageSize
      0, // pageId
    ];
    const result = await getProgrammeData(...params);
    console.log(result);
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
    console.log(emotionTrend);
    const criteria = this.getCriteria();
    const newData = { ...this.state.emotionTrend };
    newData[criteria] = emotionTrend;
    this.setState({ emotionTrend: newData });
  };

  getEmotionLayout = async () => {
    // const { startPublishedDay, endPublishedDay } = this.state;
    const { fid } = this.props.curProgramme;
    const emotionLayout = await getProgrammeSentimentLayout(fid, null, null);
    console.log(emotionLayout);
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
    if (traceTree.children && !traceTree.children.length) traceTree.children = [{ name: '?????????' }];
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
    // const { startPublishedDay, endPublishedDay } = this.state;
    const regionLayout = await getProgrammeRegionLayout(fid, null, null);
    const criteria = this.getCriteria();
    const newData = { ...this.state.regionLayout };
    newData[fid] = regionLayout;
    this.setState({ regionLayout: newData });
  };

  getSourceLayout = async () => {
    const { fid } = this.props.curProgramme;
    // const { startPublishedDay, endPublishedDay } = this.state;
    const sourceLayout = await getProgrammeSourceLayout(fid, null, null);
    const criteria = this.getCriteria();
    const newData = { ...this.state.sourceLayout };
    newData[fid] = sourceLayout;
    this.setState({ sourceLayout: newData });
  };

  getSensiLayout = async () => {
    const { fid } = this.props.curProgramme;
    // { startPublishedDay, endPublishedDay } = this.state;
    const sensiLayout = await getProgrammeSensiLayout(fid, null, null);
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

  getSourceTrend=async () => {
    const { fid } = this.props.curProgramme;
    const { startPublishedDay, endPublishedDay } = this.state;
    const sourceAmountTrend = await getProgrammeSourceTrend(fid, startPublishedDay, endPublishedDay);
    const criteria = this.getCriteria();
    const newData = { ...this.state.sourceAmountTrend };
    newData[criteria] = sourceAmountTrend;
    this.setState({ sourceAmountTrend: newData });
  };

  getTotalAmountTrend=async () => {
    const { fid } = this.props.curProgramme;
    const { startPublishedDay, endPublishedDay } = this.state;
    const totalAmountTrend = await getProgrammeTotalAmountTrend(fid, startPublishedDay, endPublishedDay);
    const criteria = this.getCriteria();
    const newData = { ...this.state.totalAmountTrend };
    newData[criteria] = totalAmountTrend;
    this.setState({ totalAmountTrend: newData });
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
      this.getSourceTrend();
      this.getTotalAmountTrend();
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
                <div className="theme">????????????</div>
                <div className="summary">???????????????{summary[fid]?.replace(/\s/g, '')}</div>
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
                title="???????????????"
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
                title="????????????"
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
                title="????????????"
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
                title="????????????"
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
                title="????????????"
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
                title="????????????"
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
                title="???????????????"
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
                title="????????????"
                type="connGraph"
                size="big"
                data={data2}
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
                title="????????????"
                type="defaultTree"
                size="big"
                data={data1}
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
                title="????????????"
                type="circleTree"
                size="big"
                data={data1}
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
