import React, { Fragment } from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/Archive Book.svg';
import { getRoutes } from '../utils/utils';

const links = [{
  key: 'help',
  title: 'Help',
  href: '',
}, {
  key: 'privacy',
  title: 'Privacy',
  href: '',
}, {
  key: 'terms',
  title: 'Terms',
  href: '',
}];

const copyright = <Fragment>Copyright <Icon type="copyright" /> 2018 浙江大学城市学院-计算机与计算科学学院</Fragment>;

class UserLayout extends React.PureComponent {
  /**
   * 获取网页标签名称
   */
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'ArchiveBook';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - ArchiveBook`;
    }
    return title;
  }
  render() {
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>ArchiveBook</span>
                </Link>
              </div>
              <div className={styles.desc}>To find your archive and your friends</div>
            </div>
            <Switch>
              {getRoutes(match.path, routerData).map(item =>
                (
                  <Route
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                  />
                )
              )}
              <Redirect exact from="/user" to="/user/login" />
            </Switch>
          </div>
          <GlobalFooter links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
