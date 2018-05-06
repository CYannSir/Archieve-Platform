import { message } from 'antd';
import { routerRedux } from 'dva/router';
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
      // console.log('res', response.code);
      if (response.code === 109) {
        message.error('Invalid verification code', 4);
        yield put(routerRedux.push('/user/register'));
      } else if (response.code === 108) {
        message.error('Real-name authentication failed', 4);
        yield put(routerRedux.push('/user/register'));
      } else {
        message.success('Success', 4);
        yield put({
          type: 'registerHandle',
          payload: response.data,
        });
      }
    },
    *sendmail({ payload }, { call, put }) {
      const response = yield call(sendEmail, payload);
      // console.log('res', response.code === 107);
      if (response.code === 107) {
        message.error('The Email registered', 4);
      } else {
        message.success('Success', 4);
        yield put({
          type: 'registersendmail',
          payload: response.data,
        });
      }
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
