import getProgrammeTotalAmountTrend from './request/programme/getProgrammeTotalAmountTrend';
import getProgrammeSourceTrend from './request/programme/getProgrammeSourceTrend';

const domain1 = 'http://192.168.0.19:8082';
const domain2 = 'http://localhost:3000/api';
const domain3 = 'http://localhost:8082';
const domain4 = 'http://202.120.40.69:58082';
const curDomain = domain4;

const requests = {
  getTopics: { url: `${curDomain}/data/getTags`, method: 'GET' },
  getOverallData: { url: `${curDomain}/data/globalSearch/dataSearch`, method: 'GET' },
  getOverallDataWithObject: { url: `${curDomain}/data/globalSearch/dataSearchWithObject`, method: 'GET' },
  getProgrammeData: { url: `${curDomain}/data/singleSearch/findByFangAn2`, method: 'GET' },
  getSensiLayout: { url: `${curDomain}/data/globalSearch/cflagCount`, method: 'GET' },
  getSourceLayout: { url: `${curDomain}/data/globalSearch/resourceCount`, method: 'GET' },
  getAmountTrend: { url: `${curDomain}/data/globalSearch/amountTrendCount`, method: 'GET' },
  getTotalAmountTrend: { url: `${curDomain}/data/globalSearch/totalAmountTrendCount`, method: 'GET' },
  getSourceAmountTrend: { url: `${curDomain}/data/globalSearch/sourceAmountTrendCount`, method: 'GET' },
  getRegionLayout: { url: `${curDomain}/data/globalSearch/areaCount`, method: 'GET' },
  register: { url: `${curDomain}/User/register`, method: 'POST' },
  getTraceTree: { url: `${curDomain}/data/weiboTrack`, method: 'GET' },
  modifyProgramme: { url: `${curDomain}/User/changeFangAn`, method: 'POST' },
  addProgramme: { url: `${curDomain}/User/saveFangAn`, method: 'POST' },
  delProgramme: { url: `${curDomain}/User/delFangAn`, method: 'GET' },
  getProgrammes: { url: `${curDomain}/User/findFangAn`, method: 'GET' },
  login: { url: `${curDomain}/User/login`, method: 'POST' },
  logout: { url: `${curDomain}/User/logout`, method: 'POST' },
  getUsers: { url: `${curDomain}/User/allUsers`, method: 'GET' },
  getKeywordsCloud: { url: `${curDomain}/data/keywordExtraction`, method: 'GET' },
  getSensitiveWord: { url: `${curDomain}/data/sensitiveWord`, method: 'POST' },
  getContentTag: { url: `${curDomain}/data/textClass2`, method: 'POST' },
  getContentEmotion: { url: `${curDomain}/data/sentimentAnalysis`, method: 'POST' },
  getProgrammeSensiLayout: { url: `${curDomain}/data/globalSearch/cflagCount2`, method: 'GET' },
  getProgrammeSourceLayout: { url: `${curDomain}/data/globalSearch/resourceCount2`, method: 'GET' },
  getProgrammeAmountTrend: { url: `${curDomain}/data/globalSearch/amountTrendCount2`, method: 'GET' },
  getProgrammeRegionLayout: { url: `${curDomain}/data/globalSearch/areaCount2`, method: 'GET' },
  getProgrammeOrigins: { url: `${curDomain}/User/findAllUrl`, method: 'GET' },
  addProgrammeOrigin: { url: `${curDomain}/User/addUrl`, method: 'POST' },
  delProgrammeOrigin: { url: `${curDomain}/User/delUrl`, method: 'GET' },
  getEventTree: { url: `${curDomain}/data/getEventTree`, method: 'GET' },
  getProgrammeSentimentLayout: { url: `${curDomain}/data/sentimentCount`, method: 'GET' },
  getProgrammeSentimentTrend: { url: `${curDomain}/data/sentimentTrendCount`, method: 'GET' },
  getProgrammeTotalAmountTrend: { url: `${curDomain}/data/getProgrammeTotalAmountTrend`, method: 'GET' },
  getProgrammeSourceTrend: { url: `${curDomain}/data/getProgrammeSourceTrend`, method: 'GET' },

  getSensitiveType: { url: `${curDomain}/data/textAlert`, method: 'POST' },
  getSensitiveData: { url: `${curDomain}/data/sensitiveCount`, method: 'GET' },
  get48AmountTrend: { url: `${curDomain}/data/globalSearch/amountTrendCount3`, method: 'GET' },
  getActiveWeiboUser: { url: `${curDomain}/data/getActivateUser`, method: 'GET' },
  getWeiboUserData: { url: `${curDomain}/data/globalSearch/searchByUser`, method: 'GET' },
  getProgrammeSummary: { url: `${curDomain}/data/multiDocumentSummary`, method: 'GET' },
  changeUserState: { url: `${curDomain}/User/changeUserState`, method: 'GET' },

  sampleKeywordAnalysis: { url: `${curDomain}/data/autoaddEkeyword`, method: 'POST' },
  addProgrammeSensitiveWord: { url: `${curDomain}/data/addSensitivewordForFid`, method: 'POST' },
  getProgrammeSensitiveWord: { url: `${curDomain}/data/sensitiveWordByFid`, method: 'POST' },

  getEventKeyWordByFid: { url: `${curDomain}/data/eventKeyWordByFid`, method: 'POST' },
  getHotArticle: { url: `${curDomain}/data/getHotArticle`, method: 'GET' },
  getWeiboUsers: { url: `${curDomain}/data/searchByWeiboUser`, method: 'GET' },
  addWeiboUser: { url: `${curDomain}/data/addWeiboUser`, method: 'GET' },
  getFangAnMonitor: { url: `${curDomain}/data/getFangAnMonitor`, method: 'GET' },
  getWeiboByid: { url: `${curDomain}/data/getWeiboByid`, method: 'GET' },
  getWeiboListByid: { url: `${curDomain}/data/getWeiboListByid`, method: 'GET' },
  searchBriefWeiboUser: { url: `${curDomain}/data/searchBriefWeiboUser`, method: 'GET' },
  getOverallDatOnNetwork: { url: `${curDomain}/data/getOverallDatOnNetwork`, method: 'GET' },
  getOverallDataBing: { url: `${curDomain}/data/getOverallDataBing`, method: 'GET' },
  getOverallData360: { url: `${curDomain}/data/getOverallData360`, method: 'GET' },
  getOverallDataBaidu: { url: `${curDomain}/data/getOverallDataBaidu`, method: 'GET' },
  deleteWeiboUser: { url: `${curDomain}/data/deleteWeiboUser`, method: 'GET' },
  getBriefingTemplate: { url: `${curDomain}/data/getBriefingTemplate`, method: 'GET' },
  saveBriefingTemplate: { url: `${curDomain}/data/saveBriefingTemplate`, method: 'GET' },
  deleteBriefingTemplate: { url: `${curDomain}/data/deleteBriefingTemplate`, method: 'GET' },

  getMaterial: { url: `${curDomain}/data/getMaterial`, method: 'GET' },
  getMaterialDetail: { url: `${curDomain}/data/getMaterialDetail`, method: 'GET' },
  addNewMaterialLib: { url: `${curDomain}/data/addNewMaterialLib`, method: 'GET' },
  modeifyMaterial: { url: `${curDomain}/data/modeifyMaterial`, method: 'POST' },
  renameMaterial: { url: `${curDomain}/data/renameMaterial`, method: 'GET' },
  deleteMaterial: { url: `${curDomain}/data/deleteMaterial`, method: 'GET' },
  deleteMaterialIDs: { url: `${curDomain}/data/deleteMaterialIDs`, method: 'POST' },

  generateFile: { url: `${curDomain}/data/generateFile`, method: 'POST' },
  addNewBriefingFileRecord: { url: `${curDomain}/data/addNewBriefingFileRecord`, method: 'GET' },
  updateBriefingFileProgess: { url: `${curDomain}/data/updateBriefingFileProgess`, method: 'GET' },
  getBriefingFiles: { url: `${curDomain}/data/getBriefingFiles`, method: 'GET' },
  deleteBriefingFiles: { url: `${curDomain}/data/deleteBriefingFiles`, method: 'GET' },
  downloadBriefingFiles: { url: `${curDomain}/data/downloadBriefingFiles`, method: 'GET' },

  getSensitiveWordTypes: { url: `${curDomain}/data/getSensitiveWordTypes`, method: 'GET' },
  getSensitiveWords: { url: `${curDomain}/data/getSensitiveWords`, method: 'GET' },
  deleteSensitiveWords: { url: `${curDomain}/data/deleteSensitiveWords`, method: 'POST' },
  addSensitiveWordForAll: { url: `${curDomain}/data/addSensitiveWordForAll`, method: 'GET' },
  getSensitiveWordsByFid: { url: `${curDomain}/data/getSensitiveWordsByFid`, method: 'GET' },

  changeUserJurisdiction: { url: `${curDomain}/User/changeUserJurisdiction`, method: 'GET' },
  changeUserEventLimiter: { url: `${curDomain}/User/changeUserEventLimiter`, method: 'GET' },
  changeUserSensitiveLimiter: { url: `${curDomain}/User/changeUserSensitiveLimiter`, method: 'GET' },

  getResources: { url: `${curDomain}/data/getResources`, method: 'GET' },

  getProgrammeWarning: { url: `${curDomain}/data/getFangAnWarning`, method: 'GET' },
  modifyProgrammeWarning: { url: `${curDomain}/data/modifyFangAnWarning`, method: 'GET' },
  getAllWarningReceiver: { url: `${curDomain}/data/getAllWarningReceiver`, method: 'GET' },
  addWarningReceiver: { url: `${curDomain}/data/addWarningReceiver`, method: 'GET' },
  deleteWarningReceiver: { url: `${curDomain}/data/deleteWarningReceiver`, method: 'GET' },
  getAllWarningRecord: { url: `${curDomain}/data/getWarningRecord`, method: 'GET' },

  getVideoData: { url: `${curDomain}/data/getVideoData`, method: 'GET' },
};

export default requests;
