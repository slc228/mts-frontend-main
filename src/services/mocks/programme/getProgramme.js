const getProgramme = (url) => ({
  'data': [{
    'programmeName': '测试主题1',
    'fid': 0,
    'matchType': 'titleOnly',
    'regionKeyword': '@cword(5)',
    'regionKeywordMatch|0-1': 0,
    'roleKeyword': '@cword(5)',
    'roleKeywordMatch|0-1': 0,
    'eventKeyword': '@cword(5)',
    'eventKeywordMatch|0-1': 0,
    'enableAlert': '@boolean',
  }, {
    'programmeName': '测试主题',
    'fid': 1,
    'matchType': 'titleOnly',
    'regionKeyword': '@cword(5)',
    'regionKeywordMatch|0-1': 0,
    'roleKeyword': '@cword(5)',
    'roleKeywordMatch|0-1': 0,
    'eventKeyword': '@cword(5)',
    'eventKeywordMatch|0-1': 0,
    'enableAlert': '@boolean',
  }],
});

export default getProgramme;
