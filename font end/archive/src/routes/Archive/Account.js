import React, { PureComponent, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import moment from 'moment';
import { Icon, Steps, Card, Button, Modal, Form, Input, DatePicker, List } from 'antd';
import DescriptionList from 'components/DescriptionList';
import classNames from 'classnames';
import styles from './Account.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { Step } = Steps;
const { Description } = DescriptionList;
const getWindowWidth = () => (window.innerWidth || document.documentElement.clientWidth);

const CreateForm = Form.create()((props) => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
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
  return (
    <Modal
      title="新建个人户口"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        {...formItemLayout}
        label="学生学号"
      >
        {form.getFieldDecorator('stuNumber', {
          rules: [{ required: true, message: '请输入学生学号' }],
        })(
          <Input placeholder="请输入学生学号" />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="户口目前地址"
      >
        {form.getFieldDecorator('accountAddress', {
          rules: [{ required: true, message: '请输入户口' }],
        })(
          <Input placeholder="请输入户口" />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="更改时间"
      >
        {form.getFieldDecorator('accountDate', {
          rules: [{ required: true, message: '请输入更改时间' }],
        })(
          <DatePicker placeholder="请输入更改时间" style={{ width: '100%' }} />
        )}
      </FormItem>
    </Modal>
  );
});


@connect(({ profile, loading }) => ({
  profile,
  loading: loading.models.profile,
}))

export default class Account extends PureComponent {
  state = {
    modalVisible: false,
    stepDirection: 'horizontal',
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchUserInfor',
    });
    dispatch({
      type: 'profile/fetchAccount',
      flag: true,
    });

    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
    this.setStepDirection.cancel();
  }
  @Bind()
  @Debounce(200)
  setStepDirection() {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  }
  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }
  handleAdd = (fields) => {
    this.props.dispatch({
      type: 'profile/addAccount',
      payload: {
        stuNumber: fields.stuNumber,
        accountAddress: fields.accountAddress,
        accountDate: moment(fields.accountDate).format('YYYY-MM-DD'),
      },
    });

    // message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    const { stepDirection } = this.state;
    const { profile: { data }, profile: { accountdata }, loading } = this.props;
    const { modalVisible } = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    // console.log('data==>', data);
    // console.log('accountdata==>', accountdata[0].accountAddress);
    const CardInfor = ({ accountAddress, accountDate }) => (
      <Card title="Current Account" bordered={false}>
        <DescriptionList style={{ marginBottom: 24 }}>
          <Description term="Account">{accountAddress}</Description>
          <Description term="Update Date">{moment(accountDate).format('YYYY-MM-DD')}</Description>
        </DescriptionList>
      </Card>
    );
    const description = (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="Name">{ data ? data.stuName : '' }</Description>
        <Description term="Numeber ID">{ data ? data.stuNumber : '' }</Description>
        <Description term="Phone Number">{ data ? data.currentPhone : '' }</Description>
        <Description term="E-mail">{ data ? data.currentEmail : '' }</Description>
        <Description term="Class Belong">{ data ? data.stuMajor : '' }</Description>
        <Description term="Graduated Year">{ data ? data.stuEndYear : ''}</Description>
      </DescriptionList>
    );

    const desc1 = (
      <div className={classNames(styles.textSecondary, styles.stepDescription)}>
        <Fragment>
          {accountdata[0] ? accountdata[0].accountAddress : ''}
          <Icon href="https://map.baidu.com/" type="environment-o" style={{ marginLeft: 8 }} />
        </Fragment>
        <div>{ accountdata[0] ? moment(accountdata[0].accountDate).format('YYYY-MM-DD') : '' }</div>
      </div>
    );

    const desc2 = (
      <div className={styles.stepDescription}>
        <Fragment>
          {accountdata[1] ? accountdata[1].accountAddress : ''}
          <Icon href="https://map.baidu.com/" type="environment-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
        </Fragment>
        <div>{ accountdata[1] ? moment(accountdata[1].accountDate).format('YYYY-MM-DD') : '' }</div>
      </div>
    );

    return (
      <PageHeaderLayout
        title="Account"
        logo={<img alt="Archive" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
        content={description}
      >
        <List
          loading={loading}
          split={false}
          locale={{ emptyText: 'Empty!' }}
          dataSource={accountdata}
          renderItem={item => (
            <List.Item>
              <CardInfor
                accountAddress={item ? item.accountAddress : ''}
                accountDate={item ? item.accountDate : ''}
              />
            </List.Item>
            )}
        />
        <Card loading={loading} style={{ marginBottom: 24 }} bordered={false}>
          <Button style={{ width: '100%' }} type="dashed" size="large" onClick={() => this.handleModalVisible(true)} icon="plus">New</Button>
        </Card>
        <Card loading={loading} title="Account" style={{ marginBottom: 24 }} bordered={false}>
          <Steps direction={stepDirection} progressDot current={accountdata ? accountdata.length - 1 : ''}>
            <Step title="Level 1" description={desc1} />
            <Step title="Level 2" description={desc2} />
          </Steps>
        </Card>
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
        />
      </PageHeaderLayout>
    );
  }
}
