import { queryAlumniInfor, addAlumniInfor, exportAlumniInfor, deleteAlumniInfor, searchAlumniInfor, modifyAlumniInfor } from '../services/alumniinfor';

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
      const response = yield call(addAlumniInfor, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deleteAlumniInfor, payload);
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
      const response = yield call(searchAlumniInfor, payload);
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
      yield call(exportAlumniInfor);
      // let myDate = new Date();
      // console.log(response.data);
      const date = new Date();
      const year = date.getFullYear(); // 获取当前年份
      const mon = date.getMonth() + 1; // 获取当前月份
      const day = date.getDate(); // 获取当前日
      const h = date.getHours(); // 获取小时
      const m = date.getMinutes(); // 获取分钟
      window.location.href = `http://localhost:8080/ExportInformation${year}${mon}${day}${h}${m}.xls`;
      if (callback) callback();
    },
    *modify({ payload, callback }, { call, put }) {
      const response = yield call(modifyAlumniInfor, payload);
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
