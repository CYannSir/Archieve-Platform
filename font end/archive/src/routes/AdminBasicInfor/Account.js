import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Input, Button, Modal, message, DatePicker, Upload } from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Account.less';

const FormItem = Form.Item;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');


const fileprops = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const columns = [
  {
    title: '学号',
    dataIndex: 'studentno',
  },
  {
    title: '户口所在地',
    dataIndex: 'accountaddress',
  },
  {
    title: '时间',
    dataIndex: 'changedate',
    render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
  },
  {
    title: '上传时间',
    dataIndex: 'uploadtime',
    sorter: true,
    render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
  },
  {
    title: '删除时间',
    dataIndex: 'deletetime',
    sorter: true,
    render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
  },
  {
    title: '更新时间',
    dataIndex: 'updatedtime',
    sorter: true,
    render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
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
          {form.getFieldDecorator('studentno', {
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
          {form.getFieldDecorator('accountaddress', {
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
          {form.getFieldDecorator('updatedate', {
          rules: [{ message: '请输入户口更改时间' }],
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
          {form.getFieldDecorator('studentno', {
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
          {form.getFieldDecorator('accountaddress', {
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
          {form.getFieldDecorator('updatedate', {
          rules: [{ required: true, message: '请输入户口更改时间' }],
        })(
          <DatePicker placeholder="请输入户口更改时间" style={{ width: '100%' }} />
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
  handleModifyModalVisible = (flag) => {
    this.setState({
      formprops: !!flag,
      modalVisible: !!flag,
    });
  }
  handleAdd = (fields) => {
    this.props.dispatch({
      type: 'rule/add',
      payload: {
        studentno: fields.studentno,
        accountaddress: fields.accountaddress,
        updatedtime: fields.updatedate,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  }

  handleDelete = () => {
    this.props.dispatch({
      type: 'rule/delete',
    });

    message.success('删除成功');
    this.setState({
      modalVisible: false,
    });
  }
  handleModify = () => {
    this.props.dispatch({
      type: 'rule/modify',
    });

    message.success('修改成功');
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
    const { selectedRows, modalVisible, formprops } = this.state;


    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModify: this.handleModify,
      handleDelete: this.handleDelete,
      handleModalVisible: this.handleModalVisible,
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
                    <Button icon="delete" type="primary" onClick={this.handleDelete}>
                        删除
                    </Button>
                  </span>
                )
              }
              <Upload {...fileprops}>
                <Button icon="upload">
                   批量新增
                </Button>
              </Upload>

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
