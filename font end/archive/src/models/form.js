import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm, addAlumniInfor, addPractice, updatePsw } from '../services/api';

export default {
  namespace: 'form',

  state: {
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
  },

  effects: {
    *updatePsw({ payload }, { call, put }) {
      const response = yield call(updatePsw, payload);
      // console.log('res', response.code);
      if (response.code === 105) {
        message.error('Invalid passwords', 4);
        // yield put(routerRedux.push('/user/register'));
      } else if (response.code === 101) {
        message.error('Invalid user', 4);
        yield put(routerRedux.push('/modifypwd'));
      } else if (response.code === 200) {
        message.success('Success', 4);
        yield put({
          type: 'updatepsw',
          payload: response.data,
        });
        yield put(routerRedux.push('/home'));
      }
    },
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('Save success');
    },
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/form/step-form/result'));
    },
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *addAlumniInfor({ payload }, { call, put }) {
      const res = yield call(addAlumniInfor, payload);
      if (res.code === 200) {
        message.success('Save success');
        yield put(routerRedux.push('/alumniinformation/alumniinfor'));
      } else if (res.code === 112) {
        message.error('Start Date is later than End Date');
      }
    },
    *addPractice({ payload }, { call, put }) {
      const res = yield call(addPractice, payload);
      if (res.code === 200) {
        message.success('Save success');
        yield put(routerRedux.push('/alumniinformation/practice'));
      } else if (res.code === 112) {
        message.error('Start Date is later than End Date');
      }
    },
  },

  reducers: {
    updatepsw(state, { payload }) {
      // console.log('type', payload.data);
      // console.log('status', payload);
      // setAuthority(payload.data.type);
      // reloadAuthorized();
      return {
        ...state.data,
        status: payload.status,
      };
    },
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
  },
};
