import { isUrl } from '../utils/utils';

/**
 * 更改admin页面的内容需要更新menu.js的Data数据和router.js的路径
 *
 */
const menuData = [{
  name: '基础信息管理',
  icon: 'dashboard',
  path: 'dashboard',
  authority: 'admin',
  children: [{
    name: '学生用户管理',
    path: 'analysis',
  }, {
    name: '用户管理',
    path: 'monitor',
  }, {
    name: '个人档案管理',
    path: 'monitor',
  }, {
    name: '红色档案管理',
    path: 'workplace',
  }, {
    name: '户口档案管理',
    path: 'workplace',
    // hideInBreadcrumb: true,
    // hideInMenu: true,
  }],
}, {
  name: '校友信息管理',
  icon: 'dashboard',
  path: 'form',
  authority: 'admin',
  children: [{
    name: '校友信息管理',
    path: 'basic-form',
  }, {
    name: '分步表单',
    path: 'step-form',
  }, {
    name: '高级表单',
    authority: 'admin',
    path: 'advanced-form',
  }],
}, {
  name: 'Find He or She',
  icon: 'home',
  path: 'list',
  authority: 'user',
  children: [{
    name: '查询表格',
    path: 'table-list',
  }, {
    name: '标准列表',
    path: 'basic-list',
  }, {
    name: '卡片列表',
    path: 'card-list',
  }, {
    name: '搜索列表',
    path: 'search',
    children: [{
      name: '搜索列表（文章）',
      path: 'articles',
    }, {
      name: '搜索列表（项目）',
      path: 'projects',
    }, {
      name: '搜索列表（应用）',
      path: 'applications',
    }],
  }],
}, {
  name: 'Archive',
  icon: 'book',
  path: 'profile',
  children: [{
    name: 'Archive',
    path: 'basic',
  }, {
    name: 'Account',
    path: 'advanced',
  }, {
    name: 'Red Archive',
    path: '403',
  }],
}, {
  name: 'Alumni information',
  icon: 'cloud',
  path: 'result',
  children: [{
    name: '成功',
    path: 'success',
  }, {
    name: '失败',
    path: 'fail',
  }],
}, {
  name: '异常页',
  icon: 'warning',
  path: 'exception',
  children: [{
    name: '403',
    path: '403',
  }, {
    name: '404',
    path: '404',
  }, {
    name: '500',
    path: '500',
  }, {
    name: '触发异常',
    path: 'trigger',
    hideInMenu: true,
  }],
}, {
  name: '账户',
  icon: 'user',
  path: 'user',
  authority: 'guest',
  children: [{
    name: '登录',
    path: 'login',
  }, {
    name: '注册',
    path: 'register',
  }, {
    name: '注册结果',
    path: 'register-result',
  }],
}, {
  name: '主页',
  icon: 'home',
  path: 'home',
  children: [{
    name: '主页',
    path: 'homepage',
  }, {
    name: '主页是',
    path: 'homepage-s',
  }, {
    name: '主页试试',
    path: 'homepage-ss',
  }],
}];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
