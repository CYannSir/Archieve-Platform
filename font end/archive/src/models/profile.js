import { message } from 'antd';
import { queryBasicProfile, addFeedback, updateStatus, queryPracticeInfor, queryAlumniInformation, queryRedArchive, addAccount, queryArchive, addArchive, queryAdvancedProfile, queryUserInfor, queryAccount } from '../services/api';

export default {
  namespace: 'profile',

  state: {
    data: [],
    updatestatus: [],
    accountdata: [],
    archivedata: [],
    redarchivedata: [],
    alumnidata: [],
    practicedata: [],
    basicGoods: [],
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
  },

  effects: {
    *fetchBasic(_, { call, put }) {
      const response = yield call(queryBasicProfile);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *fetchAdvanced(_, { call, put }) {
      const response = yield call(queryAdvancedProfile);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *fetchAccount(_, { call, put }) {
      const response = yield call(queryAccount);
      const res = response.data;
      if (res.length > 2) {
        const arr = res.splice(res.length - 2, 2);
        yield put({
          type: 'listaccount',
          payload: arr,
        });
      } else {
        yield put({
          type: 'listaccount',
          payload: response.data,
        });
      }
    },
    *fetchRedArchive(_, { call, put }) {
      const response = yield call(queryRedArchive);
      // console.log('userinfor==>', response.data);
      yield put({
        type: 'listredarchive',
        payload: response.data,
      });
    },
    *fetchArchive(_, { call, put }) {
      const response = yield call(queryArchive);
      // console.log('userinfor==>', response.data);
      const res = response.data;
      if (res.length > 5) {
        const arr = res.splice(res.length - 5, 5);
        yield put({
          type: 'listarchive',
          payload: arr,
        });
      } else {
        yield put({
          type: 'listarchive',
          payload: response.data,
        });
      }
    },
    *fetchUserInfor(_, { call, put }) {
      const response = yield call(queryUserInfor);
      // console.log('userinfor==>', response.data);
      yield put({
        type: 'listuserinfor',
        payload: response.data,
      });
    },
    *fetchAlumniInformation(_, { call, put }) {
      const response = yield call(queryAlumniInformation);
      // console.log('listalumni==>', response.data);
      yield put({
        type: 'listalumni',
        payload: response.data,
      });
    },
    *fetchPracticeInfor(_, { call, put }) {
      const response = yield call(queryPracticeInfor);
      // console.log('listalumni==>', response.data);
      yield put({
        type: 'listpractice',
        payload: response.data,
      });
    },
    *addAccount({ payload, callback }, { call, put }) {
      const response = yield call(addAccount, payload);
      // console.log('userinfor==>', response.data);
      if (response.code === 200) {
        message.success('Success', 4);
        yield put({
          type: 'saveaccount',
          payload: response.data,
        });
      } else {
        message.error('Add account failed', 4);
      }
      if (callback) callback();
    },
    *addArchive({ payload, callback }, { call, put }) {
      const response = yield call(addArchive, payload);
      // console.log('userinfor==>', response.data);
      if (response.code === 200) {
        message.success('Success', 4);
        yield put({
          type: 'savearchive',
          payload: response.data,
        });
      } else {
        message.error('Add archive failed', 4);
      }

      if (callback) callback();
    },
    *addFeedback({ payload, callback }, { call }) {
      const response = yield call(addFeedback, payload);
      // console.log('test', response.code);
      if (response.code === 200) {
        message.success('Thx for your support!');
      }
      if (callback) callback();
    },
    *updateStatus({ payload, callback }, { call, put }) {
      const response = yield call(updateStatus, payload);
      // console.log('aas', response.data);
      if (response.code === 200) {
        message.success('This notice will be read');
        yield put({
          type: 'updatestatus',
          payload: response.data,
        });
      } else if (response.code === 101) {
        message.success('Update failed');
      }

      if (callback) callback();
    },
  },

  reducers: {
    updatestatus(state, { payload }) {
      return {
        ...state,
        updatestatus: payload,
      };
    },
    saveaccount(state, { payload }) {
      return {
        ...state,
        accountdata: payload,
      };
    },
    savearchive(state, { payload }) {
      return {
        ...state,
        archivedata: payload,
      };
    },
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    listaccount(state, { payload }) {
      // console.log('payload', payload);
      return {
        ...state,
        accountdata: payload,
      };
    },
    listarchive(state, { payload }) {
      // console.log('payload', payload);
      return {
        ...state,
        archivedata: payload,
      };
    },
    listalumni(state, { payload }) {
      // console.log('payload', payload);
      return {
        ...state,
        alumnidata: payload,
      };
    },
    listredarchive(state, { payload }) {
      // console.log('payload', payload);
      return {
        ...state,
        redarchivedata: payload,
      };
    },
    listpractice(state, { payload }) {
      // console.log('payload', payload);
      return {
        ...state,
        practicedata: payload,
        flag: false,
      };
    },
    listuserinfor(state, { payload }) {
      // console.log('payload', payload);
      return {
        ...state,
        data: payload,
      };
    },
  },
};
