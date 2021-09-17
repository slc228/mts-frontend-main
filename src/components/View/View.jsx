import React from 'react';
import moment from 'moment';
import './View.scss';
import Echart from '../common/Echart/Echart';
import getAmountTrend from '../../services/request/data/getAmountTrend';
import getSensiLayout from '../../services/request/data/getSensiLayout';
import getSourceLayout from '../../services/request/data/getSourceLayout';
import getRegionLayout from '../../services/request/data/getRegionLayout';
import AutofitWrap from '../common/AutofitWrap/AutofitWrap';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class View extends React.Component {
  constructor() {
    super();
    this.state = {
      // dateRange: 0,
      endPublishedDay: moment().format(DATE_FORMAT),
      startPublishedDay: moment().subtract(2, 'month').format(DATE_FORMAT),
      sensiLayout: undefined,
      sourceLayout: undefined,
      totalAmountTrend: undefined,
      sourceAmountTrend: undefined,
      regionLayout: undefined,
    };
  }

  componentDidMount() {
    console.log('view mount');
    this.handleSearch();
    // this.clk = setInterval(() => {
    //   this.handleSearch();
    // }, 5000);
  }

  handleSearch = () => {
    this.getAmountTrend();
    this.getSensiLayout();
    this.getSourceLayout();
    this.getRegionLayout();
  };

  getRegionLayout = async () => {
    const keyword = '';
    const { startPublishedDay, endPublishedDay } = this.state;
    const regionLayout = await getRegionLayout(keyword, startPublishedDay, endPublishedDay);

    this.setState({ regionLayout });
  };

  getSourceLayout = async () => {
    const keyword = '';
    const { startPublishedDay, endPublishedDay } = this.state;
    const sourceLayout = await getSourceLayout(keyword, startPublishedDay, endPublishedDay);
    this.setState({ sourceLayout });
  };

  getSensiLayout = async () => {
    const keyword = '';
    const { startPublishedDay, endPublishedDay } = this.state;
    const sensiLayout = await getSensiLayout(keyword, startPublishedDay, endPublishedDay);
    this.setState({ sensiLayout });
  };

  getAmountTrend = async () => {
    const keyword = '';
    const { startPublishedDay, endPublishedDay } = this.state;
    const [totalAmountTrend, sourceAmountTrend] =
      await getAmountTrend(keyword, startPublishedDay, endPublishedDay);
    this.setState({
      totalAmountTrend, sourceAmountTrend,
    });
  };

  handleDateChange = (moments) => {
    if (!moments) {
      this.setState({
        startPublishedDay: null,
        endPublishedDay: null,
      });
    }
    const [startMoment, endMoment] = moments;
    this.setState({
      startPublishedDay: startMoment.format(DATE_FORMAT),
      endPublishedDay: endMoment.format(DATE_FORMAT),
    });
  };

  componentWillUnmount() {
    console.log('view unmout');
    // clearInterval(this.clk);
  }

  handleSelect = (name, value) => {
    const newState = {};
    newState[name] = value;
    this.setState(newState);
    const current = '2020-07-18 12:00:00';
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
  };

  render() {
    const { sensiLayout, regionLayout, sourceLayout, totalAmountTrend, sourceAmountTrend } = this.state;
    // console.log( sensiLayout, regionLayout, sourceLayout, totalAmountTrend, sourceAmountTrend)
    // const height = `${document.body.offsetHeight - 128 - 20}px`;
    return (
      <AutofitWrap
        minHeight={600}
        padding={150}
        className="view-wrap"
      >
        <div
          className="left-chart"
        >
          <div className="sub-item">
            <Echart
              title="敏感度分布"
              type="doughnutPie"
              data={sensiLayout}
              size="small"
            />
          </div>
          <div className="sub-item">
            <Echart
              title="来源分布"
              type="defaultPie"
              data={sourceLayout}
              size="small"
            />
          </div>
        </div>
        <div
          className="main-chart"
        >
          <Echart
            title="地域分布"
            type="chinaMap"
            data={regionLayout}
            size="large"
          />
        </div>
        <div
          className="right-chart"
        >
          <div className="sub-item">
            <Echart
              title="总量趋势"
              type="areaLine"
              data={totalAmountTrend}
              size="small"
            />
            <Echart
              title="来源趋势"
              type="horizontalBar"
              data={sourceAmountTrend}
              size="small"
            />
          </div>
        </div>
      </AutofitWrap>
    );
  }
}

export default View;
