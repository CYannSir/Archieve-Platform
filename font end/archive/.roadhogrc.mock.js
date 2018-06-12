import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getStuInfor, postStuInfor } from './mock/stuinfor';
import { postUserInfor, getUserInfor } from './mock/stuinfor';
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
  'GET /currentUser': 'https://localhost:443',
  'GET /user/listuserinfor': 'https://localhost:443',
  'GET /user/listaccount': 'https://localhost:443',
  'POST /user/addaccount': 'https://localhost:443',
  'GET /user/listarchive': 'https://localhost:443',
  'POST /user/addarchive': 'https://localhost:443',
  'GET /user/listredarchive': 'https://localhost:443',
  'POST /user/addredarchive': 'https://localhost:443',
  'GET /user/listalumni': 'https://localhost:443',
  'POST /user/addalumni': 'https://localhost:443',
  'GET /user/listpractice': 'https://localhost:443',
  'GET /user/listchatgroup': 'https://localhost:443',
  'POST /user/addpractice': 'https://localhost:443',
  //ShowUser
  'POST /user/showuserinfor': 'https://localhost:443',
  'POST /user/showuseralumni': 'https://localhost:443',
  'POST /user/showuserpractice': 'https://localhost:443',


  //Home 主页信息
  'GET /home': 'https://localhost:443',
  'POST /home/search': 'https://localhost:443',
  'POST /modifypwd': 'https://localhost:443',
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
  //通知相关内容
  'POST /addfeedback': 'https://localhost:443',
  'POST /updatestatus': 'https://localhost:443',
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'GET /admin/liststu': 'https://localhost:443',
  'POST /admin/addstu': 'https://localhost:443',
  'POST /admin/addstubyfile': 'https://localhost:443',
  'POST /admin/deletestu': 'https://localhost:443',
  'POST /admin/searchstu': 'https://localhost:443',
  'POST /admin/modifystu': 'https://localhost:443', 
  
  'GET /admin/listuser': 'https://localhost:443',
  'POST /admin/adduser': 'https://localhost:443',
  'POST /admin/resetuserpwd': 'https://localhost:443',
  'POST /admin/deleteuser': 'https://localhost:443',
  'POST /admin/searchuser': 'https://localhost:443',
  'POST /admin/modifyuser': 'https://localhost:443', 
  
  /*
  'GET /admin/listuser': 'https://localhost:443',
  'POST /admin/adduser': 'https://localhost:443',
  'POST /admin/adduserbyfile': 'https://localhost:443',
  'POST /admin/deleteuser': 'https://localhost:443',
  'POST /admin/searchuser': 'https://localhost:443',
  'POST /admin/modifyuser': 'https://localhost:443', 
  */
  'GET /admin/listarchive': 'https://localhost:443',
  'POST /admin/addarchive': 'https://localhost:443',
  'POST /admin/addarchivebyfile': 'https://localhost:443',
  'POST /admin/deletearchive': 'https://localhost:443',
  'POST /admin/searcharchive': 'https://localhost:443',
  'POST /admin/modifyarchive': 'https://localhost:443',
  
  'GET /admin/listaccount': 'https://localhost:443',
  'POST /admin/addaccount': 'https://localhost:443',
  'POST /admin/addaccountbyfile': 'https://localhost:443',
  'POST /admin/deleteaccount': 'https://localhost:443',
  'POST /admin/searchaccount': 'https://localhost:443',
  'POST /admin/modifyaccount': 'https://localhost:443',
  
  'GET /admin/listredarchive': 'https://localhost:443',
  'POST /admin/addredarchive': 'https://localhost:443',
  'POST /admin/addredarchivebyfile': 'https://localhost:443',
  'POST /admin/deleteredarchive': 'https://localhost:443',
  'POST /admin/searchredarchive': 'https://localhost:443',
  'POST /admin/modifyredarchive': 'https://localhost:443',
  
  'GET /admin/listnotices': 'https://localhost:443',
  'POST /admin/addnotice': 'https://localhost:443',
  'POST /admin/deletenotice': 'https://localhost:443',
  'POST /admin/modifynotice': 'https://localhost:443',
  'POST /admin/replynotice': 'https://localhost:443',

  'GET /admin/listalumniinfor': 'https://localhost:443',
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
  'POST /admin/searchalumniinfor': 'https://localhost:443',
  'POST /excel/alumniexcel': 'https://localhost:443',
  'POST /admin/modifyalumniinfor': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postAlumniInfor,
  },
  'GET /admin/listpractice': 'https://localhost:443',
  'POST /admin/addpractice': 'https://localhost:443',
  'POST /admin/deletepracticer': 'https://localhost:443',
  'POST /admin/searchpractice': 'https://localhost:443',
  'POST /excel/practiceexcel': 'https://localhost:443',
  'POST /admin/modifypractice': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postPractice,
  },
  'GET /admin/listchatgroup': 'https://localhost:443',
  'POST /admin/addchatgroup': 'https://localhost:443',
  'POST /admin/deletechatgroup': 'https://localhost:443',
  'POST /admin/searchchatgroup':'https://localhost:443',
  'POST /admin/modifychatgroup': 'https://localhost:443',
  
  'POST /login': 'https://localhost:443',
  'POST /forgetpsw': 'https://localhost:443',
  
  
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
  
  'POST api/login/account': (req, res) => {
    const { loginPsw, loginEmail, type } = req.body;
    if(loginPsw === '888888' && loginEmail === 'admin'){
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin'
      });
      return ;
    }
    if(loginPsw === '123456' && loginEmail === 'user'){
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
  'POST /register': 'https://localhost:443',
  'POST /register/sendemail': 'https://localhost:443',
  // 获取全局通知
  'GET /listnotice': 'https://localhost:443',
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

