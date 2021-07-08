import requests from '../../requests';
import qs from 'qs';

const getProgrammeSensiLayout = async (fid, startPublishedDay, endPublishedDay) => {
  const params = {
    fid,
    startPublishedDay,
    endPublishedDay,
  };
  const url = encodeURI(`${requests.getProgrammeSensiLayout.url}?fid=${fid}&startPublishedDay=${startPublishedDay}&endPublishedDay=${endPublishedDay}`);
  const response = await fetch(url, { method: requests.getProgrammeSensiLayout.method });
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
  const sensiLayout = [
    { name: '敏感', label: '敏感', value: rawResult.cflag1 },
    { name: '非敏感', label: '非敏感', value: rawResult.cflag0 },
  ].filter(item => item.value);
  return sensiLayout;
};

export default getProgrammeSensiLayout;
