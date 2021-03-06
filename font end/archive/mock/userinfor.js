import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push({
    key: i,
    disabled: ((i % 6) === 0),
    href: 'https://ant.design',
    avatar: ['https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png'][i % 2],
    no: `TradeCode ${i}`,
    title: `一个任务名称 ${i}`,
    owner: '曲丽丽',
    description: '这是一段描述',
    studentname: '吴成洋',
    studentmajor: '软件工程',
    studentclass: '软工1404',
    studentstartyear: '2014',
    studentendyear: '2018',
    currentemail: 'wcy623209668@vip.qq.com',
    currentnumber: '13588299239',
    studentno: '31401417',
    company: '浙江大学城市学院',
    companyaddress: '杭州市拱墅区湖州街51号浙江大学城市学院',
    industry: 'IT/互联网',
    occupation: 'Devloper',
    salary: '9k/month',
    accountaddress: '杭州市 拱墅区 浙大城院',
    preaccountaddress: '杭州市 西湖区 浙大西溪校区',
    studentifred: '1',
    currentarchive: '杭州市西湖区人才市场',
    currentarchiveaddress: '杭州市西湖区农贸市场1号',
    flowdate: '2018-01-07',
    name: '张如仟',
    introducer: '张如仟',
    schoolid: '31401417',
    mobilephone: '13588299239',
    email: '123@123.com',
    changedate: new Date(),
    uploadtime: new Date(),
    deletetime: new Date(),
    updatedtime: new Date(),
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
  });
}

export function getUserInfor(req, res, u) {
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

export function postUserInfor(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const {
    method,
    no,
    description,
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
    company,
    companyaddress,
    industry,
    occupation,
    salary,
    studentifred,
    currentarchive,
    currentarchiveaddress,
    flowdate,
    introducer,
  } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => no.indexOf(item.no) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        href: 'https://ant.design',
        avatar: ['https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png'][i % 2],
        no: `TradeCode ${i}`,
        title: `一个任务名称 ${i}`,
        owner: '曲丽丽',
        studentname,
        studentno,
        studentmajor,
        studentclass,
        studentstartyear,
        accountaddress,
        studentendyear,
        currentemail,
        currentnumber,
        company,
        companyaddress,
        industry,
        occupation,
        salary,
        studentifred,
        currentarchive,
        currentarchiveaddress,
        flowdate,
        introducer,
        updatedate,
        uploadtime: new Date(),
        deletetime: new Date(),
        updatedtime: new Date(),
        description,
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 2,
        updatedAt: new Date(),
        createdAt: new Date(),
        progress: Math.ceil(Math.random() * 100),
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
  getUserInfor,
  postUserInfor,
};
