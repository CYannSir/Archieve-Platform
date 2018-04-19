import { queryPractice, addPractice, deletePractice, searchPractice, modifyPractice } from '../services/practice';

export default {
  namespace: 'practice',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryPractice, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addPractice, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deletePractice, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *search({ payload, callback }, { call, put }) {
      const response = yield call(searchPractice, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *modify({ payload, callback }, { call, put }) {
      const response = yield call(modifyPractice, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
