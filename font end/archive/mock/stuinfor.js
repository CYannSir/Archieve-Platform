import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 50; i += 1) {
  tableListDataSource.push({
    objectId: 'sadasdasfdsfsfdsfafdsafsdf',
    updateTime: new Date(),
    createTime: new Date(),
    delTime: '',
    stuNumber: '31401417',
    stuName: '张三',
    stuMajor: '软件工程',
    stuClass: '软工1404',
    stuStartYear: '2014',
    stuEndYear: '2018',
    redParty: '1',
    currentEmail: 'wcy623209668@vip.qq.com',
    currentPhone: '13588299239',
  });
}

export function getStuInfor(req, res, u) {
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

export function postStuInfor(req, res, u, b) {
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
    stuNumber,
    stuName,
    stuMajor,
    stuClass,
    stuStartYear,
    stuEndYear,
    redParty,
  } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(
        item => item.delTime === new Date());
      break;
    case 'add':
      tableListDataSource.unshift({
        objectId,
        updateTime,
        createTime,
        delTime,
        stuNumber,
        stuName,
        stuMajor,
        stuClass,
        stuStartYear,
        stuEndYear,
        redParty,
      });
      break;
    case 'addbyfile':
      tableListDataSource.unshift({
        objectId,
        updateTime,
        createTime,
        delTime,
        stuNumber,
        stuName,
        stuMajor,
        stuClass,
        stuStartYear,
        stuEndYear,
        redParty,
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
  getStuInfor,
  postStuInfor,
};
