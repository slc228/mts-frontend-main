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
import getProgrammeTotalAmountTrend from '../../../services/request/programme/getProgrammeTotalAmountTrend';
import getProgrammeSourceTrend from '../../../services/request/programme/getProgrammeSourceTrend';
import connGraph from '../../common/Echart/getRules/connGraph';

const genEchartsImages = async (fid, name, item) => {
  const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
  const endTime = moment().format(DATE_FORMAT);
  const startTime = moment().subtract(1, 'month').format(DATE_FORMAT);
  const ret = {};
  const data1 = {
    'name': '',
    'children': [
      {
        'name': '加拿大大使馆官方微博',
        'children': [
          {
            'name': '吹牛不在行',
            'children': [
              { 'name': '青枚煮菁瓜 ',
                'children': [
                  { 'name': '卡李' },
                  { 'name': '勤劳慈祥狠无奈' },
                ],
              }],
          },
          {
            'name': '铁皮人998001',
            'children': [
              { 'name': 'PoiPoiPoooooo' },
            ],
          },
          {
            'name': '小老头要坚定',
            'children': [
              { 'name': 'SH厄尔尼诺' },
            ],
          },
          {
            'name': '泡茶赏月悟无生',
            'children': [
              { 'name': '北京方庄几页',
                'children': [
                  { 'name': 'Tracy0791' },
                ],
              },
            ],
          },
        ],
      },
      {
        'name': 'mj微风',
        'children': [
          { 'name': '复活节当天办葬礼' },
          { 'name': '·阿菁·' },
          { 'name': '三井寿公馆' },
          { 'name': '新丰乔' },
          { 'name': '微风聚起89365' },
          {
            'name': '武志红',
            'children': [
              { 'name': '埃及小猫' },
              { 'name': 'oliviatian' },
              { 'name': '张望欣然-曼妙如君' },
              { 'name': '哀似冷月' },
              { 'name': '正在成长的妈妈' },
              { 'name': '别这样很呆啊' },
            ],
          },
          { 'name': 'whowho密码',
            'children': [
              { 'name': 'tina咪咪' },
            ],
          },
        ],
      },
      {
        'name': '中国日报',
        'children': [
          { 'name': '清逸公子' },
          { 'name': 'Mmin70' },
          { 'name': '半朵桃花醉' },
          { 'name': '羊增卉' },
          { 'name': '天天天蓝28861' },
          { 'name': '雯的幸福576' },
          { 'name': '边梦龙长大不容易' },
          { 'name': '陽光像花兒一樣多' },
          {
            'name': '草原900',
            'children': [
              { 'name': 'lower官建' },
              { 'name': '杨朝阳80906' },
              { 'name': '刘hulixiao' },
            ],
          },
          { 'name': '闵行虹桥' },
        ],
      },
      {
        'name': '新华网',
        'children': [
          { 'name': '乌伦珠日格雲' },
          { 'name': '小英子的大英子' },
          { 'name': '容易满足的刘' },
          { 'name': '青椒蕃茄poi' },
          { 'name': '九州令' },
          { 'name': '不喜欢公主喜欢女王' },
          {
            'name': '晴天懂',
            'children': [
              { 'name': '沉默呵呵' },
              { 'name': '竹外小溪深处' },
              { 'name': '梧凤之鸣w' },
            ],
          },
          { 'name': '言轻莫劝人76846' },
          {
            'name': 'JW2014',
            'children': [
              { 'name': '半天上灰色瓶中船' },
            ],
          },
        ],
      },
      {
        'name': '央视新闻',
        'children': [
          { 'name': '盐澜HAlf' },
          { 'name': '超极小杰' },
          {
            'name': '午后狂睡',
            'children': [
              { 'name': '泰拉乐猫' },
              { 'name': '一健格式化' },
              { 'name': '沙虫-剑无痕jjy' },
              {
                'name': 'Luuuuuuuhani',
                'children': [
                  { 'name': '江停宝贝儿' },
                ],
              },
              {
                'name': '林六月',
                'children': [
                  { 'name': 'CaryCox' },
                ],
              },
            ],
          },
        ],
      },
      {
        'name': '雷逍妖',
        'children': [
          { 'name': '少数派脉络' },
          { 'name': '洛洛洛缇' },
          {
            'name': '午后狂睡',
            'children': [
              {
                'name': '客官不要急',
                'children': [
                  { 'name': '台前小子' },
                ],
              },
              {
                'name': '浪里赤条小粗林',
                'children': [
                  { 'name': '艾琳·叶卡' },
                  { 'name': '527agp5tw47jdpgtamwg' },
                  { 'name': '吃口红豆糯米小方糕' },
                ],
              },
            ],
          },
          {
            'name': '卢诗翰',
            'children': [
              { 'name': '宸弥' },
            ],
          },
          {
            'name': '浪里赤条小粗林',
            'children': [
              {
                'name': '豌豆蝴蝶结',
                'children': [
                  { 'name': '心想事成的小圆饼儿' },
                ],
              },
              {
                'name': '酸橘子重度爱好者',
              },
            ],
          },
        ],
      },
      {
        'name': '央视新闻',
        'children': [
          { 'name': '一颗冰酸梅' },
          { 'name': '没空玩的穷苦打工人' },
          { 'name': '闪闪好闪呦' },
          {
            'name': '番茄酸西红柿甜',
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
        'name': '俄罗斯遭制裁',
        'children': [
          { 'name': '俄罗斯1亿卢布' },
          { 'name': 'SWIFT' },
          { 'name': '支付系统' },
          { 'name': '俄罗斯银行' },
          { 'name': '德国制裁',
            'children': [
              { 'name': '北溪二号' },
              { 'name': '天然气' },
            ] },
        ],
      },
      {
        'name': '泽连斯基',
        'children': [
          { 'name': '会谈' },
          { 'name': '欧盟' },
          { 'name': '导弹攻击' },
          {
            'name': '俄乌会谈',
            'children': [
              { 'name': '白俄罗斯' },
              { 'name': '第二次俄乌会谈' },
              { 'name': '联合国' },
            ],
          },
        ],
      },
      {
        'name': '俄乌冲突',
        'children': [
          {
            'name': '基辅',
            'children': [
              { 'name': '撤离留学生' },
              { 'name': '逼近基辅' },
              { 'name': '自由离开基辅' },
              { 'name': '俄乌谈判' },
            ],
          },
          {
            'name': '乌东',
            'children': [
              { 'name': '外交关系' },
              { 'name': '乌克兰东部战线' },
              { 'name': '展开特别军事行动' },
            ],
          },
          {
            'name': '北约',
            'children': [
              { 'name': '土耳其面临威胁' },
              { 'name': '北约东扩' },
              { 'name': '乌克兰危机' },
              { 'name': '武器装备' },
            ],
          },
          {
            'name': '控制切尔诺贝利核电站',
            'children': [
              { 'name': '被破坏' },
              { 'name': '利用核恐吓' },
            ],
          },
        ],
      },
      {
        'name': '车臣军事行动',
        'children': [
          { 'name': '乌克兰全境' },
          { 'name': '特种部队遭歼灭' },
          { 'name': '车臣士兵出现伤亡' },
          { 'name': '效忠普京' },
        ],
      },
    ],
  };
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
    const totalAmountTrend = await getProgrammeTotalAmountTrend(fid, startTime, endTime);
    // const [totalAmountTrend, sourceAmountTrend] = await getProgrammeAmountTrend(fid, startTime, endTime);
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
    const sourceAmountTrend = await getProgrammeSourceTrend(fid, startTime, endTime);
    // const [totalAmountTrend, sourceAmountTrend] = await getProgrammeAmountTrend(fid, startTime, endTime);
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
    const div = document.createElement('div');
    const mychart = echarts.init(div, 'light', { width: '500px', height: '280px', renderer: 'canvas' });
    mychart.resize();
    const data = defaultTree(data2, '事件溯源', 'big');
    mychart.setOption(data, true);
    const str = mychart.getDataURL({ backgroundColor: '#fff' });
    ret.name = '事件溯源';
    ret.URL = str;
    mychart.dispose();
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
    const data = defaultTree(data1, '微博溯源树形图', 'big');
    // const data = defaultTree(traceTree, '微博溯源树形图', 'big');
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
    const data = circleTree(data1, '微博溯源扩散图', 'big');
    // const data = circleTree(traceTree, '微博溯源扩散图', 'big');
    mychart.setOption(data, true);
    const str = mychart.getDataURL({ backgroundColor: '#fff' });
    ret.name = '微博溯源扩散图';
    ret.URL = str;
    mychart.dispose();
  }
  return ret;
};

export default genEchartsImages;
