import { stringify } from 'qs';
import request from '../utils/request';

export async function queryChatGroup(params) {
  return request(`/admin/listchatgroup?${stringify(params)}`);
}

export async function addChatGroup(params) {
  return request('/admin/addchatgroup', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}


export async function deleteChatGroup(params) {
  return request('/admin/deletechatgroup', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function searchChatGroup(params) {
  return request('/admin/searchchatgroup', {
    method: 'POST',
    body: {
      ...params,
      method: 'search',
    },
  });
}

export async function modifyChatGroup(params) {
  return request('/admin/modifychatgroup', {
    method: 'POST',
    body: {
      ...params,
      method: 'modify',
    },
  });
}
