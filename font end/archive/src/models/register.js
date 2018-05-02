import { sendEmail, register } from '../services/api';
// import { setAuthority } from '../utils/authority';
// import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'register',

  state: {
    data: {
      status: undefined,
    },
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(register, payload);
      yield put({
        type: 'registerHandle',
        payload: response.data,
      });
    },
    *sendmail({ payload }, { call, put }) {
      const response = yield call(sendEmail, payload);
      yield put({
        type: 'registersendmail',
        payload: response.data,
      });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      // console.log('type', payload.data);
      // console.log('status', payload);
      // setAuthority(payload.data.type);
      // reloadAuthorized();
      return {
        ...state.data,
        status: payload.status,
      };
    },
    registersendmail(state, { payload }) {
      return {
        ...state,
        payload,
      };
    },
  },
};
