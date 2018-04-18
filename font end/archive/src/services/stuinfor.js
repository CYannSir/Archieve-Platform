import { stringify } from 'qs';
import request from '../utils/request';

export async function queryStuInfor(params) {
  return request(`/admin/liststu?${stringify(params)}`);
}

export async function addStu(params) {
  return request('/admin/addstu', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function addStuByfile(params) {
  return request('/admin/addstubyfile', {
    method: 'POST',
    body: {
      ...params,
      method: 'addbyfile',
    },
  });
}

export async function deleteStu(params) {
  return request('/admin/deletestu', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function searchStu(params) {
  return request('/admin/searchstu', {
    method: 'POST',
    body: {
      ...params,
      method: 'search',
    },
  });
}

export async function modifyStu(params) {
  return request('/admin/modifystu', {
    method: 'POST',
    body: {
      ...params,
      method: 'modify',
    },
  });
}

