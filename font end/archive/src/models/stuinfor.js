import { queryStuInfor, addStu, addStuByfile, deleteStu, searchStu, modifyStu } from '../services/stuinfor';

export default {
  namespace: 'stuinfor',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryStuInfor, payload);
      const params = response;
      let dataSource = [...response.data];

      if (params.sorter) {
        const s = params.sorter.split('_');
        dataSource = dataSource.sort((prev, next) => {
          if (s[1] === 'descend') {
            return next[s[0]] - prev[s[0]];
          }
          return prev[s[0]] - next[s[0]];
        });
      }

      if (params.redParty) {
        const redParty = params.redParty.split(',');
        let filterDataSource = [];
        redParty.forEach((s) => {
          filterDataSource = filterDataSource.concat(
            [...dataSource].filter(data => parseInt(data.redParty, 10) === parseInt(s[0], 10))
          );
        });
        dataSource = filterDataSource;
      }

      if (params.delTime) {
        dataSource = dataSource.filter(data => data.delTime === null);
      }

      let pageSize = 10;
      if (params.pageSize) {
        pageSize = params.pageSize * 1;
      }

      yield put({
        type: 'save',
        payload: {
          list: dataSource,
          pagination: {
            total: dataSource.length,
            pageSize,
            current: parseInt(params.currentPage, 10) || 1,
          },
        },
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addStu, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *addbyfile({ payload, callback }, { call, put }) {
      const response = yield call(addStuByfile, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deleteStu, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *search({ payload, callback }, { call, put }) {
      const response = yield call(searchStu, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *modify({ payload, callback }, { call, put }) {
      const response = yield call(modifyStu, payload);
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
