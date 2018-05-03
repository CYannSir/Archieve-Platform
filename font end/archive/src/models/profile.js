import { queryBasicProfile, addAccount, queryAdvancedProfile, queryUserInfor, queryAccount } from '../services/api';

export default {
  namespace: 'profile',

  state: {
    data: [],
    accountdata: [],
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
  },

  reducers: {
    saveaccount(state, { payload }) {
      return {
        ...state,
        accountdata: payload,
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
    listuserinfor(state, { payload }) {
      // console.log('payload', payload);
      return {
        ...state,
        data: payload,
      };
    },
  },
};
