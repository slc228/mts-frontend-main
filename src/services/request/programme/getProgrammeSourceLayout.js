import qs from 'qs';
import requests from '../../requests';

const getProgrammeSourceLayout = async (fid, startPublishedDay, endPublishedDay) => {
  const params = {
    fid,
    startPublishedDay,
    endPublishedDay,
  };
  const url = encodeURI(`${requests.getProgrammeSourceLayout.url}?fid=${fid}&startPublishedDay=${startPublishedDay}&endPublishedDay=${endPublishedDay}`);
  const response = await fetch(url, { method: requests.getProgrammeSourceLayout.method });
  const rawResult = response.status === 200 ? await response.json() : {};
  console.log(rawResult);
  return rawResult;
};

export default getProgrammeSourceLayout;
