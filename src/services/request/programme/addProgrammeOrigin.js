import requests from '../../requests';
import moment from 'moment'

const addProgrammeOrigin = async (name, addr, user) => {
  const url = encodeURI(`${requests.addProgrammeOrigin.url}`);
  const data = {
    name,
    url: addr,
    'create_by': user,
    'create_date': moment().format('YYYY'),
    "update_by": user,
    "update_date": moment().format('YYYY'),
    remarks: '',
    'del_flag': 0,
  };
  const response = await fetch(url, {
    method: requests.addProgrammeOrigin.method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const rawResult = response.status === 200 ? await response.json() : [];
  return rawResult;
};

export default addProgrammeOrigin;