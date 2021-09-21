import React from 'react';

const getJurisdictionList = (jurisdiction) => {
  const jurisdictionList = [];
  jurisdictionList.push({ name: '数据大屏', type: 'dataScreen', value: jurisdiction.dataScreen });
  jurisdictionList.push({ name: '新建和配置方案', type: 'schemeConfiguration', value: jurisdiction.schemeConfiguration });
  jurisdictionList.push({ name: '全网搜索', type: 'globalSearch', value: jurisdiction.globalSearch });
  jurisdictionList.push({ name: '舆情分析', type: 'analysis', value: jurisdiction.analysis });
  jurisdictionList.push({ name: '舆情预警配置', type: 'warning', value: jurisdiction.warning });
  jurisdictionList.push({ name: '简报生成与发送', type: 'briefing', value: jurisdiction.briefing });
  return jurisdictionList;
};

export default getJurisdictionList;
