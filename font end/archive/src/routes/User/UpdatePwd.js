import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Card, Popover, Progress } from 'antd';
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

@connect(({ loading }) => ({
  submitting: loading.effects['form/updatePsw'],
}))
@Form.create()
export default class UpdatePwd extends PureComponent {
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
    this.props.form.validateFieldsAndScroll((err, values) => {
      // console.log('value', values);
      if (!err) {
        this.props.dispatch({
          type: 'form/updatePsw',
          payload: {
            ...values,
          },
        });
      }
    });
  }

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }

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
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };


    return (
      <PageHeaderLayout title="Change Your Passwords" >
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="Your previous password"
            >
              {getFieldDecorator('loginPsw', {
                rules: [{
                  required: true, message: 'Please enter your previous password',
                }],
              })(
                <Input size="large" type="password" placeholder="Please enter your previous password" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Your new password"
              help={this.state.help}
            >
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
                overlayStyle={{ width: 240 }}
                placement="right"
                trigger="focus"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
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
            <FormItem
              {...formItemLayout}
              label="Comfir your new password"
            >
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
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Save
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
