import { stringify } from 'qs';
import request from '../utils/request';

export async function queryArchive(params) {
  return request(`/admin/listarchive?${stringify(params)}`);
}

export async function addArchive(params) {
  return request('/admin/addarchive', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function addArchiveByfile(params) {
  return request('/admin/addstubyfile', {
    method: 'POST',
    body: {
      ...params,
      method: 'addbyfile',
    },
  });
}

export async function deleteArchive(params) {
  return request('/admin/deletearchive', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function searchArchive(params) {
  return request('/admin/searcharchive', {
    method: 'POST',
    body: {
      ...params,
      method: 'search',
    },
  });
}

export async function modifyArchive(params) {
  return request('/admin/modifyarchive', {
    method: 'POST',
    body: {
      ...params,
      method: 'modify',
    },
  });
}
