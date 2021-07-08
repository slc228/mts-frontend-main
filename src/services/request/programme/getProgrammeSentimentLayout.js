import qs from 'qs';
import requests from '../../requests';

const getProgrammeSentimentLayout = async (fid, startPublishedDay, endPublishedDay) => {
  const url = encodeURI(`${requests.getProgrammeSentimentLayout.url}?fid=${fid}&startPublishedDay=${startPublishedDay}&endPublishedDay=${endPublishedDay}`);
  const response = await fetch(url,
    {
      method: requests.getProgrammeSentimentLayout.method,
    });
  const rawResult = response.status === 200 ? await response.json() : {};
  /* const options = [
    { label: '不限', value: null },
    { label: '敏感', value: '1' },
    { label: '非敏感', value: '2' },
  ];
  const sensiLayout =
    Object.keys(rawResult)
      .map((id) => ({
        name: options[id].label,
        label: options[id].label,
        value: rawResult[id],
      })); */
  const sentimentLayout = [
    { name: '积极', label: '积极', value: rawResult.happy, color: 'pink' },
    { name: '愤怒', label: '愤怒', value: rawResult.angry, color: 'red' },
    { name: '悲伤', label: '悲伤', value: rawResult.sad, color: 'blue' },
    { name: '恐惧', label: '恐惧', value: rawResult.fear, color: 'fear' },
    { name: '惊奇', label: '惊奇', value: rawResult.surprise, color: 'yellow' },
    { name: '中立', label: '中立', value: rawResult.neutral, color: 'darkgray' },
  ].filter(item => item.value);
  return sentimentLayout;
};

export default getProgrammeSentimentLayout;
