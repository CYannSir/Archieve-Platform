import { stringify } from 'qs';
import request from '../utils/request';

export async function queryNotice(params) {
  return request(`/admin/listnotices?${stringify(params)}`);
}

export async function addNotice(params) {
  return request('/admin/addnotice', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function replyNotice(params) {
  return request('/admin/replynotice', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}


export async function deleteNotice(params) {
  return request('/admin/deletenotice', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function searchNotice(params) {
  return request('/admin/searchnotice', {
    method: 'POST',
    body: {
      ...params,
      method: 'search',
    },
  });
}

export async function modifyNotice(params) {
  return request('/admin/modifynotice', {
    method: 'POST',
    body: {
      ...params,
      method: 'modify',
    },
  });
}
