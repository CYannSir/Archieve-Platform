import { routerRedux } from 'dva/router';
import { queryFakeList, queryHome, searchHome } from '../services/api';

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
    *fetchHome({ payload }, { call, put }) {
      const response = yield call(queryHome, payload);
      // console.log('res', response.data);
      if (response.code === 200) {
        yield put({
          type: 'queryList',
          payload: Array.isArray(response.data) ? response.data : [],
        });
      } else if (response.code === 100) {
        yield put(routerRedux.push('/user/login'));
      }
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
