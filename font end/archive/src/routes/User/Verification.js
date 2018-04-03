import React, { Component } from 'react';
// import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Button, Row, Col, Popover } from 'antd';
import styles from './Verification.less';

const FormItem = Form.Item;

@Form.create()
export default class Verification extends Component {
  state = {
    count: 0,
    visible: false,
    help: '',
  };

  componentWillReceiveProps(nextProps) {
    const account = this.props.form.getFieldValue('mail');
    if (nextProps.register.status === 'ok') {
      this.props.dispatch(routerRedux.push({
        pathname: '/user/register-result',
        state: {
          account,
        },
      }));
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'register/submit',
          payload: {
            ...values,
            prefix: this.state.prefix,
          },
        });
      }
    });
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
            {getFieldDecorator('mail', {
              rules: [
                {
                  required: true,
                  message: 'Please enter your E-mail',
                },
                {
                  type: 'email',
                  message: 'Please enter a real E-mail',
                },
              ],
            })(<Input size="large" placeholder="Please enter your E-mail" />)}
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('captcha', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter the verification code',
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
                  {count ? `${count} s` : 'Get Code'}
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem help={this.state.help}>
            <Popover
              content={
                <div style={{ padding: '4px 0' }}>
                  {this.renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    Please enter at least 6 characters, Do not use passwords that are easy to guess.
                  </div>
                </div>
              }
              overlayStyle={{ width: 320 }}
              placement="right"
              visible={this.state.visible}
            >
              {getFieldDecorator('password', {
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
            })(<Input size="large" type="password" placeholder="Confirm" />)}
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              NEXT
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
