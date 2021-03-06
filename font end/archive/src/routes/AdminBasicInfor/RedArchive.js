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
  supportServerRender: true,
  multiple: true,
  accpt: 'xlsx',
  withCredentials: true,
  method: 'POST',
  action: 'https://localhost:443/admin/addredarchivebyfile',
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
    title: '成为积极分子日期',
    align: 'center',
    dataIndex: 'activistDate',
    render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
  },
  {
    title: '加入党日期',
    dataIndex: 'joinDate',
    align: 'center',
    render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
  },
  {
    title: '介绍人A',
    align: 'center',
    dataIndex: 'introducer',
  },
  {
    title: '介绍人B',
    align: 'center',
    dataIndex: 'introducerB',
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
          label="成为积极日期"
        >
          {form.getFieldDecorator('activistDate', {
          rules: [{ required: false, message: '请输入成为积极分子日期' }],
        })(
          <DatePicker placeholder="请输入成为积极分子日期" style={{ width: '100%' }} />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="加入党日期"
        >
          {form.getFieldDecorator('joinDate', {
          rules: [{ required: false, message: '请输入加入党日期' }],
        })(
          <DatePicker placeholder="请输入加入党日期" style={{ width: '100%' }} />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="介绍人A"
        >
          {form.getFieldDecorator('introducer', {
          rules: [{ message: '请输入入党介绍人A' }],
        })(
          <Input placeholder="请输入入党介绍人A" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="介绍人B"
        >
          {form.getFieldDecorator('introducerB', {
          rules: [{ message: '请输入入党介绍人B' }],
        })(
          <Input placeholder="请输入入党介绍人B" />
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
          label="成为积极日期"
          style={{ width: '100%' }}
        >
          {form.getFieldDecorator('activistDate', {
          rules: [{ required: false, message: '请输入成为积极分子日期' }],
        })(
          <DatePicker placeholder="请输入成为积极分子日期" style={{ width: '100%' }} />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="加入党日期"
        >
          {form.getFieldDecorator('joinDate', {
          rules: [{ required: false, message: '请输入加入党日期' }],
        })(
          <DatePicker placeholder="请输入加入党日期" style={{ width: '100%' }} />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="介绍人A"
        >
          {form.getFieldDecorator('introducer', {
          rules: [{ required: true, message: '请输入入党介绍人A' }],
        })(
          <Input placeholder="请输入入党介绍人A" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="介绍人B"
        >
          {form.getFieldDecorator('introducerB', {
          rules: [{ required: true, message: '请输入入党介绍人B' }],
        })(
          <Input placeholder="请输入入党介绍人B" />
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
    const { redarchive: { data }, dispatch } = this.props;
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
      type: 'redarchive/save',
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
        objectId: selectedRows.map(objectId => objectId.objectId).join(','),
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
        stuNumber: fieldsValue.stuNumber,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'redarchive/search',
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
        joinDate: moment(fields.joinDate).format('YYYY-MM-DD'),
        activistDate: moment(fields.activistDate).format('YYYY-MM-DD'),
        introducer: fields.introducer,
      },
    });

    message.success('新增成功');
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
      type: 'redarchive/fetch',
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
      type: 'redarchive/modify',
      payload: {
        objectId: selectedRows.map(objectId => objectId.objectId).join(','),
        stuNumber: fields.stuNumber,
        joinDate: moment(fields.joinDate).format('YYYY-MM-DD'),
        activistDate: moment(fields.activistDate).format('YYYY-MM-DD'),
        introducer: fields.introducer,
        introducerB: fields.introducerB,
      },
      callback: () => {
        this.setState({
          selectedRows: [],
        });
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
            <FormItem label="学生姓名">
              {getFieldDecorator('stuName')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
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
