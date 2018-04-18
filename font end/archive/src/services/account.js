import { stringify } from 'qs';
import request from '../utils/request';

export async function queryAccount(params) {
  return request(`/admin/listaccount?${stringify(params)}`);
}

export async function addAccount(params) {
  return request('/admin/addaccount', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function addAccountByfile(params) {
  return request('/admin/addaccountbyfile', {
    method: 'POST',
    body: {
      ...params,
      method: 'addbyfile',
    },
  });
}

export async function deleteAccount(params) {
  return request('/admin/deleteaccount', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function searchAccount(params) {
  return request('/admin/searchaccount', {
    method: 'POST',
    body: {
      ...params,
      method: 'search',
    },
  });
}

export async function modifyAccount(params) {
  return request('/admin/modifyaccount', {
    method: 'POST',
    body: {
      ...params,
      method: 'modify',
    },
  });
}
