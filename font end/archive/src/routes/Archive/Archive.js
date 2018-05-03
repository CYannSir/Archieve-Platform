import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import { Icon, Steps, Card, Button, Modal, Form, Input, message, DatePicker } from 'antd';
import classNames from 'classnames';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Archive.less';

const FormItem = Form.Item;
const { Step } = Steps;
const { Description } = DescriptionList;
const getWindowWidth = () => (window.innerWidth || document.documentElement.clientWidth);
const description = (
  <DescriptionList className={styles.headerList} size="small" col="2">
    <Description term="Name">吴成洋</Description>
    <Description term="Numeber ID">31401417</Description>
    <Description term="Phone Number">13588299239</Description>
    <Description term="E-mail">wcy623209668@vip.qq.com</Description>
    <Description term="Class Belong">软件工程1404</Description>
    <Description term="Graduated Year">2018</Description>
  </DescriptionList>
);

const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      浙江大学城市学院
      <Icon href="https://map.baidu.com/" type="environment-o" style={{ marginLeft: 8 }} />
    </Fragment>
    <div>2016-12-12</div>
  </div>
);

const desc2 = (
  <div className={styles.stepDescription}>
    <Fragment>
      杭州市拱墅区人力资源管理局
      <Icon href="https://map.baidu.com/" type="environment-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
    </Fragment>
    <div>2016-12-12</div>
  </div>
);

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
  return (
    <Modal
      title="新建个人档案"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="学生学号"
      >
        {form.getFieldDecorator('number', {
          rules: [{ required: true, message: '请输入学生学号' }],
        })(
          <Input placeholder="请输入学生学号" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="档案目前单位"
      >
        {form.getFieldDecorator('unit', {
          rules: [{ required: true, message: '请输入档案目前单位' }],
        })(
          <Input placeholder="请输入目前单位" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="档案单位地址"
      >
        {form.getFieldDecorator('unitaddress', {
          rules: [{ required: true, message: '请输入档案单位地址' }],
        })(
          <Input placeholder="请输入档案单位地址" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="流向时间"
      >
        {form.getFieldDecorator('date', {
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
  loading: loading.effects['profile/fetchAdvanced'],
}))
export default class Archive extends Component {
  state = {
    stepDirection: 'horizontal',
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchAdvanced',
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
      type: 'archive/add',
      payload: {
        description: fields.desc,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    const { stepDirection } = this.state;
    const { modalVisible } = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout
        title="Personal Archive"
        logo={<img alt="Archive" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
        content={description}
      >
        <Card title="Archive Flow" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="Preservation Unit">浙江大学城市学院</Description>
            <Description term="Address">浙江省杭州市拱墅区湖州街51号理工科楼4号-浙江大学城市学院</Description>
            <Description term="Flow Date">2017-05-02</Description>
          </DescriptionList>
          <Button size="small" type="primary" ghost onClick={() => this.handleModalVisible(true)} icon="plus">添加</Button>
        </Card>
        <Card title="Archive Flow Level" style={{ marginBottom: 24 }} bordered={false}>
          <Steps direction={stepDirection} progressDot current={2}>
            <Step title="Level 1" description={desc1} />
            <Step title="Level 2" description={desc2} />
            <Step title="Level 3" description={desc2} />
            <Step title="Level 4" />
            <Step title="Level 5" />
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
