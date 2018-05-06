import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Alert, Form, Modal, Input, message } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';

const { UserName, Password, Submit } = Login;
const FormItem = Form.Item;
const CreateForm = Form.create()((props) => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="Forget Password"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        label="Your email"
      >
        {form.getFieldDecorator('LoginEmail', {
          rules: [{ required: true, message: 'Enter Your Email' }],
        })(
          <Input placeholder="Enter Your Email" />
        )}
      </FormItem>
    </Modal>
  );
});
@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    modalVisible: false,
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }
  handleAdd = (fields) => {
    this.props.dispatch({
      type: 'login/forgetPsw',
      payload: {
        loginEmail: fields.loginEmail,
      },
    });

    message.success('Success');
    this.setState({
      modalVisible: false,
    });
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
    const { login, login: { data }, submitting } = this.props;
    const { type, modalVisible } = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          <div>
            {
              data.status === 'error' &&
              data.type === 'account' &&
              !login.submitting &&
              this.renderMessage('Please correct your account or passwords !')
            }
            <UserName name="loginEmail" placeholder="Please enter your E-mail" />
            <Password name="loginPsw" placeholder="Please enter your passwords" />
          </div>

          <div>
            <a style={{ float: 'right' }} onClick={() => this.handleModalVisible(true)}>Forgot Password?</a>
            <Link className={styles.register} to="/user/register">Create Account</Link>
          </div>
          <Submit loading={submitting}>Sign in</Submit>
        </Login>
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
        />
      </div>
    );
  }
}
