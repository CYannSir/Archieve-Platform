import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}


export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function addFeedback(params) {
  return request('/addfeedback', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateStatus(params) {
  return request('/updatestatus', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function listFeedback() {
  return request('/listnotice');
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryUserInfor() {
  return request('/user/listuserinfor');
}

export async function queryAlumniInformation() {
  return request('/user/listalumni');
}

export async function queryPracticeInfor() {
  return request('/user/listpractice');
}

export async function addAccount(params) {
  return request('/user/addaccount', {
    method: 'POST',
    body: params,
  });
}

export async function queryAccount() {
  return request('/user/listaccount');
}

export async function addArchive(params) {
  return request('/user/addarchive', {
    method: 'POST',
    body: params,
  });
}

export async function addAlumniInfor(params) {
  return request('/user/addalumni', {
    method: 'POST',
    body: params,
  });
}

export async function searchHome(params) {
  return request('/home/search', {
    method: 'POST',
    body: params,
  });
}

export async function addPractice(params) {
  return request('/user/addpractice', {
    method: 'POST',
    body: params,
  });
}

export async function queryArchive() {
  return request('/user/listarchive');
}

export async function addRedArchive(params) {
  return request('/user/addredarchive', {
    method: 'POST',
    body: params,
  });
}

export async function queryRedArchive() {
  return request('/user/listredarchive');
}

export async function queryHome(params) {
  return request(`/home?${stringify(params)}`);
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/login', {
    method: 'POST',
    body: params,
  });
}

export async function forgetPsw(params) {
  return request('/forgetpsw', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function register(params) {
  return request('/register', {
    method: 'POST',
    body: params,
  });
}

export async function updatePsw(params) {
  return request('/modifypwd', {
    method: 'POST',
    body: params,
  });
}


export async function sendEmail(params) {
  return request('/register/sendemail', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/listnotice');
}
