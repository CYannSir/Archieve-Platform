import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeAccountLogin } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    data: {
      status: undefined,
      type: undefined,
    },
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      // console.log('response==>', response);
      // console.log('response.data==>', response.code);
      if (response.code === 200) {
        yield put({
          type: 'changeLoginStatus',
          payload: response.data,
        });
        // Login successfully
        if (response.data.status === 'ok') {
          reloadAuthorized();
          yield put(routerRedux.push('/'));
        }
      } else if (response.code === 102) {
        message.error('Login Failed', 4);
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
