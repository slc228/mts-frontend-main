import * as echarts from 'echarts';
import getProgrammeSensiLayout from '../../../services/request/programme/getProgrammeSensiLayout';
import doughnutPie from '../../common/Echart/getRules/doughnutPie';

const genEchartSensiLayoutImage = async (fid) => {
  const sensiLayout = await getProgrammeSensiLayout(fid, undefined, undefined);
  const div = document.createElement('div');
  const mychart = echarts.init(div, 'light', { width: '500px', height: '280px', renderer: 'canvas' });
  mychart.resize();
  const data = doughnutPie(sensiLayout, '敏感度分布', 'small');
  mychart.setOption(data, true);
  const str = mychart.getDataURL({ backgroundColor: '#fff' });
  const ret = {};
  ret.name = '敏感度分布';
  ret.URL = str;
  mychart.dispose();
  return ret;
};

export default genEchartSensiLayoutImage;
