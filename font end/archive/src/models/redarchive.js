import { message } from 'antd';
import { queryRedArchive, addRedArchive, addRedArchiveByfile, deleteRedArchive, searchRedArchive, modifyRedArchive } from '../services/redarchive';

export default {
  namespace: 'redarchive',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRedArchive, payload);
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
      const response = yield call(addRedArchive, payload);
      const pageSize = 10;
      if (response.code === 200) {
        message.success('新增成功');
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
      } else if (response.code === -1) {
        message.error('矮油~失败了');
      }
      if (callback) callback();
    },
    *addbyfile({ payload, callback }, { call, put }) {
      const response = yield call(addRedArchiveByfile, payload);
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
      const response = yield call(deleteRedArchive, payload);
      const pageSize = 10;
      if (response.code === 200) {
        message.success('删除成功');
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
      } else if (response.code === -1) {
        message.error('矮油~出现了点问题');
      } else if (response.code === 101) {
        message.error('矮油~没有找到这条数据');
      }
      if (callback) callback();
    },
    *search({ payload, callback }, { call, put }) {
      const response = yield call(searchRedArchive, payload);
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
      const response = yield call(modifyRedArchive, payload);
      const pageSize = 10;
      if (response.code === 200) {
        message.success('修改成功');
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
      } else if (response.code === -1) {
        message.error('修改失败咯');
      } else if (response.code === 101) {
        message.error('矮油~没有找到这条数据');
      }
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
