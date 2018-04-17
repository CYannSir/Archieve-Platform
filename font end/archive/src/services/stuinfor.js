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
      method: 'post',
    },
  });
}

export async function addStuByfile(params) {
  return request('/admin/addstubyfile', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function deleteStu(params) {
  return request('/admin/deletestu', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function searchStu(params) {
  return request('/admin/searchstu', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function modifyStu(params) {
  return request('/admin/searchstu', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

