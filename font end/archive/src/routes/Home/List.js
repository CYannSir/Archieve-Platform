import React, { Component } from 'react';
import { Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Input, Icon } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import NotFound from '../../routes/Exception/404';
import { getRoutes } from '../../utils/utils';

@connect()
export default class SearchList extends Component {
  render() {
    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="Please enter the name or class"
          enterButton={<Icon type="search" />}
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ width: 522 }}
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
          {/* 默认生成的路由列表，不包含 /list/search/projects */}
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
          {/* 补充 /list/search/projects 的路由 */}
          <Route exact path="/home" component={routerData['/home/homepage'].component} />
          <Route render={NotFound} />
        </Switch>
      </PageHeaderLayout>
    );
  }
}
