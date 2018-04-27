import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Input, Button, Modal, message } from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './ChatGroup.less';

const FormItem = Form.Item;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const columns = [
  {
    title: '专业',
    align: 'center',
    dataIndex: 'stuMajor',
  },
  {
    title: '毕业年份',
    align: 'center',
    dataIndex: 'stuEndYear',
  },
  {
    title: 'QQ群',
    align: 'center',
    dataIndex: 'qqNo',
  },
  {
    title: '微信群',
    align: 'center',
    dataIndex: 'wechatNo',
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
    sorter: true,
    render: val => (<span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>),
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
        title="修改交流群信息"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
      >
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="专业"
        >
          {form.getFieldDecorator('stuMajor', {
          rules: [{ required: false, message: '请输入专业' }],
        })(
          <Input placeholder="请输入专业" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="毕业年份"
        >
          {form.getFieldDecorator('stuEndYear', {
          rules: [{ required: false, message: '请输入毕业年份' }],
        })(
          <Input placeholder="请输入毕业年份" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="qq群"
        >
          {form.getFieldDecorator('qqNo', {
          rules: [{ required: false, message: '请输入QQ群' }],
        })(
          <Input placeholder="请输入QQ群" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="微信群"
        >
          {form.getFieldDecorator('wechatNo', {
          rules: [{ required: false, message: '请输入微信群' }],
        })(
          <Input placeholder="请输入微信群" />
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
        title="新增交流群信息"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
      >
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="专业"
        >
          {form.getFieldDecorator('stuMajor', {
          rules: [{ required: true, message: '请输入专业' }],
        })(
          <Input placeholder="请输入专业" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="毕业年份"
        >
          {form.getFieldDecorator('stuEndYear', {
          rules: [{ required: true, message: '请输入毕业年份' }],
        })(
          <Input placeholder="请输入毕业年份" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="qq群"
        >
          {form.getFieldDecorator('qqNo', {
          rules: [{ required: true, message: '请输入QQ群' }],
        })(
          <Input placeholder="请输入QQ群" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="微信群"
        >
          {form.getFieldDecorator('wechatNo')(
            <Input placeholder="请输入微信群" />
        )}
        </FormItem>
      </Modal>
    );
  }
});

@connect(({ chatgroup, loading }) => ({
  chatgroup,
  loading: loading.models.chatgroup,
}))
@Form.create()
export default class ChatGroup extends PureComponent {
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
      type: 'chatgroup/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { chatgroup: { data }, dispatch } = this.props;
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
      type: 'chatgroup/save',
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
      type: 'chatgroup/fetch',
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
      type: 'chatgroup/delete',
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
        stuMajor: fieldsValue.stuMajor,
        stuEndYear: fieldsValue.stuEndYear,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'chatgroup/search',
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
      type: 'chatgroup/add',
      payload: {
        stuMajor: fields.stuMajor,
        stuEndYear: fields.stuEndYear,
        qqNo: fields.qqNo,
        wechatNo: fields.wechatNo,
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
      type: 'chatgroup/fetch',
    });

    message.success('刷新成功');
    this.setState({
      modalVisible: false,
    });
  }
  handleModify = (fields) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    // console.log('log==>', selectedRows.map(objectId => objectId.objectId));
    if (!selectedRows) return;
    dispatch({
      type: 'chatgroup/modify',
      payload: {
        objectId: selectedRows.map(objectId => objectId.objectId).join(','),
        stuMajor: fields.stuMajor,
        stuEndYear: fields.stuEndYear,
        qqNo: fields.qqNo,
        wechatNo: fields.wechatNo,
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
            <FormItem label="学生专业">
              {getFieldDecorator('stuMajor')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="毕业年份">
              {getFieldDecorator('stuEndYear')(
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
    const { chatgroup: { data }, loading } = this.props;
    const { selectedRows, modalVisible, formprops } = this.state;


    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModify: this.handleModify,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout title="交流群管理">
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
