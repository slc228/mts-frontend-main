import React from 'react';
import { connect } from 'react-redux';
import { Input, Switch } from 'antd';
import AutofitWrap from '../../common/AutofitWrap/AutofitWrap';
import { actions } from '../../../redux/actions';
import DataList from '../../common/DataList/DataList';
import './Alert.scss';
import Echart from '../../common/Echart/Echart';
import moment from 'moment';
import getProgrammeSentimentLayout from '../../../services/request/programme/getProgrammeSentimentLayout';
import get48AmountTrend from '../../../services/request/data/get48AmountTrend';
import getProgrammeSentimentTrend from '../../../services/request/programme/getProgrammeSentimentTrend';
import getSensitiveData from '../../../services/request/programme/getSensitiveData';
import getOverallData from '../../../services/request/data/getOverallData';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class Alert extends React.Component {
  constructor() {
    super();
    this.state = {
      amountTrend: {},
      emotionTrend: {},
      sensiLayout: {},
      data: {},
      loading: false,
    };

    this.endPublishedDay = moment().format(DATE_FORMAT);
    this.startPublishedDay = moment().subtract(2, 'days').format(DATE_FORMAT);
  }

  formatEmotionTrendLayout = (raw) => {
    const yAxis = [];
    yAxis.push({
      name: '积极',
      data: raw.xAxis[0].value,
    });
    const negData = raw.xAxis[1].value ? raw.xAxis[1].value.map((item, index) => (
      item + raw.xAxis[2].value[index] + raw.xAxis[3].value[index]
    )) : null;
    yAxis.push({
      name: '消极',
      data: negData,
    });
    yAxis.push({
      name: '中立',
      data: raw.xAxis[5].value,
    });
    return {
      xAxis: raw.yAxis,
      yAxis,
    };
  };

  componentDidMount() {
    this.handleSearch();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.curProgramme?.fid !== this.props.curProgramme?.fid) {
      this.handleSearch();
    }
  }

  handleSearch = async () => {
    this.getAmountTrend();
    this.getEmotionTrend();
    this.getSensitiveData();
  };

  getEmotionTrend = async () => {
    const { startPublishedDay, endPublishedDay } = this;
    const { fid } = this.props.curProgramme;
    const emotionTrend = await getProgrammeSentimentTrend(fid, startPublishedDay, endPublishedDay);
    const newData = { ...this.state.emotionTrend };
    newData[fid] = this.formatEmotionTrendLayout(emotionTrend);
    this.setState({ emotionTrend: newData });
  };

  getAmountTrend = async () => {
    const { startPublishedDay, endPublishedDay } = this;
    const fid = this.props.curProgramme?.fid;
    const amountTrend = (await get48AmountTrend(fid, startPublishedDay, endPublishedDay))[0];
    const newData = { ...this.state.amountTrend };
    newData[fid] = amountTrend;
    this.setState({ amountTrend: newData });
  };

  getSensitiveData = async () => {
    await this.setState({ loading: true });
    const fid = this.props.curProgramme?.fid;
    const sensitiveData = await getSensitiveData(fid);
    console.log(sensitiveData);
    const sensiLayout = [
      { name: '正常信息', label: '正常信息', value: sensitiveData['正常信息'] || 0 },
      { name: '政治敏感', label: '政治敏感', value: sensitiveData['政治敏感'].length || 0 },
      { name: '低俗信息', label: '低俗信息', value: sensitiveData['低俗信息'].length || 0 },
      { name: '广告营销', label: '广告营销', value: sensitiveData['广告营销'].length || 0 },
      { name: '人身攻击', label: '人身攻击', value: sensitiveData['人身攻击'].length || 0 },
    ].filter((item) => item.value);
    const newData = { ...this.state.sensiLayout };
    newData[fid] = sensiLayout;
    ['政治敏感', '低俗信息', '广告营销', '人身攻击'].forEach(type => {
      sensitiveData[type].forEach(item => {
        if (item.sensitiveType) item.sensitiveType += ` ${type}`;
        else item.sensitiveType = type;
      });
    });

    const result = [
      ...sensitiveData['政治敏感'],
      ...sensitiveData['低俗信息'],
      ...sensitiveData['广告营销'],
      ...sensitiveData['人身攻击'],
    ];
    const newData2 = { ...this.state.data };
    newData2[fid] = result;
    console.log(result);
    this.setState({ sensiLayout: newData, data: newData2, loading: false });
  };

  render() {
    const { amountTrend, emotionTrend, sensiLayout, data } = this.state;
    const fid = this.props.curProgramme?.fid;
    const { loading } = this.state;
    console.log(sensiLayout);
    return (
      <div
        padding={200}
        minHeight={550}
        className="alert-wrap"
      >
        <div className="alert-container">
          <div className="graphs">
            <div className="left-graph">
              <Echart
                title="话题走势图"
                type="basicLine"
                data={amountTrend[fid]}
              />
            </div>
            <div className="right-graph">
              <div className="top-graph">
                <Echart
                  title="情感趋势图"
                  type="stackLine"
                  data={emotionTrend[fid]}
                />
              </div>
              <div className="bottom-graph">
                <Echart
                  title="敏感信息分布"
                  type="defaultPie"
                  data={sensiLayout[fid]}
                />
              </div>
            </div>
          </div>
          <div>
            敏感信息列表
            <DataList
              data={data[fid]}
              disableEmotion
              disableTag
              disableSource
              loading={loading}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.userName,
  curProgramme: state.curProgramme,
});
const mapDispatchToProps = {
  onProgrammeChange: actions.onProgrammeChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Alert);
