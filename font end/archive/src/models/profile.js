import { queryBasicProfile, queryAdvancedProfile, queryUserInfor } from '../services/api';

export default {
  namespace: 'profile',

  state: {
    data: [],
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
    *fetchUserInfor(_, { call, put }) {
      const response = yield call(queryUserInfor);
      console.log('userinfor==>', response.data);
      yield put({
        type: 'listuserinfor',
        payload: response.data,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    listuserinfor(state, { payload }) {
      console.log('payload', payload);
      return {
        ...state,
        data: payload,
      };
    },
  },
};
