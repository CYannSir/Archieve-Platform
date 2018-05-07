import { message } from 'antd';
import { queryUserInfor, addUser, deleteUser, searchUser, modifyUser, resetUserPwd } from '../services/userinfor';

export default {
  namespace: 'userinfor',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUserInfor, payload);

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
      const response = yield call(addUser, payload);
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
    *resetuserpwd({ payload, callback }, { call, put }) {
      const response = yield call(resetUserPwd, payload);
      const pageSize = 10;
      if (response.code === 200) {
        message.success('已发送邮件重置密码');
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
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deleteUser, payload);
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
      const response = yield call(searchUser, payload);
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
      const response = yield call(modifyUser, payload);
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
