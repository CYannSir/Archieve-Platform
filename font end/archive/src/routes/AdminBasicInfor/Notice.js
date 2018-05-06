import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card, Form, Input, Button, Modal, message } from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Notice.less';

const FormItem = Form.Item;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');


const columns = [
  {
    title: '发送方',
    align: 'center',
    dataIndex: 'sendUser',
  },
  {
    title: '接收方',
    align: 'center',
    dataIndex: 'recUser',
  },
  {
    title: '消息类型',
    align: 'center',
    dataIndex: 'msgType',
  },
  {
    title: '消息内容',
    align: 'center',
    dataIndex: 'msgContent',
  },
  {
    title: '消息状态',
    align: 'center',
    dataIndex: 'msgStats',
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'creatTime',
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
  {
    title: '删除时间',
    align: 'center',
    dataIndex: 'delTime',
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
        title="修改通知"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
      >
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="通知内容"
        >
          {form.getFieldDecorator('msgContent', {
          rules: [{ message: '请输入通知内容' }],
        })(
          <Input placeholder="请输入通知内容" />
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
        title="新建通知"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
      >
        <FormItem
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="通知内容"
        >
          {form.getFieldDecorator('msgContent', {
          rules: [{ required: true, message: '请输入通知内容' }],
        })(
          <Input placeholder="请输入通知内容" />
        )}
        </FormItem>
      </Modal>
    );
  }
});

@connect(({ notice, loading }) => ({
  notice,
  loading: loading.models.notice,
}))
@Form.create()
export default class Notice extends PureComponent {
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
      type: 'notice/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { notice: { data }, dispatch } = this.props;
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
      type: 'notice/save',
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
      type: 'notice/fetch',
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

    console.log('objectId', selectedRows.map(objectId => objectId.objectId));
    if (!selectedRows) return;
    dispatch({
      type: 'notice/delete',
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
        unit: fieldsValue.unit,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'notice/search',
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
      type: 'notice/add',
      payload: {
        msgContent: fields.msgContent,
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
      type: 'notice/fetch',
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
      type: 'notice/modify',
      payload: {
        objectId: selectedRows.map(objectId => objectId.objectId).join(','),
        msgContent: fields.msgContent,
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

  render() {
    const { notice: { data }, loading } = this.props;
    const { selectedRows, modalVisible, formprops } = this.state;


    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModify: this.handleModify,
      handleDelete: this.handleDelete,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout title="通知管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
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
