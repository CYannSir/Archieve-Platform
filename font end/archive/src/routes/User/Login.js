import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Alert } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';

const { UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
  }

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  }
  /**
 * 报错信息显示
 */
  renderMessage = (content) => {
    return (
      <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );
  }
  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          <div>
            {
              login.status === 'error' &&
              login.type === 'account' &&
              !login.submitting &&
              this.renderMessage('Please correct your account or passwords !')
            }
            <UserName name="userName" placeholder="Please enter your E-mail" />
            <Password name="password" placeholder="Please enter your passwords" />
          </div>

          <div>
            <a style={{ float: 'right' }} href="">Forgot Password?</a>
            <Link className={styles.register} to="/user/register">Create Account</Link>
          </div>
          <Submit loading={submitting}>Sign in</Submit>
        </Login>
      </div>
    );
  }
}
