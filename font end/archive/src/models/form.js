import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm, addAlumniInfor, addPractice } from '../services/api';

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
      yield call(addAlumniInfor, payload);
      message.success('Save success');
      yield put(routerRedux.push('/alumniinformation/alumniinfor'));
    },
    *addPractice({ payload }, { call, put }) {
      yield call(addPractice, payload);
      message.success('Save success');
      yield put(routerRedux.push('/alumniinformation/practice'));
    },
  },

  reducers: {
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
