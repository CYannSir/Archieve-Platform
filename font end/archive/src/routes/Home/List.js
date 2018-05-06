import React, { Component } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Input, Icon } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import NotFound from '../../routes/Exception/404';
import { getRoutes } from '../../utils/utils';

const getWindowWidth = () => (window.innerWidth || document.documentElement.clientWidth);

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
export default class SearchList extends Component {
  state = {
    width: { width: '100%' },
  }
  componentDidMount() {
    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
    this.setStepDirection.cancel();
  }
  @Bind()
  @Debounce(200)
  setStepDirection() {
    const { width } = this.state;
    const w = getWindowWidth();
    if (width !== { width: '100%' } && w <= 576) {
      this.setState({
        width: { width: '100%' },
      });
    } else if (width !== { width: 522 } && w > 576) {
      this.setState({
        width: { width: 522 },
      });
    }
  }
  handleFormSubmit = (value) => {
    const { dispatch } = this.props;
    // setTimeout 用于保证获取表单值是在所有表单字段更新完毕的时候
    // console.log('value', value);
    setTimeout(() => {
      // console.log('fileds-->', fieldsValue);
      dispatch({
        type: 'list/search',
        payload: value,
      });
    }, 0);
  }

  render() {
    const { width } = this.state;
    console.log('width', width);
    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="Please enter the name or class"
          enterButton={<Icon type="search" />}
          size="large"
          onSearch={value => this.handleFormSubmit(value)}
          style={width}
        />
      </div>
    );

    const { match, routerData, location } = this.props;

    return (
      <PageHeaderLayout
        style={{ textAlign: 'center' }}
        title={<h1 style={{ textAlign: 'center' }}>Find He or She</h1>}
        content={mainSearch}
        tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
      >
        <Switch>
          {
        getRoutes(match.path, routerData).map(item => (
          <Route
            key={item.key}
            path={item.path}
            component={item.component}
            exact={item.exact}
          />
        ))
      }
          <Route exact path="/home" component={routerData['/home/homepage'].component} />
          <Route render={NotFound} />
        </Switch>
      </PageHeaderLayout>
    );
  }
}
