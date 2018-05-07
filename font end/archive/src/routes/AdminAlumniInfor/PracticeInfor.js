import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Input, Button, message, Modal } from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './PracticeInfor.less';

const FormItem = Form.Item;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const columns = [
  {
    title: '名字',
    align: 'center',
    dataIndex: 'stuName',
  },
  {
    title: '学号',
    align: 'center',
    dataIndex: 'stuNumber',
  },
  {
    title: '专业',
    align: 'center',
    dataIndex: 'stuMajor',
  },
  {
    title: '班级',
    align: 'center',
    dataIndex: 'stuClass',
  },
  {
    title: '毕业年份',
    dataIndex: 'stuEndYear',
    sorter: true,
    align: 'center',
  },
  {
    title: '邮箱',
    align: 'center',
    dataIndex: 'currentEmail',
  },
  {
    title: '电话',
    align: 'center',
    dataIndex: 'currentPhone',
  },
  {
    title: '公司',
    align: 'center',
    dataIndex: 'company',
  },
  {
    title: '行业',
    align: 'center',
    dataIndex: 'industry',
  },
  {
    title: '职位',
    align: 'center',
    dataIndex: 'occupation',
  },
  {
    title: '开始工作',
    align: 'center',
    dataIndex: 'startDate',
    sorter: true,
    render: val => (<span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>),
  },
  {
    title: '结束工作',
    align: 'center',
    dataIndex: 'endDate',
    sorter: true,
    render: val => (val === null ? (<span />) : (<span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>)),
  },
  {
    title: '薪资',
    align: 'center',
    dataIndex: 'salary',
  },
];
const CreateForm = Form.create()((props) => {
  const { modalVisible, form, handleAdd, handleModalVisible, handleModify } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleModify(fieldsValue);
    });
  };
  return (
    <Modal
      title="新建学生用户"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="学生名字"
      >
        {form.getFieldDecorator('stuName', {
          rules: [{ required: true, message: '请输入学生名字' }],
        })(
          <Input placeholder="请输入学生名字" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="学生学号"
      >
        {form.getFieldDecorator('stuNumber', {
          rules: [{ required: true, message: '请输入学生学号' }],
        })(
          <Input placeholder="请输入学生学号" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="学生专业"
      >
        {form.getFieldDecorator('stuMajor', {
          rules: [{ required: true, message: '请输入学生专业' }],
        })(
          <Input placeholder="请输入学生专业" />
        )}
      </FormItem>
    </Modal>
  );
});

@connect(({ practice, loading }) => ({
  practice,
  loading: loading.models.practice,
}))
@Form.create()
export default class PracticeInfor extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'practice/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { practice: { data }, dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
      const s = params.sorter.split('_');
      data.list = data.list.sort((prev, next) => {
        if (s[1] === 'descend') {
          return next[s[0]] - prev[s[0]];
        }
        return prev[s[0]] - next[s[0]];
      });
    }

    const result = {
      list: data.list,
      pagination,
    };

    dispatch({
      type: 'practice/save',
      payload: result,
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'practice/fetch',
      payload: {},
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }


  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }
  handleExport = () => {
    this.props.dispatch({
      type: 'practice/export',
    });

    message.success('导出成功');
    this.setState({
      modalVisible: false,
    }, 1000);
  }

  handleRefresh = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'practice/fetch',
    });

    message.success('刷新成功');
    this.setState({
      modalVisible: false,
    });
  }
  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        stuNumber: fieldsValue.stuNumber,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'practice/search',
        payload: values,
      });
    });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="学生学号">
              {getFieldDecorator('stuNumber')(
                <Input placeholder="请输入学生学号" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit" onClick={this.handleSearch}>查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }
  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const { practice: { data }, loading } = this.props;
    const { selectedRows, modalVisible } = this.state;
    const parentMethods = {
      handleExport: this.handleExport,
      handleSimpleExport: this.handleSimpleExport,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <PageHeaderLayout title="实习生信息管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="export" type="primary" onClick={this.handleExport}>
                导出
              </Button>
              <Button icon="sync" type="ghost" onClick={this.handleRefresh} />
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
        />
      </PageHeaderLayout>
    );
  }
}
