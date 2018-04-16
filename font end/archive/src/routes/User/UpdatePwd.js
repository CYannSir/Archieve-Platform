import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Popover, Progress } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './UpdatePwd.less';

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
export default class UpdatePwd extends Component {
  state = {
    confirmDirty: false,
    visible: false,
    help: '',
  };


  componentWillUnmount() {
    clearInterval(this.interval);
  }


  /**
   * 判断密码强度
   */
  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
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

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
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
    const value = form.getFieldValue('password');
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
    return (
      <PageHeaderLayout
        title="Account"
        logo={<img alt="Archive" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
      >
        <div className={styles.main}>
          <h3>Create your personal account</h3>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('pwd', {
              rules: [
                {
                  required: true,
                  message: 'Please enter your old password',
                },
                {
                  type: 'mail',
                  message: 'Please enter your old password',
                },
              ],
            })(<Input size="large" placeholder="Please enter your old password" />)}
            </FormItem>
            <FormItem help={this.state.help}>
              <Popover
                content={
                  <div style={{ padding: '4px 0' }}>
                    {passwordStatusMap[this.getPasswordStatus()]}
                    {this.renderPasswordProgress()}
                    <div style={{ marginTop: 10 }}>
                    Please enter at least 6 characters, Do not use passwords that are easy to guess.
                    </div>
                  </div>
              }
                overlayStyle={{ width: 320 }}
                placement="right"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
              >
                {getFieldDecorator('newpassword', {
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
              {getFieldDecorator('confirmpwd', {
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
            </FormItem>
          </Form>
        </div>
      </PageHeaderLayout>
    );
  }
}