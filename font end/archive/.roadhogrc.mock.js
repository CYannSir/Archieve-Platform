import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getStuInfor, postStuInfor } from './mock/stuinfor';
import { getArchive, postArchive } from './mock/archive';
import { getAccount, postAccount } from './mock/account';
import { getRedArchive, postRedArchive } from './mock/redarchive';
import { getAlumniInfor, postAlumniInfor } from './mock/alumniinfor';
import { getPractice, postPractice } from './mock/practice'
import { getChatGroup, postChatGroup } from './mock/chatgroup'
import { getActivities, getNotice, getFakeList } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  // GET POST 可省略
  'GET /api/users': [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }],
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'GET /api/rule': getRule,
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'GET /admin/liststu': 'http://localhost:8080',
  'POST /admin/addstu': 'http://localhost:8080',
  'POST /admin/addstubyfile': 'http://localhost:8080',
  'POST /admin/deletestu': 'http://localhost:8080',
  'POST /admin/searchstu': 'http://localhost:8080',
  'POST /admin/modifystu': 'http://localhost:8080', 
  'GET /admin/listarchive': 'http://localhost:8080',
  'POST /admin/addarchive': 'http://localhost:8080',
  'POST /admin/addarchivebyfile': 'http://localhost:8080',
  'POST /admin/deletearchive': 'http://localhost:8080',
  'POST /admin/searcharchive': 'http://localhost:8080',
  'POST /admin/modifyarchive': 'http://localhost:8080',
  'GET /admin/listaccount': 'http://localhost:8080',
  'POST /admin/addaccount': 'http://localhost:8080',
  'POST /admin/addaccountbyfile': 'http://localhost:8080',
  'POST /admin/deleteaccount': 'http://localhost:8080',
  'POST /admin/searchaccount': 'http://localhost:8080',
  'POST /admin/modifyaccount': 'http://localhost:8080',
  'GET /admin/listredarchive': 'http://localhost:8080',
  'POST /admin/addredarchive': 'http://localhost:8080',
  'POST /admin/addredarchivebyfile': 'http://localhost:8080',
  'POST /admin/deleteredarchive': 'http://localhost:8080',
  'POST /admin/searchredarchive': 'http://localhost:8080',
  'POST /admin/modifyredarchive': 'http://localhost:8080',
  'GET /admin/listalumniinfor': 'http://localhost:8080',
  'POST /admin/addalumniinfor': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postAlumniInfor,
  },
  'POST /admin/deletealumniinfor': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postAlumniInfor,
  },
  'POST /admin/searchalumniinfor': 'http://localhost:8080',
  'POST /admin/modifyalumniinfor': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postAlumniInfor,
  },
 'GET /admin/listpractice': getPractice,
  'POST /admin/addpractice': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postPractice,
  },
  'POST /admin/deletepracticer': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postPractice,
  },
  'POST /admin/searchpractice': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postPractice,
  },
  'POST /admin/modifypractice': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postPractice,
  },
  'GET /admin/listchatgroup': getChatGroup,
  'POST /admin/addchatgroup': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postChatGroup,
  },
  'POST /admin/deletechatgroup': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postChatGroup,
  },
  'POST /admin/searchchatgroup': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postChatGroup,
  },
  'POST /admin/modifychatgroup': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postChatGroup,
  },

  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }]
  }),
  'GET /api/fake_list': getFakeList,
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'POST /api/login/account': (req, res) => {
    const { password, loginEmail, type } = req.body;
    if(password === '888888' && loginEmail === 'admin'){
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin'
      });
      return ;
    }
    if(password === '123456' && loginEmail === 'user'){
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user'
      });
      return ;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest'
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/notices': getNotices,
  'GET /api/500': (req, res) => {
    res.status(500).send({
      "timestamp": 1513932555104,
      "status": 500,
      "error": "error",
      "message": "error",
      "path": "/base/category/list"
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      "timestamp": 1513932643431,
      "status": 404,
      "error": "Not Found",
      "message": "No message available",
      "path": "/base/category/list/2121212"
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      "timestamp": 1513932555104,
      "status": 403,
      "error": "Unauthorized",
      "message": "Unauthorized",
      "path": "/base/category/list"
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      "timestamp": 1513932555104,
      "status": 401,
      "error": "Unauthorized",
      "message": "Unauthorized",
      "path": "/base/category/list"
    });
  },
};

export default noProxy ? {} : delay(proxy, 1000);

