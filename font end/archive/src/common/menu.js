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
    name: '实习信息管理',
    path: 'step-form',
  }],
}, {
  name: 'Find He or She',
  icon: 'home',
  path: 'list/search/articles',
  authority: 'user',
}, {
  name: 'Archive',
  icon: 'book',
  path: 'profile',
  authority: 'user',
  children: [{
    name: 'Archive',
    path: 'advanced',
  }, {
    name: 'Account',
    path: 'account',
  }, {
    name: 'Red Archive',
    path: 'redarchive',
  }],
}, {
  authority: 'user',
  name: 'Alumni information',
  icon: 'cloud',
  path: 'result',
  children: [{
    name: 'Your information',
    path: 'success',
  }, {
    name: 'Edit information',
    path: 'exception/404',
  }, {
    name: 'Practice Unit',
    path: 'fail',
  }, {
    name: 'Edit practice Unit',
    path: 'exception/403',
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
