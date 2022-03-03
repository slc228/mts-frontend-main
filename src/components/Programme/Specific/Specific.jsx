import React from 'react';
import moment from 'moment';
import Lodash from 'lodash';
import { Card, Image, Layout, List, Tabs } from 'antd';
import { connect } from 'react-redux';
import getProgrammeData from '../../../services/request/data/getProgrammeData';
import getContentEmotion from '../../../services/request/data/getContentEmotion';
import MultiFilter from '../../common/MultiFilter/MultiFilter';
import DataList from '../../common/DataList/DataList';
import './Specific.scss';
import { actions } from '../../../redux/actions';
import getContentTag from '../../../services/request/data/getContentTag';
import getOverallData from '../../../services/request/data/getOverallData';
import getSensitiveType from '../../../services/request/data/getSensitiveType';
import modeifyMaterial from '../../../services/request/data/modeifyMaterial';
import getMaterial from '../../../services/request/data/getMaterial';
import getResources from '../../../services/request/data/getResources';
import VideoMultiFilter from '../../common/VideoMultiFilter/VideoMultiFilter';
import getVideoData from '../../../services/request/data/getVideoData';
import VideoList from '../../common/VideoList/VideoList';

const PAGE_SIZE = 10;
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class Specific extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageId: 0,
      pageSize: PAGE_SIZE,
      keyword: '',
      source: null,
      startPublishedDay: '',
      endPublishedDay: '',
      sensitiveType: null,
      emotion: null,
      dateRange: null,
      loading: false,
      timeOrder: 0,
      data: {},
      selectedRowKeys: [],
      materiallibs: [],
      resources: [],
      videoKeyword: '',
      videoLoading: false,
      videoSource: null,
      videoTimeOrder: 0,
      videoDateRange: null,
      videoStartPublishedDay: '',
      videoEndPublishedDay: '',
      videoData: {},
      videoPageId: 0,
      videoPageSize: PAGE_SIZE,
    };
  }

  getCriteria = () => {
    const fid = this.props.curProgramme?.fid;
    const { keyword, source, startPublishedDay, endPublishedDay, sensitiveType, timeOrder, pageSize, pageId } = this.state;
    const criteria = { fid, keyword, source, startPublishedDay, endPublishedDay, sensitiveType, timeOrder, pageSize, pageId };
    return JSON.stringify(criteria);
  };

  getMateriallibs= async () => {
    const { fid } = this.props.curProgramme;
    const ret = await getMaterial(fid);
    this.setState({
      materiallibs: ret,
    });
  };

  async componentDidMount() {
    this.handleSearch();
    this.handleVideoSearch();
    this.getMateriallibs();
    const result = await getResources();
    this.setState({
      resources: result,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const criteria = this.getCriteria();
    if (!this.state.data[criteria] && !this.state.loading) {
      this.handleSearch();
      this.handleVideoSearch();
      this.getMateriallibs();
    }
  }

  handleSearch = async () => {
    await this.setState({ loading: true, data: {} });
    const fid = this.props.curProgramme?.fid;
    const { keyword, source, startPublishedDay, endPublishedDay, sensitiveType, emotion, timeOrder, pageSize, pageId, data } = this.state;
    const params = [fid, keyword, source, startPublishedDay, endPublishedDay, sensitiveType, emotion, timeOrder, pageSize, pageId];
    const result = await getProgrammeData(...params);
    const newData = { ...data };
    newData[this.getCriteria()] = result;
    this.setState({
      loading: false,
      data: newData,
    });
  };

  handleVideoSearch = async () => {
    await this.setState({ videoLoading: true,
      videoData: {} });
    const fid = this.props.curProgramme?.fid;
    const { videoKeyword, videoSource, videoStartPublishedDay, videoEndPublishedDay, videoTimeOrder, videoPageSize, videoPageId, videoData } = this.state;
    let source;
    if (!videoSource) { source = ''; }
    if (videoSource === 0) { source = '抖音'; }
    if (videoSource === 1) { source = '快手'; }
    if (videoSource === 2) { source = '西瓜'; }
    if (videoSource === 3) { source = '优酷'; }
    if (videoSource === 4) { source = '腾讯'; }
    if (videoSource === 5) { source = 'B站'; }
    console.log(videoKeyword);
    const result = await getVideoData(fid, videoKeyword, source, videoStartPublishedDay, videoEndPublishedDay, videoTimeOrder, videoPageSize, videoPageId);
    this.setState({
      videoLoading: false,
      videoData: result,
    });
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

  handleVideoDateChange = (moments) => {
    if (!moments) {
      this.setState({
        videoStartPublishedDay: '',
        videoEndPublishedDay: '',
      });
      return;
    }
    const [startMoment, endMoment] = moments;
    this.setState({
      videoStartPublishedDay: startMoment.format(DATE_FORMAT),
      videoEndPublishedDay: endMoment.format(DATE_FORMAT),
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
    this.handleSearch();
  };

  handleVideoSelect = (name, value) => {
    const newState = {};
    newState[name] = value;
    this.setState(newState);
    const current = moment();
    if (name === 'videoDateRange') {
      switch (value) {
        case 0:
          this.handleVideoDateChange([
            moment(current).startOf('day'),
            moment(current),
          ]);
          break;
        case -1:
        case null:
          this.handleVideoDateChange();
          break;
        default:
          this.handleVideoDateChange([
            moment(current).subtract(value, 'days'),
            moment(current),
          ]);
          break;
      }
    }
    this.handleVideoSearch();
  };

  handlePageChange = (pageId) => {
    this.setState({ pageId }, () => {
      this.handleSearch();
    });
  };

  handleVideoPageChange = (pageId) => {
    this.setState({ videoPageId: pageId }, () => {
      this.handleVideoSearch();
    });
  };

  handlePageSizeChange = (current, pageSize) => {
    this.setState({ pageSize, pageId: 0 }, () => {
      this.handleSearch();
    });
  };

  handleVideoPageSizeChange = (current, pageSize) => {
    this.setState({ videoPageSize: pageSize, videoPageId: 0 }, () => {
      this.handleVideoSearch();
    });
  };

  handleKeywordChange = (keyword) => {
    this.setState({ keyword }, () => {
      this.handleSearch();
    });
  };

  handleVideoKeywordChange = (keyword) => {
    this.setState({ videoKeyword: keyword }, () => {
      this.handleVideoSearch();
    });
  };

  handleRowSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };

  handleModeifyMaterial=async (materiallib) => {
    const { selectedRowKeys } = this.state;
    if (selectedRowKeys.length === 0) {
      alert('请先选择数据！');
      return;
    }
    const fid = this.props.curProgramme?.fid;
    console.log(selectedRowKeys);
    const ret = await modeifyMaterial(fid, materiallib, selectedRowKeys);
    if (ret === 1) {
      alert('修改成功！');
    } else {
      alert('修改失败！');
    }
    await this.getMateriallibs();
    this.setState({
      selectedRowKeys: [],
    });
  };

  render() {
    const params = ['sensitiveType', 'emotion', 'source', 'timeOrder', 'dateRange', 'startPublishedDay', 'endPublishedDay'];
    const current = Lodash.pick(this.state, params);
    const videoParams = ['videoSource', 'videoTimeOrder', 'videoDateRange', 'videoStartPublishedDay', 'videoEndPublishedDay'];
    const videoCurrent = Lodash.pick(this.state, videoParams);
    const criteria = this.getCriteria();
    const { curProgramme } = this.props;
    const { pageSize, loading, selectedRowKeys, materiallibs, resources, videoPageSize, videoLoading } = this.state;
    const data = this.state.data[criteria]?.data || [];
    const dataSize = this.state.data[criteria]?.dataSize || 0;
    const videodata = this.state.videoData?.data || [];
    const videodataSize = this.state.videoData?.dataSize || 0;

    return (
      <Layout className="programme-specific-wrap">
        <Tabs defaultActiveKey="1" type="card" size="small">
          <Tabs.TabPane tab="文本舆情" key="1">
            <div>
              <MultiFilter
                resources={resources}
                current={current}
                userType={this.props.userType}
                userEventLimiter={this.props.userEventLimiter}
                onSelect={this.handleSelect}
                onSearch={this.handleKeywordChange}
                onDateChange={this.handleDateChange}
              />
              <DataList
                data={data}
                dataSize={dataSize}
                pageSize={pageSize}
                loading={loading}
                selectedRowKeys={selectedRowKeys}
                materiallibs={materiallibs}
                fid={this.props.curProgramme?.fid}
                onModeifyMaterial={this.handleModeifyMaterial}
                onSelectChange={this.handleRowSelectChange}
                onPageChange={this.handlePageChange}
                onPageSizeChange={this.handlePageSizeChange}
              />
            </div>

          </Tabs.TabPane>
          <Tabs.TabPane tab="视频舆情" key="2">
            <VideoMultiFilter
              current={videoCurrent}
              userType={this.props.userType}
              userEventLimiter={this.props.userEventLimiter}
              onSelect={this.handleVideoSelect}
              onSearch={this.handleVideoKeywordChange}
              onDateChange={this.handleVideoDateChange}
            />
            <VideoList
              data={videodata}
              dataSize={videodataSize}
              pageSize={videoPageSize}
              loading={videoLoading}
              onPageChange={this.handleVideoPageChange}
              onPageSizeChange={this.handleVideoPageSizeChange}
            />
            {/* <List */}
            {/*  grid={{ gutter: 16, column: 5 }} */}
            {/*  pagination={{ */}
            {/*    onChange: page => { */}
            {/*      console.log(page); */}
            {/*    }, */}
            {/*    pageSize: 20, */}
            {/*  }} */}
            {/*  dataSource={videodata} */}
            {/*  renderItem={item => ( */}
            {/*    <List.Item> */}
            {/*      <Card */}
            {/*        hoverable */}
            {/*        style={{ width: 320 }} */}
            {/*        onClick={e => window.open(item.url)} */}
            {/*        cover={( */}
            {/*          <Image */}
            {/*            src={item.image} */}
            {/*            width={320} */}
            {/*            height={280} */}
            {/*            fallback="data:image/png;base64,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" */}
            {/*          /> */}
            {/*              )} */}
            {/*      > */}
            {/*        <Card.Meta description={item.title} /> */}
            {/*      </Card> */}
            {/*    </List.Item> */}
            {/*  )} */}
            {/* /> */}
          </Tabs.TabPane>
        </Tabs>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.userName,
  curProgramme: state.curProgramme,
  userType: state.userType,
  userEventLimiter: state.userEventLimiter,
});
const mapDispatchToProps = {
  onProgrammeChange: actions.onProgrammeChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Specific);
