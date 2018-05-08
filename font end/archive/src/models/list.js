import { queryFakeList, queryHome, searchHome, queryShowUserInfor } from '../services/api';

export default {
  namespace: 'list',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *showUser(payload, { call, put }) {
      const response1 = yield call(queryShowUserInfor, payload);
      yield put({
        type: 'listuserinfor',
        payload: response1.data,
      });
    },
    *fetchHome({ payload }, { call, put }) {
      const response = yield call(queryHome, payload);
      // console.log('res', response.data);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
    *search({ payload }, { call, put }) {
      const response = yield call(searchHome, payload);
      // console.log('res', response.data);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
    *appendFetchHome({ payload }, { call, put }) {
      const response = yield call(queryHome, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
