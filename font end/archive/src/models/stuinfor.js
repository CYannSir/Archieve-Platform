import { queryStuInfor, addStu, addStuByfile, deleteStu, searchStu, modifyStu } from '../services/stuinfor';

export default {
  namespace: 'stuinfor',

  state: {
    code: '',
    data: {
      list: [],
    },
    msg: '',
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryStuInfor, payload);
      yield put({
        type: 'save',
        payload: {
          response,
        },
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addStu, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *addbyfile({ payload, callback }, { call, put }) {
      const response = yield call(addStuByfile, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deleteStu, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *search({ payload, callback }, { call, put }) {
      const response = yield call(searchStu, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *modify({ payload, callback }, { call, put }) {
      const response = yield call(modifyStu, payload);
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
