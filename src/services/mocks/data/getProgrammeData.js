import mock from 'mockjs';

const { integer } = mock.Random;
const getProgrammeData = (url) => ({
  'hitNumber': 55,
  'dataContent|10': [{
    'id': '@guid',
    'webpageUrl': '@url',
    'content': '@cparagraph(5)',
    'title': '@cword(10)',
    'publishedDay': '@date(yyyy-MM-dd hh-mm-ss)',
    'captureTime': '@date(yyyy-MM-dd hh-mm-ss)',
    'resource': '@cword(3)',
    'fromType|1-7': '1',
    'cflag|1-7': '1',
  }],
});

export default getProgrammeData;
