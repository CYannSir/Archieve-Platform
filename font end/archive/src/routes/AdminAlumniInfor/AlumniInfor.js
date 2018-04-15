import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, Modal, message } from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './AlumniInfor.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

function downloadfile() {
  window.location.href = '/UserExcelDownloads';
}

const columns = [
  {
    title: '名字',
    dataIndex: 'studentname',
  },
  {
    title: '学号',
    dataIndex: 'studentno',
  },
  {
    title: '专业',
    dataIndex: 'studentmajor',
  },
  {
    title: '班级',
    dataIndex: 'studentclass',
  },
  {
    title: '入学年份',
    dataIndex: 'studentstartyear',
    sorter: true,
    align: 'right',
  },
  {
    title: '毕业年份',
    dataIndex: 'studentendyear',
    sorter: true,
    align: 'right',
  },
  {
    title: '现在邮箱',
    dataIndex: 'currentemail',
  },
  {
    title: '现在联系方式',
    dataIndex: 'currentnumber',
  },
  {
    title: '公司',
    dataIndex: 'company',
  },
  {
    title: '公司地址',
    dataIndex: 'companyaddress',
  },
  {
    title: '行业',
    dataIndex: 'industry',
  },
  {
    title: '职位',
    dataIndex: 'occupation',
  },
  {
    title: '薪资',
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
        {form.getFieldDecorator('name', {
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
        {form.getFieldDecorator('number', {
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
        {form.getFieldDecorator('major', {
          rules: [{ required: true, message: '请输入学生专业' }],
        })(
          <Input placeholder="请输入学生专业" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="学生班级"
      >
        {form.getFieldDecorator('class', {
          rules: [{ required: true, message: '请输入学生班级' }],
        })(
          <Input placeholder="请输入学生班级" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="入学年份"
      >
        {form.getFieldDecorator('startyear', {
          rules: [{ required: true, message: '请输入学生入学年份' }],
        })(
          <Input placeholder="请输入学生入学年份" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="毕业年份"
      >
        {form.getFieldDecorator('endyear', {
          rules: [{ required: true, message: '请输入学生毕业年份' }],
        })(
          <Input placeholder="请输入学生毕业年份" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="是否为党员"
      >
        {form.getFieldDecorator('ifred', {
            rules: [{ required: true, message: '请选择学生是否为党员' }],
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            <Option value="0">普通</Option>
            <Option value="1">党员</Option>
          </Select>
              )}
      </FormItem>
    </Modal>
  );
});

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class AlumniInfor extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
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
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  handleMenuClick = (e) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'rule/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }

  handleExport = () => {
    downloadfile();
    this.props.dispatch({
      type: 'rule/export',
    });

    message.success('导出成功');
    this.setState({
      modalVisible: false,
    });
  }
  handleSimpleExport = () => {
    downloadfile();
    this.props.dispatch({
      type: 'rule/simpleexport',
    });

    message.success('单个信息导出成功');
    this.setState({
      modalVisible: false,
    });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="学生学号">
              {getFieldDecorator('studentno')(
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
    const { rule: { data }, loading } = this.props;
    const { selectedRows, modalVisible } = this.state;


    const parentMethods = {
      handleExport: this.handleExport,
      handleSimpleExport: this.handleSimpleExport,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout title="校友信息管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="export" type="primary" onClick={this.handleExport}>
                导出
              </Button>
              {
                selectedRows.length > 0 && (
                  <span>
                    <Button icon="export" type="primary" onClick={this.handleSimpleExport}>
                        单个信息导出
                    </Button>
                  </span>
                )
              }

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
