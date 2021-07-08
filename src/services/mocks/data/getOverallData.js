import mock from 'mockjs';

const { integer } = mock.Random;
const getOverallData = (url) => ({
  'hitNumber': 55,
  'dataContent|10': [{
    'id': '@guid',
    'webpageUrl': '@url',
    'content': '@cparagraph(30)',
    'title': '@cword(10)',
    'publishedDay': '@date(yyyy-MM-dd hh-mm-ss)',
    'captureTime': '@date(yyyy-MM-dd hh-mm-ss)',
    'resource': '@cword(3)',
    'fromType': `${integer(1, 7)}`,
    'cflag': `${integer(1, 2)}`,
  }],
});

export default getOverallData;
