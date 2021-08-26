import * as echarts from 'echarts';
import getProgrammeRegionLayout from '../../../services/request/programme/getProgrammeRegionLayout';
import china from '../../../utils/map/json/china.json';
import chinaMap from '../../common/Echart/getRules/chinaMap';

const genEchartRegionLayoutImage = async (fid) => {
  const regionLayout = await getProgrammeRegionLayout(fid, undefined, undefined);
  const div = document.createElement('div');
  echarts.registerMap('china', china);
  const mychart = echarts.init(div, 'light', { width: '500px', height: '280px', renderer: 'canvas' });
  mychart.resize();
  const data = chinaMap(regionLayout, '地域分布', 'big');
  mychart.setOption(data, true);
  const str = mychart.getDataURL({ backgroundColor: '#fff' });
  const ret = {};
  ret.name = '地域分布';
  ret.URL = str;
  mychart.dispose();
  return ret;
};
export default genEchartRegionLayoutImage;
