import * as echarts from 'echarts';
import moment from 'moment';
import getProgrammeSensiLayout from '../../../services/request/programme/getProgrammeSensiLayout';
import doughnutPie from '../../common/Echart/getRules/doughnutPie';
import dimension from '../Briefing/dimension';
import getProgrammeRegionLayout from '../../../services/request/programme/getProgrammeRegionLayout';
import china from '../../../utils/map/json/china.json';
import chinaMap from '../../common/Echart/getRules/chinaMap';
import defaultPie from '../../common/Echart/getRules/defaultPie';
import getKeywordsCloud from '../../../services/request/data/getKeywordsCloud';
import getProgrammeSourceLayout from '../../../services/request/programme/getProgrammeSourceLayout';
import getProgrammeAmountTrend from '../../../services/request/programme/getProgrammeAmountTrend';
import areaLine from '../../common/Echart/getRules/areaLine';
import horizontalBar from '../../common/Echart/getRules/horizontalBar';
import getProgrammeSentimentLayout from '../../../services/request/programme/getProgrammeSentimentLayout';
import getProgrammeSentimentTrend from '../../../services/request/programme/getProgrammeSentimentTrend';
import defaultTree from '../../common/Echart/getRules/defaultTree';
import getTraceTree from '../../../services/request/data/getTraceTree';
import circleTree from '../../common/Echart/getRules/circleTree';

