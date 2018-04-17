import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push({
    studentname: '吴成洋',
    studentmajor: '软件工程',
    studentclass: '软工1404',
    studentstartyear: '2014',
    studentendyear: '2018',
    currentemail: 'wcy623209668@vip.qq.com',
    currentnumber: '13588299239',
    studentno: '31401417',
    uploadtime: new Date(),
    deletetime: new Date(),
    updatedtime: new Date(),
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

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach((s) => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.no) {
    dataSource = dataSource.filter(data => data.no.indexOf(params.no) > -1);
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
    no,
    studentno,
    accountaddress,
    updatedate,
    studentname,
    studentmajor,
    studentclass,
    studentstartyear,
    studentendyear,
    currentemail,
    currentnumber,
  } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => no.indexOf(item.no) === -1);
      break;
    case 'post':
      tableListDataSource.unshift({
        studentname,
        studentno,
        studentmajor,
        studentclass,
        studentstartyear,
        accountaddress,
        studentendyear,
        currentemail,
        currentnumber,
        updatedate,
        uploadtime: new Date(),
        deletetime: new Date(),
        updatedtime: new Date(),
      });
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
