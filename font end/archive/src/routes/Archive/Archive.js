import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import moment from 'moment';
import { Icon, Steps, Card, Button, Modal, Form, Input, DatePicker, List } from 'antd';
import classNames from 'classnames';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Archive.less';

const FormItem = Form.Item;
const { Step } = Steps;
const { Description } = DescriptionList;
const getWindowWidth = () => (window.innerWidth || document.documentElement.clientWidth);

/*
const popoverContent = (
  <div style={{ width: 160 }}>
    吴加号
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>未响应</span>} />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>耗时：2小时25分钟</div>
  </div>
);

const customDot = (dot, { status }) => (status === 'process' ? (
  <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
    {dot}
  </Popover>
) : dot);
*/
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
      title="新建个人档案"
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
        label="档案目前单位"
      >
        {form.getFieldDecorator('unit', {
          rules: [{ required: true, message: '请输入档案目前单位' }],
        })(
          <Input placeholder="请输入目前单位" />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="档案单位地址"
      >
        {form.getFieldDecorator('unitAddress', {
          rules: [{ required: true, message: '请输入档案单位地址' }],
        })(
          <Input placeholder="请输入档案单位地址" />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="流向时间"
      >
        {form.getFieldDecorator('flowDate', {
          rules: [{ required: true, message: '请输入流向时间' }],
        })(
          <DatePicker placeholder="请输入流向时间" style={{ width: '100%' }} />
        )}
      </FormItem>
    </Modal>
  );
});
@connect(({ profile, loading }) => ({
  profile,
  loading: loading.models.profile,
}))
export default class Archive extends Component {
  state = {
    flag: false,
    modalVisible: false,
    stepDirection: 'horizontal',
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchUserInfor',
    });
    dispatch({
      type: 'profile/fetchArchive',
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
      type: 'profile/addArchive',
      payload: {
        stuNumber: fields.stuNumber,
        unit: fields.unit,
        unitAddress: fields.unitAddress,
        flowDate: moment(fields.flowDate).format('YYYY-MM-DD'),
      },
    });

    // message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    const { stepDirection } = this.state;
    const { modalVisible, flag } = this.state;
    const { profile: { data }, profile: { archivedata } } = this.props;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    // console.log('archivedata-->', archivedata);
    const CardInfor = ({ unit, unitAddress, flowDate }) => (
      <Card title={`Current Archive Flow--${unit}`} hoverable bordered={false}>
        <DescriptionList >
          <Description term="Preservation Unit">{unit}</Description>
          <Description term="Address">{unitAddress}</Description>
          <Description term="Flow Date">{moment(flowDate).format('YYYY-MM-DD')}</Description>
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
          {archivedata[0] ? archivedata[0].unitAddress : ''}
          <Icon href="https://map.baidu.com/" type="environment-o" style={{ marginLeft: 8 }} />
        </Fragment>
        <div>{archivedata[0] ? moment(archivedata[0].flowDate).format('YYYY-MM-DD') : ''}</div>
      </div>
    );

    const desc2 = (
      <div className={styles.stepDescription}>
        <Fragment>
          {archivedata[1] ? archivedata[1].unitAddress : ''}
          <Icon href="https://map.baidu.com/" type="environment-o" style={{ marginLeft: 8 }} />
        </Fragment>
        <div>{archivedata[1] ? moment(archivedata[1].flowDate).format('YYYY-MM-DD') : ''}</div>
      </div>
    );

    const desc3 = (
      <div className={styles.stepDescription}>
        <Fragment>
          {archivedata[2] ? archivedata[2].unitAddress : ''}
          <Icon href="https://map.baidu.com/" type="environment-o" style={{ marginLeft: 8 }} />
        </Fragment>
        <div>{archivedata[2] ? moment(archivedata[2].flowDate).format('YYYY-MM-DD') : ''}</div>
      </div>
    );

    const desc4 = (
      <div className={styles.stepDescription}>
        <Fragment>
          {archivedata[3] ? archivedata[3].unitAddress : ''}
          <Icon href="https://map.baidu.com/" type="environment-o" style={{ marginLeft: 8 }} />
        </Fragment>
        <div>{archivedata[3] ? moment(archivedata[3].flowDate).format('YYYY-MM-DD') : ''}</div>
      </div>
    );

    const desc5 = (
      <div className={styles.stepDescription}>
        <Fragment>
          {archivedata[4] ? archivedata[4].unitAddress : ''}
          <Icon href="https://map.baidu.com/" type="environment-o" style={{ marginLeft: 8 }} />
        </Fragment>
        <div>{archivedata[4] ? moment(archivedata[4].flowDate).format('YYYY-MM-DD') : ''}</div>
      </div>
    );

    return (
      <PageHeaderLayout
        title="Personal Archive"
        logo={<img alt="Archive" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
        content={description}
      >
        <List
          loading={flag}
          split={false}
          locale={{ emptyText: 'Empty!' }}
          dataSource={archivedata}
          renderItem={item => (
            <List.Item>
              <CardInfor
                unit={item ? item.unit : ''}
                unitAddress={item ? item.unitAddress : ''}
                flowDate={item ? item.flowDate : ''}
              />
            </List.Item>
            )}
        />
        <Card style={{ marginBottom: 24 }} bordered={false}>
          <Button style={{ width: '100%' }} type="dashed" size="large" onClick={() => this.handleModalVisible(true)} icon="plus">New</Button>
        </Card>
        <Card title="Archive Flow Level" style={{ marginBottom: 24 }} bordered={false} >
          <Steps direction={stepDirection} progressDot current={archivedata ? archivedata.length - 1 : ''}>
            <Step title="Level 1" description={desc1} />
            <Step title="Level 2" description={desc2} />
            <Step title="Level 3" description={desc3} />
            <Step title="Level 4" description={desc4} />
            <Step title="Level 5" description={desc5} />
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
