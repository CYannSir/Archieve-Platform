import { message } from 'antd';
import { queryChatGroup, addChatGroup, deleteChatGroup, searchChatGroup, modifyChatGroup } from '../services/chatgroup';

export default {
  namespace: 'chatgroup',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryChatGroup, payload);
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
      const response = yield call(addChatGroup, payload);
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
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deleteChatGroup, payload);
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
      const response = yield call(searchChatGroup, payload);
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
      const response = yield call(modifyChatGroup, payload);
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
