import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Button, Popover, Progress, Tooltip, Row, Col } from 'antd';
import styles from './Register.less';

const FormItem = Form.Item;


const passwordStatusMap = {
  ok: <div className={styles.success}>Strength: Strong</div>,
  pass: <div className={styles.warning}>Strength: Middle</div>,
  poor: <div className={styles.error}>Strength: Weak</div>,
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit'],
}))
@Form.create()
export default class Register extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
  };

  componentWillReceiveProps(nextProps) {
    const loginEmail = this.props.form.getFieldValue('loginEmail');
    // console.log('status', nextProps.register.status);
    if (nextProps.register.status === 'ok') {
      this.props.dispatch(routerRedux.push({
        pathname: '/user/register-result',
        state: {
          loginEmail,
        },
      }));
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    const account = this.props.form.getFieldValue('loginEmail');
    // console.log('ss==>', account);
    this.props.dispatch({
      type: 'register/sendmail',
      payload: {
        loginEmail: account,
      },
    });
    let count = 179;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };
  /**
   * 判断密码强度
   */
  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('loginPsw');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'register/submit',
          payload: {
            ...values,
          },
        });
      }
    });
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  }
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('loginPsw')) {
      callback('The password entered twice does not match!');
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    if (!value) {
      this.setState({
        help: 'Please enter your password',
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (!this.state.visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };


  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('loginPsw');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };


  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { count } = this.state;
    return (
      <div className={styles.main}>
        <h3>Create your personal account</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('loginEmail', {
              rules: [
                {
                  required: true,
                  message: 'Please enter your E-mail',
                },
                {
                  type: 'email',
                  message: 'Error email address',
                },
              ],
            })(<Input size="large" placeholder="Please enter your E-mail" />)}
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('activeCode', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter code',
                    },
                  ],
                })(<Input size="large" placeholder="Verification code" />)}
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={count}
                  className={styles.getCaptcha}
                  onClick={this.onGetCaptcha}
                >
                  {count ? `${count} s` : 'Send'}
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem help={this.state.help}>
            <Popover
              content={
                <div style={{ padding: '4px 0' }}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    Please enter at least 6 characters, Do not use passwords that are easy to guess.
                    Click to hide.
                  </div>
                </div>
              }
              overlayStyle={{ width: 240 }}
              placement="right"
              trigger="focus"
              visible={this.state.visible}
              onVisibleChange={this.handleVisibleChange}
            >
              {getFieldDecorator('loginPsw', {
                rules: [
                  {
                    validator: this.checkPassword,
                  },
                ],
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder="At least 6 passwords"
                />
              )}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password',
                },
                {
                  validator: this.checkConfirm,
                },
              ],
            })(<Input size="large" type="password" placeholder="Confirm the password" />)}
          </FormItem>
          <Tooltip placement="right" title={<span>Archive Book Team | Archive Book Team will not reveal your information</span>}>
            <h3>Verification and Information</h3>
          </Tooltip>
          <FormItem>
            {getFieldDecorator('stuName', {
              rules: [
                {
                  required: true,
                  message: 'Please enter your Real name',
                },
              ],
            })(<Input size="large" placeholder="Please enter your Real name" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('stuNumber', {
              rules: [
                {
                  required: true,
                  message: 'Please enter your ID in collage',
                },
              ],
            })(<Input size="large" placeholder="Please enter your ID in collage" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('mobilePhone', {
              rules: [
                {
                  required: true,
                  message: 'Please enter your mobile phone',
                },
                {
                    pattern: /^1\d{10}$/,
                    message: 'Please enter 11 number',
                },
              ],
            })(<Input size="large" placeholder="Please enter your mobile phone" />)}
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
            <Link className={styles.login} to="/user/login">
              Use existing account login
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}