const genEchartsImages = async (fid, name, item) => {
  const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
  const endTime = moment().format(DATE_FORMAT);
  const startTime = moment().subtract(1, 'month').format(DATE_FORMAT);
  const ret = {};
  if (dimension[item - 1].name === '关键词云') {
    const wordNumber = 50;
    const keywordsCloud = await getKeywordsCloud(fid, startTime, endTime, wordNumber);
    const divCloud = document.createElement('div');
    const wordCloud = echarts.init(divCloud, 'light', { width: '500px', height: '280px', renderer: 'canvas' });
    wordCloud.resize();
    const option = {
      // backgroundColor: '#100c2A',
      backgroundColor: 'whitesmoke',
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      series: [
        {
          animation: false,
          type: 'wordCloud',
          gridSize: 1,
          sizeRange: [10, 50],
          rotationRange: [-0, 0, 0, 90],
          textStyle: {
            color: '#2f54eb',
          },
          left: 'center',
          top: 'center',
          right: null,
          bottom: null,
          width: '90%',
          height: '110%',
          data: keywordsCloud,
        },
      ],
    };
    let str = '';
    wordCloud.setOption(option, true);
    setTimeout(() => {
      str = wordCloud.getDataURL();
      ret.name = '关键词云';
      ret.URL = str;
      wordCloud.dispose();
    }, 1000);
  }
  if (dimension[item - 1].name === '敏感度分布') {
    const sensiLayout = await getProgrammeSensiLayout(fid, undefined, undefined);
    const div = document.createElement('div');
    const mychart = echarts.init(div, 'light', { width: '500px', height: '280px', renderer: 'canvas' });
    mychart.resize();
    const data = doughnutPie(sensiLayout, '敏感度分布', 'small');
    mychart.setOption(data, true);
    const str = mychart.getDataURL({ backgroundColor: '#fff' });
    ret.name = '敏感度分布';
    ret.URL = str;
    mychart.dispose();
  }
  if (dimension[item - 1].name === '来源分布') {
    const sourceLayout = await getProgrammeSourceLayout(fid, undefined, undefined);
    const div = document.createElement('div');
    const mychart = echarts.init(div, 'light', { width: '500px', height: '280px', renderer: 'canvas' });
    mychart.resize();
    const data = defaultPie(sourceLayout, '来源分布', 'big');
    mychart.setOption(data, true);
    const str = mychart.getDataURL({ backgroundColor: '#fff' });
    ret.name = '来源分布';
    ret.URL = str;
    mychart.dispose();
  }
  if (dimension[item - 1].name === '总量趋势') {
    const [totalAmountTrend, sourceAmountTrend] = await getProgrammeAmountTrend(fid, startTime, endTime);
    const div = document.createElement('div');
    const mychart = echarts.init(div, 'light', { width: '500px', height: '280px', renderer: 'canvas' });
    mychart.resize();
    const data = areaLine(totalAmountTrend, '总量趋势', 'big');
    mychart.setOption(data, true);
    const str = mychart.getDataURL({ backgroundColor: '#fff' });
    ret.name = '总量趋势';
    ret.URL = str;
    mychart.dispose();
  }
  if (dimension[item - 1].name === '来源趋势') {
    const [totalAmountTrend, sourceAmountTrend] = await getProgrammeAmountTrend(fid, startTime, endTime);
    const div = document.createElement('div');
    const mychart = echarts.init(div, 'light', { width: '500px', height: '280px', renderer: 'canvas' });
    mychart.resize();
    const data = horizontalBar(sourceAmountTrend, '来源趋势', 'big');
    mychart.setOption(data, true);
    const str = mychart.getDataURL({ backgroundColor: '#fff' });
    ret.name = '来源趋势';
    ret.URL = str;
    mychart.dispose();
  }
  if (dimension[item - 1].name === '地域分布') {
    const regionLayout = await getProgrammeRegionLayout(fid, undefined, undefined);
    const div = document.createElement('div');
    echarts.registerMap('china', china);
    const mychart = echarts.init(div, 'light', { width: '500px', height: '280px', renderer: 'canvas' });
    mychart.resize();
    const data = chinaMap(regionLayout, '地域分布', 'big');
    mychart.setOption(data, true);
    const str = mychart.getDataURL({ backgroundColor: '#fff' });
    ret.name = '地域分布';
    ret.URL = str;
    mychart.dispose();
  }
  if (dimension[item - 1].name === '情感分析') {
    const emotionLayout = await getProgrammeSentimentLayout(fid, undefined, undefined);
    const div = document.createElement('div');
    const mychart = echarts.init(div, 'light', { width: '500px', height: '280px', renderer: 'canvas' });
    mychart.resize();
    const data = defaultPie(emotionLayout, '情感分析', 'big');
    mychart.setOption(data, true);
    const str = mychart.getDataURL({ backgroundColor: '#fff' });
    ret.name = '情感分析';
    ret.URL = str;
    mychart.dispose();
  }
  if (dimension[item - 1].name === '情感趋势图') {
    const emotionTrend = await getProgrammeSentimentTrend(fid, startTime, endTime);
    const div = document.createElement('div');
    const mychart = echarts.init(div, 'light', { width: '500px', height: '280px', renderer: 'canvas' });
    mychart.resize();
    const data = horizontalBar(emotionTrend, '情感趋势图', 'big');
    mychart.setOption(data, true);
    const str = mychart.getDataURL({ backgroundColor: '#fff' });
    ret.name = '情感趋势图';
    ret.URL = str;
    mychart.dispose();
  }
  if (dimension[item - 1].name === '事件溯源') {
    // const eventTree = await getEventTree(fid, startTime, endTime);
    // console.log(eventTree);
    // const list = [eventTree];
    // eventTree.summary = name;
    // eventTree.time = '';
    // while (list.length) {
    //   const head = list.shift();
    //   head.name = ` ${head.time}\n${this.formatSummary(head.summary)}`;
    //   head.children = head.childList;
    //   head.data = {
    //     clusterNum: head.clusterNum,
    //     clusterData: head.clusterDatas,
    //     time: head.time,
    //     summary: head.summary.replace(' ', ''),
    //   };
    //   head.children && head.children.forEach((kitem) => {
    //     list.push(kitem);
    //   });
    // }
    // const div = document.createElement('div');
    // const mychart = echarts.init(div, 'light', { width: '500px', height: '280px', renderer: 'canvas' });
    // mychart.resize();
    // const data = connGraph(eventTree, '事件溯源', 'big');
    // mychart.setOption(data, true);
    // const str = mychart.getDataURL({ backgroundColor: '#fff' });
    ret.name = '事件溯源';
    ret.URL = '';
    // mychart.dispose();
  }
  if (dimension[item - 1].name === '微博溯源树形图') {
    const traceTree = await getTraceTree(fid, undefined, undefined);
    if (traceTree.children && !traceTree.children.length) traceTree.children = [{ name: '无信息' }];
    if (traceTree.children && traceTree.children.length > 20) {
      const withChildren = traceTree.children.filter(item1 => item1.children.length);
      const noChildren = traceTree.children.filter(item1 => !item1.children.length);
      if (withChildren.length > 20) traceTree.children = withChildren.slice(0, 20);
      else traceTree.children = withChildren.concat(noChildren.slice(0, 20 - withChildren.length));
    }
    traceTree.name = name;
    const div = document.createElement('div');
    const mychart = echarts.init(div, 'light', { width: '500px', height: '280px', renderer: 'canvas' });
    mychart.resize();
    const data = defaultTree(traceTree, '微博溯源树形图', 'big');
    mychart.setOption(data, true);
    const str = mychart.getDataURL({ backgroundColor: '#fff' });
    ret.name = '微博溯源树形图';
    ret.URL = str;
    mychart.dispose();
  }
  if (dimension[item - 1].name === '微博溯源扩散图') {
    const traceTree = await getTraceTree(fid, undefined, undefined);
    if (traceTree.children && !traceTree.children.length) traceTree.children = [{ name: '无信息' }];
    if (traceTree.children && traceTree.children.length > 20) {
      const withChildren = traceTree.children.filter(item1 => item1.children.length);
      const noChildren = traceTree.children.filter(item1 => !item1.children.length);
      if (withChildren.length > 20) traceTree.children = withChildren.slice(0, 20);
      else traceTree.children = withChildren.concat(noChildren.slice(0, 20 - withChildren.length));
    }
    traceTree.name = name;
    const div = document.createElement('div');
    const mychart = echarts.init(div, 'light', { width: '500px', height: '280px', renderer: 'canvas' });
    mychart.resize();
    const data = circleTree(traceTree, '微博溯源扩散图', 'big');
    mychart.setOption(data, true);
    const str = mychart.getDataURL({ backgroundColor: '#fff' });
    ret.name = '微博溯源扩散图';
    ret.URL = str;
    mychart.dispose();
  }
  return ret;
};

export default genEchartsImages;
