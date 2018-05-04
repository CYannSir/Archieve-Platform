import { queryBasicProfile, queryRedArchive, addAccount, queryArchive, addArchive, queryAdvancedProfile, queryUserInfor, queryAccount } from '../services/api';

export default {
  namespace: 'profile',

  state: {
    data: [],
    accountdata: [],
    archivedata: [],
    redarchivedata: [],
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
      // console.log('userinfor==>', response.data);
      yield put({
        type: 'listaccount',
        payload: response.data,
      });
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
    *addAccount({ payload, callback }, { call, put }) {
      const response = yield call(addAccount, payload);
      // console.log('userinfor==>', response.data);
      yield put({
        type: 'saveaccount',
        payload: response.data,
      });
      if (callback) callback();
    },
    *addArchive({ payload, callback }, { call, put }) {
      const response = yield call(addArchive, payload);
      // console.log('userinfor==>', response.data);
      yield put({
        type: 'savearchive',
        payload: response.data,
      });
      if (callback) callback();
    },
  },

  reducers: {
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
    listredarchive(state, { payload }) {
      // console.log('payload', payload);
      return {
        ...state,
        redarchivedata: payload,
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
