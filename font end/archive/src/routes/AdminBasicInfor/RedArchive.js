import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Input, Button, Modal, message, DatePicker, Upload } from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './RedArchive.less';

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
    dataIndex: 'stuNumber',
  },
  {
    title: '加入党日期',
    dataIndex: 'joinDate',
    render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
  },
  {
    title: '成为积极分子日期',
    dataIndex: 'becameActivistDate',
    render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
  },
  {
    title: '介绍人',
    dataIndex: 'introducer',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    sorter: true,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    sorter: true,
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
        title="修改红色档案"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
      >
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="学生学号"
        >
          {form.getFieldDecorator('stuNumber', {
          rules: [{ message: '请输入学生学号' }],
        })(
          <Input placeholder="请输入学生学号" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="加入党日期"
        >
          {form.getFieldDecorator('joinDate', {
          rules: [{ message: '请输入加入党日期' }],
        })(
          <DatePicker placeholder="请输入加入党日期" style={{ width: '100%' }} />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="成为积极日期"
        >
          {form.getFieldDecorator('becameActivistDate', {
          rules: [{ message: '请输入成为积极分子日期' }],
        })(
          <DatePicker placeholder="请输入成为积极分子日期" style={{ width: '100%' }} />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="介绍人"
        >
          {form.getFieldDecorator('introducer', {
          rules: [{ message: '请输入入党介绍人' }],
        })(
          <Input placeholder="请输入入党介绍人" />
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
        title="新建红色档案"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
      >
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="学生学号"
        >
          {form.getFieldDecorator('stuNumber', {
          rules: [{ required: true, message: '请输入学生学号' }],
        })(
          <Input placeholder="请输入学生学号" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="加入党日期"
        >
          {form.getFieldDecorator('joinDate', {
          rules: [{ required: true, message: '请输入加入党日期' }],
        })(
          <DatePicker placeholder="请输入加入党日期" style={{ width: '100%' }} />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="成为积极日期"
          style={{ width: '100%' }}
        >
          {form.getFieldDecorator('becameActivistDate', {
          rules: [{ required: true, message: '请输入成为积极分子日期' }],
        })(
          <DatePicker placeholder="请输入成为积极分子日期" style={{ width: '100%' }} />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="介绍人"
        >
          {form.getFieldDecorator('introducer', {
          rules: [{ required: true, message: '请输入入党介绍人' }],
        })(
          <Input placeholder="请输入入党介绍人" />
        )}
        </FormItem>
      </Modal>
    );
  }
});

@connect(({ redarchive, loading }) => ({
  redarchive,
  loading: loading.models.redarchive,
}))
@Form.create()
export default class RedArchive extends PureComponent {
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
      type: 'redarchive/fetch',
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
      type: 'redarchive/fetch',
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
      type: 'redarchive/fetch',
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
      type: 'redarchive/delete',
      payload: {
        objectId: selectedRows.map(row => row.objectId).join(','),
      },
      callback: () => {
        this.setState({
          selectedRows: [],
        });
      },
    });
    message.success('删除成功');
    this.setState({
      modalVisible: false,
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
        stuNumber: fieldsValue.stuNumber && fieldsValue.stuNumber.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'redarchive/fetch',
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

  handleAdd = (fields) => {
    this.props.dispatch({
      type: 'redarchive/add',
      payload: {
        stuNumber: fields.stuNumber,
        joinDate: fields.joinDate,
        becomeActivistDate: fields.becomeActivistDate,
        introducer: fields.introducer,
      },
    });

    message.success('新增成功');
    this.setState({
      modalVisible: false,
    });
  }
  handleModify = (fields) => {
    this.props.dispatch({
      type: 'redarchive/modify',
      payload: {
        stuNumber: fields.stuNumber,
        joinDate: fields.joinDate,
        becomeActivistDate: fields.becomeActivistDate,
        introducer: fields.introducer,
      },
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
              {getFieldDecorator('stuNumber')(
                <Input placeholder="请输入" />
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
    const { redarchive: { data }, loading } = this.props;
    const { selectedRows, modalVisible, formprops } = this.state;


    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModify: this.handleModify,
      handleMenuClick: this.handleMenuClick,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout title="红色档案管理">
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
