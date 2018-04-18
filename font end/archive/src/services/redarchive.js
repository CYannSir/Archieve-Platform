import { stringify } from 'qs';
import request from '../utils/request';

export async function queryRedArchive(params) {
  return request(`/admin/listredarchive?${stringify(params)}`);
}

export async function addRedArchive(params) {
  return request('/admin/addredarchive', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}

export async function addRedArchiveByfile(params) {
  return request('/admin/addredarchivebyfile', {
    method: 'POST',
    body: {
      ...params,
      method: 'addbyfile',
    },
  });
}

export async function deleteRedArchive(params) {
  return request('/admin/deleteredarchive', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function searchRedArchive(params) {
  return request('/admin/searchredarchive', {
    method: 'POST',
    body: {
      ...params,
      method: 'search',
    },
  });
}

export async function modifyRedArchive(params) {
  return request('/admin/modifyredarchive', {
    method: 'POST',
    body: {
      ...params,
      method: 'modify',
    },
  });
}
