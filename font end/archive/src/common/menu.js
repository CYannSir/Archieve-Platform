import { isUrl } from '../utils/utils';

/**
 * 更改admin页面的内容需要更新menu.js的Data数据和router.js的路径
 *
 */
const menuData = [{
  name: 'Find He or She',
  icon: 'home',
  path: '/home/homepage',
}, {
  name: '基础信息管理',
  icon: 'dashboard',
  path: 'dashboard',
  authority: 'admin',
  children: [{
    name: '学生用户管理',
    path: 'studentbasicinfor',
  }, {
    name: '用户管理',
    path: 'userinfor',
  }, {
    name: '个人档案管理',
    path: 'archive',
  }, {
    name: '红色档案管理',
    path: 'redarchive',
  }, {
    name: '户口档案管理',
    path: 'account',
    // hideInBreadcrumb: true,
    // hideInMenu: true,
  }],
}, {
  name: '校友信息管理',
  icon: 'rocket',
  path: 'alumniinfor',
  authority: 'admin',
  children: [{
    name: '校友信息管理',
    path: 'adminalumniinfor',
  }, {
    name: '实习信息管理',
    path: 'adminpracticeinfor',
  }, {
    name: '交流群管理',
    path: 'chatgroup',
    // hideInBreadcrumb: true,
    // hideInMenu: true,
  }],
}, {
  name: 'Archive',
  icon: 'book',
  path: 'archive',
  authority: 'user',
  children: [{
    name: 'Archive',
    path: 'archive',
  }, {
    name: 'Account',
    path: 'account',
  }, {
    name: 'Red Archive',
    path: 'redarchive',
  }],
}, {
  name: 'Alumni information',
  icon: 'cloud',
  path: 'alumniinformation',
  authority: 'user',
  children: [{
    name: 'Alumni information',
    path: 'alumniinfor',
  }, {
    name: 'Edit alumni information',
    path: 'editalumniinfor',
    hideInMenu: true,
    // hideInBreadcrumb: true,
  }, {
    name: 'Practice Unit',
    path: 'practice',
  }, {
    name: 'Edit practice Unit',
    path: 'editpractice',
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
    name: '验证',
    path: 'register-verification',
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
