import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Input, Button, Modal, message, DatePicker, Upload } from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Account.less';

const FormItem = Form.Item;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const columns = [
  {
    title: '姓名',
    align: 'center',
    dataIndex: 'stuName',
  },
  {
    title: '学号',
    align: 'center',
    dataIndex: 'stuNumber',
  },
  {
    title: '户口所在地',
    align: 'center',
    dataIndex: 'accountAddress',
  },
  {
    title: '时间',
    align: 'center',
    dataIndex: 'accountDate',
    render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
  },
  {
    title: '更新时间',
    align: 'center',
    dataIndex: 'updateTime',
    sorter: true,
    render: val => (val === null ? (<span />) : (<span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>)),
  },
];

const CreateForm = Form.create()((props) => {
  const { modalVisible, form, handleAdd, handleModalVisible, handleModify, formprops } = props;
  if (formprops === true) {
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleModify(fieldsValue);
      });
    };
    return (
      <Modal
        title="修改户口信息"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
      >
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="学生学号"
        >
          {form.getFieldDecorator('stuNumber', {
          rules: [{ message: '请输入学生学号' }],
        })(
          <Input placeholder="请输入学生学号" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="户口所在地"
        >
          {form.getFieldDecorator('accountAddress', {
          rules: [{ message: '请输入新的户口所在地' }],
        })(
          <Input placeholder="请输入新的户口所在地，浙江杭州拱墅 示例" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="更改时间"
        >
          {form.getFieldDecorator('accountDate', {
          rules: [{ required: false, message: '请输入户口更改时间' }],
        })(
          <DatePicker placeholder="请输入户口更改时间" style={{ width: '100%' }} />
        )}
        </FormItem>
      </Modal>
    );
  } else {
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleAdd(fieldsValue);
      });
    };
    return (
      <Modal
        title="新建户口信息"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
      >
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
          label="户口所在地"
        >
          {form.getFieldDecorator('accountAddress', {
          rules: [{ required: true, message: '请输入新的户口所在地' }],
        })(
          <Input placeholder="请输入新的户口所在地，浙江杭州拱墅 示例" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="更改时间"
        >
          {form.getFieldDecorator('accountDate', {
          rules: [{ required: true, message: '请输入户口更改时间' }],
        })(
          <DatePicker placeholder="请输入户口更改时间" style={{ width: '100%' }} />
        )}
        </FormItem>
      </Modal>
    );
  }
});

@connect(({ account, loading }) => ({
  account,
  loading: loading.models.account,
}))
@Form.create()
export default class Account extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    formprops: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { account: { data }, dispatch } = this.props;
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
      type: 'account/save',
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
      type: 'account/fetch',
      payload: {},
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  handleMenuClick = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;
    dispatch({
      type: 'account/delete',
      payload: {
        objectId: selectedRows.map(row => row.objectId).join(','),
      },
      callback: () => {
        this.setState({
          selectedRows: [],
        });
      },
    });
    // message.success('删除成功');
    this.setState({
      modalVisible: false,
      formprops: false,
    });
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
        stuNumber: fieldsValue.stuNumber,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'account/search',
        payload: values,
      });
    });
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }
  handleModifyModalVisible = (flag) => {
    this.setState({
      formprops: !!flag,
      modalVisible: !!flag,
    });
  }
  handleAdd = (fields) => {
    this.props.dispatch({
      type: 'account/add',
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

  handleFile = () => {
    this.props.dispatch({
      type: 'account/addbyfile',
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  }
  handleRefresh = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'account/fetch',
    });

    message.success('刷新成功');
    this.setState({
      modalVisible: false,
    });
  }
  handleModify = (fields) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (!selectedRows) return;
    dispatch({
      type: 'account/modify',
      payload: {
        objectId: selectedRows.map(objectId => objectId.objectId).join(','),
        stuNumber: fields.stuNumber,
        accountAddress: fields.accountAddress,
        accountDate: moment(fields.accountDate).format('YYYY-MM-DD'),
      },
      callback: () => {
        this.setState({
          selectedRows: [],
        });
      },
    });

    // message.success('修改成功');
    this.setState({
      modalVisible: false,
      formprops: false,
    });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="学生姓名">
              {getFieldDecorator('stuName')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
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
    const { account: { data }, loading } = this.props;
    const { selectedRows, modalVisible, formprops } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleFile: this.handleFile,
      handleModify: this.handleModify,
      handleMenuClick: this.handleMenuClick,
      handleModalVisible: this.handleModalVisible,
    };
    const fileprops = {
      name: 'file',
      // supportServerRender: true,
      // multiple: true,
      accpt: 'xlsx',
      method: 'POST',
      action: 'https://localhost:443/admin/addaccountbyfile',
      withCredentials: true,
      headers: {
        authorization: 'application/json',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <PageHeaderLayout title="户口档案管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {
                selectedRows.length > 0 && (
                  <span>
                    <Button icon="edit" type="primary" onClick={() => this.handleModifyModalVisible(true)}>
                        修改
                    </Button>
                    <Button icon="delete" type="primary" onClick={this.handleMenuClick}>
                        删除
                    </Button>
                  </span>
                )
              }
              <Upload {...fileprops}>
                <Button icon="upload" on>
                   批量新增
                </Button>
              </Upload>
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
          formprops={formprops}
        />
      </PageHeaderLayout>
    );
  }
}
