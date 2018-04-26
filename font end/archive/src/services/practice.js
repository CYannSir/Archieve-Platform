import { stringify } from 'qs';
import request from '../utils/request';

export async function queryPractice(params) {
  return request(`/admin/listpractice?${stringify(params)}`);
}

export async function addPractice(params) {
  return request('/admin/addpractice', {
    method: 'POST',
    body: {
      ...params,
      method: 'add',
    },
  });
}


export async function deletePractice(params) {
  return request('/admin/deletepractice', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function searchPractice(params) {
  return request('/admin/searchpractice', {
    method: 'POST',
    body: {
      ...params,
      method: 'search',
    },
  });
}
export async function exportPractice() {
  return request('/excel/practiceexcel', {
    method: 'POST',
  });
}
export async function modifyPractice(params) {
  return request('/admin/modifypractice', {
    method: 'POST',
    body: {
      ...params,
      method: 'modify',
    },
  });
}
