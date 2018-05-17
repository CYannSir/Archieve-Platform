import { queryPractice, addPractice, exportPractice, deletePractice, searchPractice, modifyPractice } from '../services/practice';

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
      const response = yield call(addPractice, payload);
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
      const response = yield call(deletePractice, payload);
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
      const response = yield call(searchPractice, payload);
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
    *export({ callback }, { call }) {
      yield call(exportPractice);
      const date = new Date();
      const year = date.getFullYear(); // 获取当前年份
      const mon = date.getMonth() + 1; // 获取当前月份
      const day = date.getDate(); // 获取当前日
      const h = date.getHours(); // 获取小时
      const m = date.getMinutes(); // 获取分钟
      window.location.href = `http://localhost:8081/ExportPractice${year}${mon}${day}${h}${m}.xls`;
      if (callback) callback();
    },
    *modify({ payload, callback }, { call, put }) {
      const response = yield call(modifyPractice, payload);
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
