import React, { Component } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Input, Icon } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getRoutes } from '../../utils/utils';

@connect()
export default class SearchList extends Component {
  /**
   *  Tab 切换
   */
  handleTabChange = (key) => {
    const { dispatch, match } = this.props;
    switch (key) {
      case 'articles':
        dispatch(routerRedux.push(`${match.url}/articles`));
        break;
      case 'applications':
        dispatch(routerRedux.push(`${match.url}/applications`));
        break;
      case 'projects':
        dispatch(routerRedux.push(`${match.url}/projects`));
        break;
      default:
        break;
    }
  }

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
    const routes = getRoutes(match.path, routerData);

    return (
      <PageHeaderLayout
        style={{ textAlign: 'center' }}
        title={<h1 style={{ textAlign: 'center' }}>Find He or She</h1>}
        content={mainSearch}
        tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
      >
        <Switch>
          {
            routes.map(item =>
              (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              )
            )
          }
        </Switch>
      </PageHeaderLayout>
    );
  }
}
