import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Dropdown, Avatar, Divider, message, Tooltip, Form, Modal, Input, Button } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import { connect } from 'dva';
import NoticeIcon from '../NoticeIcon';
import styles from './index.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const CreateForm = Form.create()((props) => {
  const { modalVisible, form, handleAdd, handleModalVisible, handleAddFeedback, formprops } = props;
  if (formprops === true) {
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleAdd(fieldsValue);
      });
    };
    return (
      <Modal
        title="Feedback"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
        footer={[
          <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
          <Button key="submit" type="primary" onClick={this.handleOk}>
              Send
          </Button>,
          ]}
      >
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="Feedback"
        >
          {form.getFieldDecorator('number', {
          rules: [{ required: true, message: 'Please enter feedback information up to 256 words' }],
        })(
          <TextArea placeholder="Please enter feedback information up to 256 words" autosize />
        )}
        </FormItem>
      </Modal>
    );
  } else {
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleAddFeedback(fieldsValue);
      });
    };
    return (
      <Modal
        style={{ 'z-index': 99999 }}
        title="Message"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
        footer={[
          <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
          <Button key="submit" type="primary" onClick={this.handleOk}>
              Send
          </Button>,
          ]}
      >
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="Reply"
        >
          {form.getFieldDecorator('replyWords', {
          rules: [{ required: true, message: 'Please enter message up to 256 words' }],
        })(
          <TextArea placeholder="Please enter message up to 256 words" autosize />
        )}
        </FormItem>
      </Modal>
    );
  }
});
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
export default class GlobalHeader extends PureComponent {
  state = {
    modalVisible: false,
    formprops: false,
  };

  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map((notice) => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }
  // 侧边栏动作控制
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  }
  @Debounce(600)
  triggerResizeEvent() { // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  handleModalVisible = (flag) => {
    this.setState({
      formprops: !flag,
      modalVisible: !!flag,
    });
  }
  handleFeedbackModalVisible = (flag) => {
    this.setState({
      formprops: !!flag,
      modalVisible: !!flag,
    });
  }
  handleAdd = () => {
    this.props.dispatch({
      type: 'rule/add',
    });

    message.success('Reply successful');
    this.setState({
      modalVisible: false,
    });
  }
  handleAddFeedback = () => {
    this.props.dispatch({
      type: 'rule/delete',
    });

    message.success('Feedback successful');
    this.setState({
      modalVisible: false,
      formprops: false,
    });
  }
  render() {
    const {
      currentUser, collapsed, fetchingNotices, isMobile, logo,
      onNoticeVisibleChange, onMenuClick, onNoticeClear,
    } = this.props;
    const { modalVisible, formprops } = this.state;

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="modify"><Icon type="setting" />Change password</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout" />Log out</Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleAddFeedback: this.handleAddFeedback,
      handleModalVisible: this.handleModalVisible,
      handleFeedbackModalVisible: this.handleFeedbackModalVisible,
    };
    return (
      <div className={styles.header}>
        {isMobile && (
          [
            (
              <Link to="/" className={styles.logo} key="logo">
                <img src={logo} alt="logo" width="32" />
              </Link>
            ),
            <Divider type="vertical" key="line" />,
          ]
        )}
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div className={styles.right}>
          <Tooltip title="Feedback" onClick={() => this.handleFeedbackModalVisible(true)}>
            <a
              className={styles.action}
            >
              <Icon type="smile-o" />
            </a >
          </Tooltip>
          <NoticeIcon
            className={styles.action}
            count={currentUser ? currentUser.notifyCount : ''}
            onItemClick={(item, tabProps) => {
              this.handleModalVisible(true);
              console.log(item, tabProps); // eslint-disable-line
            }}
            onClear={onNoticeClear}
            onPopupVisibleChange={onNoticeVisibleChange}
            loading={fetchingNotices}
            popupAlign={{ offset: [20, -16] }}
          >
            <NoticeIcon.Tab
              list={noticeData ? noticeData['消息'] : ''}
              title="Notice"
              emptyText="Empty"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
            />
            <NoticeIcon.Tab
              list={noticeData['通知']}
              title="Board"
              emptyText="Checked all"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            />
          </NoticeIcon>
          {currentUser.name ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
                <span className={styles.name}>{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : <Spin size="small" style={{ marginLeft: 8 }} />}
        </div>
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
          formprops={formprops}
        />
      </div>
    );
  }
}
