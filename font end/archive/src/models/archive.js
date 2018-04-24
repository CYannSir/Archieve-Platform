import { queryArchive, addArchive, addArchiveByfile, deleteArchive, searchArchive, modifyArchive } from '../services/archive';

export default {
  namespace: 'archive',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryArchive, payload);
      const pageSize = 10;

      yield put({
        type: 'save',
        payload: {
          response,
          list: response.data,
          pagination: {
            total: response.data.length,
            pageSize,
            current: parseInt(response.data.currentPage, 10) || 1,
          },
        },
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addArchive, payload);
      const pageSize = 10;
      yield put({
        type: 'save',
        payload: {
          response,
          list: response.data,
          pagination: {
            total: response.data.length,
            pageSize,
            current: parseInt(response.data.currentPage, 10) || 1,
          },
        },
      });
      if (callback) callback();
    },
    *addbyfile({ payload, callback }, { call, put }) {
      const response = yield call(addArchiveByfile, payload);
      const pageSize = 10;
      yield put({
        type: 'save',
        payload: {
          response,
          list: response.data,
          pagination: {
            total: response.data.length,
            pageSize,
            current: parseInt(response.data.currentPage, 10) || 1,
          },

        },
      });
      if (callback) callback();
    },
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deleteArchive, payload);
      const pageSize = 10;
      yield put({
        type: 'save',
        payload: {
          response,
          list: response.data,
          pagination: {
            total: response.data.length,
            pageSize,
            current: parseInt(response.data.currentPage, 10) || 1,
          },

        },
      });
      if (callback) callback();
    },
    *search({ payload, callback }, { call, put }) {
      const response = yield call(searchArchive, payload);
      const pageSize = 10;
      yield put({
        type: 'save',
        payload: {
          response,
          list: response.data,
          pagination: {
            total: response.data.length,
            pageSize,
            current: parseInt(response.data.currentPage, 10) || 1,
          },

        },
      });
      if (callback) callback();
    },
    *modify({ payload, callback }, { call, put }) {
      const response = yield call(modifyArchive, payload);
      const pageSize = 10;
      yield put({
        type: 'save',
        payload: {
          response,
          list: response.data,
          pagination: {
            total: response.data.length,
            pageSize,
            current: parseInt(response.data.currentPage, 10) || 1,
          },

        },
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
