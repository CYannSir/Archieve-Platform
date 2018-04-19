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
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addChatGroup, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deleteChatGroup, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *search({ payload, callback }, { call, put }) {
      const response = yield call(searchChatGroup, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *modify({ payload, callback }, { call, put }) {
      const response = yield call(modifyChatGroup, payload);
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
