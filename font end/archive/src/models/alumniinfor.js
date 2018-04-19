import { queryAlumniInfor, addAlumniInfor, deleteAlumniInfor, searchAlumniInfor, modifyAlumniInfor } from '../services/alumniinfor';

export default {
  namespace: 'alumniinfor',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAlumniInfor, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addAlumniInfor, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deleteAlumniInfor, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *search({ payload, callback }, { call, put }) {
      const response = yield call(searchAlumniInfor, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *modify({ payload, callback }, { call, put }) {
      const response = yield call(modifyAlumniInfor, payload);
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
