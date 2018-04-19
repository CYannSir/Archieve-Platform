import { stringify } from 'qs';
import request from '../utils/request';

export async function queryAlumniInfor(params) {
  return request(`/admin/listalumniinfor?${stringify(params)}`);
}

export async function addAlumniInfor(params) {
  return request('/admin/addalumniinfor', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}


export async function deleteAlumniInfor(params) {
  return request('/admin/deletealumniinfor', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function searchAlumniInfor(params) {
  return request('/admin/searchalumniinfor', {
    method: 'POST',
    body: {
      ...params,
      method: 'search',
    },
  });
}

export async function modifyAlumniInfor(params) {
  return request('/admin/modifyalumniinfor', {
    method: 'POST',
    body: {
      ...params,
      method: 'modify',
    },
  });
}
