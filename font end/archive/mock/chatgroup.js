import { parse } from 'url';

// mock tableListDataSource
const tableListDataSource = [];
for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push({
    objectId: 'sadasdasfdsfsfdsfafdsafsdf',
    updateTime: new Date(),
    createTime: new Date(),
    delTime: '',
    stuMajor: 'SE',
    stuEndYear: '2018',
    qqNo: '123456',
    wechatNo: '',
  });
}

export function getChatGroup(req, res, u) {
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

export function postChatGroup(req, res, u, b) {
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
    stuMajor,
    stuEndYear,
    qqNo,
    wechatNo,
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
        stuMajor,
        stuEndYear,
        qqNo,
        wechatNo,
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
  getChatGroup,
  postChatGroup,
};
