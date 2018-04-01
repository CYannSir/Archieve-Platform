import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Icon, Button } from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './PracticeInfor.less';

const FormItem = Form.Item;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

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
    dataIndex: 'company_address',
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


@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class PracticeInfor extends PureComponent {
  state = {
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
            <FormItem label="学生名字">
              {getFieldDecorator('studentname')(
                <Input placeholder="请输入学生名字" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit" onClick={this.handleSearch}>查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="学生名字">
              {getFieldDecorator('studentname')(
                <Input placeholder="请输入学生名字" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="学生学号">
              {getFieldDecorator('studentno')(
                <Input placeholder="请输入学生学号" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="学生专业">
              {getFieldDecorator('studentmajor')(
                <Input placeholder="请输入学生专业" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="学生班级">
              {getFieldDecorator('studentclass')(
                <Input placeholder="请输入学生班级" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="入学年份">
              {getFieldDecorator('studentstartyear')(
                <Input placeholder="请输入入学年份" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="毕业年份">
              {getFieldDecorator('studentendyear')(
                <Input placeholder="请输入学生毕业年份" />
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit" onClick={this.handleSearch}>查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }

  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { rule: { data }, loading } = this.props;
    const { selectedRows } = this.state;

    return (
      <PageHeaderLayout title="校友信息管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" >
                导出
              </Button>
              {
                selectedRows.length > 0 && (
                  <span>
                    <Button icon="plus" type="primary" >
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
      </PageHeaderLayout>
    );
  }
}
