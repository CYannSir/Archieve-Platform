import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Dropdown, Avatar, Divider, Tooltip, Form, Modal, Input } from 'antd';
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
  const { modalVisible, form, handleFeedbackModalVisible, handleAddFeedback } = props;
  const okHandle = () => {
    // console.log('sss', props);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAddFeedback(fieldsValue);
    });
  };
  return (
    <Modal
      title="Feedback"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleFeedbackModalVisible()}
    >
      <FormItem
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        label="Feedback"
      >
        {form.getFieldDecorator('msgContent', {
          rules: [{ required: true, message: 'Please enter feedback information up to 256 words' }],
        })(
          <TextArea placeholder="Please enter feedback information up to 256 words" autosize />
        )}
      </FormItem>
    </Modal>
  );
});
@connect(({ profile, loading }) => ({
  profile,
  loading: loading.models.profile,
}))
export default class GlobalHeader extends PureComponent {
  state = {
    modalVisible: false,
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
  handleFeedbackModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }
  handleAddFeedback = (fields) => {
    // console.log('fields', fields);
    this.props.dispatch({
      type: 'profile/addFeedback',
      payload: {
        msgContent: fields.msgContent,
      },
    });
    // message.success('Feedback successful');
    this.setState({
      modalVisible: false,
    });
  }

  handleUpdateStatus = (fields) => {
    // console.log('fields', fields);
    this.props.dispatch({
      type: 'profile/updateStatus',
      payload: {
        objectId: fields,
      },
    });
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

  render() {
    const {
      currentUser, collapsed, fetchingNotices, isMobile, logo,
      onNoticeVisibleChange, onMenuClick, onNoticeClear,
    } = this.props;
    const { modalVisible } = this.state;
    const parentMethods = {
      handleUpdateStatus: this.handleUpdateStatus,
      handleAddFeedback: this.handleAddFeedback,
      handleFeedbackModalVisible: this.handleFeedbackModalVisible,
    };
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="modify"><Icon type="setting" />Change password</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout" />Log out</Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();

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
              // this.handleModalVisible(true);
              this.handleUpdateStatus(item.id);
              // console.log('aaa', item);
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
        />
      </div>
    );
  }
}
