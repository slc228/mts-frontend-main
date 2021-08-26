import React from 'react';
import Mock from 'mockjs';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import china from '../../../utils/map/json/china';
import defaultPie from './getRules/defaultPie';
import areaLine from './getRules/areaLine';
import doughnutPie from './getRules/doughnutPie';
import horizontalBar from './getRules/horizontalBar';
import chinaMap from './getRules/chinaMap';
import './Echart.scss';
import defaultTree from './getRules/defaultTree';
import circleTree from './getRules/circleTree';
import connGraph from './getRules/connGraph';
import Loading from '../Loading/Loading';
import stackLine from './getRules/stackLine';
import basicLine from './getRules/basicLine';

class Echart extends React.Component {
  constructor() {
    super();
    this.state = {
      guid: Mock.Random.guid(),
    };
    this.defaultWidth = '400px';
    this.defaultHeight = '250px';
    echarts.registerMap('china', china);
  }

  handleClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  render() {
    const { title, data, type, size } = this.props;
    let getRules;
    switch (type) {
      case 'defaultPie': getRules = defaultPie; break;
      case 'areaLine': getRules = areaLine; break;
      case 'doughnutPie': getRules = doughnutPie; break;
      case 'horizontalBar': getRules = horizontalBar; break;
      case 'chinaMap': getRules = chinaMap; break;
      case 'defaultTree': getRules = defaultTree; break;
      case 'circleTree': getRules = circleTree; break;
      case 'connGraph': getRules = connGraph; break;
      case 'stackLine': getRules = stackLine; break;
      case 'basicLine': getRules = basicLine; break;
      default: break;
    }
    const option = data ? getRules(data, title, size) : {};
    const { guid } = this.state;
    const width = this.props.width || this.defaultWidth;
    const height = this.props.height || this.defaultHeight;

    return (
      <div
        className="common-chart-wrap"
        id={`echart-${guid}`}
      >
        {
          data ? (
            <ReactEcharts
              style={{
                width: '100%',
                height: '100%',
              }}
              option={option}
              theme="light"
              onEvents={{
                click: this.handleClick,
              }}
            />
          ) :
            <Loading title={title} />
        }
      </div>
    );
  }
}

export default Echart;
