import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Input, Icon, Button, Modal, message, DatePicker, Upload } from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Archive.less';

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
    title: '档案目前单位',
    dataIndex: 'currentarchive',
  },
  {
    title: '目前单位地址',
    dataIndex: 'currentarchiveaddress',
  },
  {
    title: '流向时间',
    dataIndex: 'flowdate',
    sorter: true,
    align: 'right',
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
        title="修改个人档案"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
      >
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="学生学号"
        >
          {form.getFieldDecorator('number', {
          rules: [{ message: '请输入学生学号' }],
        })(
          <Input placeholder="请输入学生学号" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="档案目前单位"
        >
          {form.getFieldDecorator('unit', {
          rules: [{ message: '请输入档案目前单位' }],
        })(
          <Input placeholder="请输入目前单位" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="档案单位地址"
        >
          {form.getFieldDecorator('unitaddress', {
          rules: [{ message: '请输入档案单位地址' }],
        })(
          <Input placeholder="请输入档案单位地址" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="流向时间"
        >
          {form.getFieldDecorator('date', {
          rules: [{ message: '请输入流向时间' }],
        })(
          <DatePicker placeholder="请输入流向时间" style={{ width: '100%' }} />
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
        title="新建个人档案"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
      >
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="学生学号"
        >
          {form.getFieldDecorator('number', {
          rules: [{ required: true, message: '请输入学生学号' }],
        })(
          <Input placeholder="请输入学生学号" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="档案目前单位"
        >
          {form.getFieldDecorator('unit', {
          rules: [{ required: true, message: '请输入档案目前单位' }],
        })(
          <Input placeholder="请输入目前单位" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="档案单位地址"
        >
          {form.getFieldDecorator('unitaddress', {
          rules: [{ required: true, message: '请输入档案单位地址' }],
        })(
          <Input placeholder="请输入档案单位地址" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
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
  }
});

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class Archive extends PureComponent {
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
      formprops: !flag,
      modalVisible: !!flag,
    });
  }

  handleModifyModalVisible = (flag) => {
    this.setState({
      formprops: !!flag,
      modalVisible: !!flag,
    });
  }

  handleAdd = () => {
    this.props.dispatch({
      type: 'rule/add',
    });

    message.success('新增成功');
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
  handleDelete = () => {
    this.props.dispatch({
      type: 'rule/remove',
    });

    message.success('删除成功');
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
                <Input placeholder="请输入" />
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
            <FormItem label="学号">
              {getFieldDecorator('studentno')(
                <Input placeholder="请输入学生学号" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="目前单位">
              {getFieldDecorator('studentunit')(
                <Input placeholder="请输入目前单位" />
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
    const { selectedRows, modalVisible, formprops } = this.state;


    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModify: this.handleModify,
      handleDelete: this.handleDelete,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout title="个人档案管理">
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
