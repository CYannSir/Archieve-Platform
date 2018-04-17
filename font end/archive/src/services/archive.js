import { stringify } from 'qs';
import request from '../utils/request';

export async function queryArchive() {
  return request('/admin/addarchive');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}
