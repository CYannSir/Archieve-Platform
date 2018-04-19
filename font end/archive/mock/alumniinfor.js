import { parse } from 'url';

// mock tableListDataSource
const tableListDataSource = [];
for (let i = 0; i < 50; i += 1) {
  tableListDataSource.push({
    objectId: 'sadasdasfdsfsfdsfafdsafsdf',
    updateTime: new Date(),
    createTime: new Date(),
    delTime: '',
    stuName: 'Tony',
    stuNumber: '31401417',
    stuClass: '1404',
    stuMajor: 'SE',
    stuStartYear: '2014',
    stuEndYear: '2018',
    currentEmail: '123@123.com',
    currentPhone: '10086',
    company: '浙江大学城市学院',
    companyAddress: '浙江省杭州市拱墅区湖州街51#',
    industry: 'IT/互联网',
    occupation: 'PM',
    salary: '9k/month',
  });
}

export function getAlumniInfor(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = [...tableListDataSource];

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.redParty) {
    const redParty = params.redParty.split(',');
    let filterDataSource = [];
    redParty.forEach((s) => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.redParty, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.delTime) {
    dataSource = dataSource.filter(data => data.delTime === null);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function postAlumniInfor(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const {
    method,
    objectId,
    updateTime,
    createTime,
    delTime,
    stuName,
    stuNumber,
    stuClass,
    stuMajor,
    stuStartYear,
    stuEndYear,
    currentEmail,
    currentPhone,
    company,
    companyAddress,
    industry,
    occupation,
    salary,
  } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      break;
    case 'add':
      tableListDataSource.unshift({
        objectId,
        updateTime,
        createTime,
        delTime,
        stuName,
        stuNumber,
        stuClass,
        stuMajor,
        stuStartYear,
        stuEndYear,
        currentEmail,
        currentPhone,
        company,
        companyAddress,
        industry,
        occupation,
        salary,
      });
      break;
    case 'addbyfile':
      tableListDataSource.unshift({
        objectId,
        updateTime,
        createTime,
        delTime,
        stuName,
        stuNumber,
        stuClass,
        stuMajor,
        stuStartYear,
        stuEndYear,
        currentEmail,
        currentPhone,
        company,
        companyAddress,
        industry,
        occupation,
        salary,
      });
      break;
    case 'modify':
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getAlumniInfor,
  postAlumniInfor,
};
