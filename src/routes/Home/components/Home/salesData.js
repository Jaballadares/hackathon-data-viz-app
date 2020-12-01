import { map, each } from 'lodash';

//TODO MAKE SURE WE HAVE A VALID TOKEN ALWAYS
const options = {
  uri: 'https://slipstream.homejunction.com/ws/sales/search?',
  headers: new Headers({ 'HJI-Slipstream-Token': 'HJI-825CD956-80FD-478D-8FAB-72B719A9AD2F' }),
};

const requestOptions = {
  ...options,
  // qs: {
  //   vendor,
  //   q,
  //   status: ['Active', 'Pending', 'Closed', 'ActiveUnderContract', 'Hold', 'Withdrawn', 'Expired', 'Delete', 'Incomplete', 'ComingSoon'],
  //   type: ['residential', 'rental', 'multifamily', 'condominium', 'commercial', 'land'],
  // },
};

const getSalesData = (query) => {
  let fullUri = query.uri;
  each(query.params, (value, key) => {
    fullUri = fullUri.concat(`&${key}=${value}`);
  });
  return fetch(fullUri, { headers: requestOptions.headers })
    .then(r => r.json())
    .then(j => j.result.sales);
};

// const salesData = map(response.result.sales, (sale, idx) => {
//     return { x: idx, y: sale.listPrice };
// });

export default getSalesData;
