import { stringify } from 'qs';
import request from '../utils/request';

export async function queryUserInfor(params) {
  return request(`/admin/listuser?${stringify(params)}`);
}

export async function addUser(params) {
  return request('/admin/adduser', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function resetUserPwd(params) {
  return request('/admin/resetuserpwd', {
    method: 'POST',
    body: {
      ...params,
      method: 'resetuserpwd',
    },
  });
}

export async function deleteUser(params) {
  return request('/admin/deleteuser', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function searchUser(params) {
  return request('/admin/searchuser', {
    method: 'POST',
    body: {
      ...params,
      method: 'search',
    },
  });
}

export async function modifyUser(params) {
  return request('/admin/modifyuser', {
    method: 'POST',
    body: {
      ...params,
      method: 'modify',
    },
  });
}

