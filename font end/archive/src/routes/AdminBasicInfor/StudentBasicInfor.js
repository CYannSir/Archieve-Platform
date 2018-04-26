import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Modal, message, Badge, Upload } from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './StudentBasicInfor.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['普通', '党员'];
const stupower = ['实习生', '毕业生'];

const fileprops = {
  name: 'file',
  supportServerRender: true,
  multiple: true,
  accpt: 'xlsx',
  method: 'POST',
  action: 'http://localhost:8080/admin/addstubyfile',
  onchange(info) {
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
    title: '名字',
    dataIndex: 'stuName',
    align: 'center',
  },
  {
    title: '学号',
    dataIndex: 'stuNumber',
    align: 'center',
  },
  {
    title: '专业',
    dataIndex: 'stuMajor',
    align: 'center',
  },
  {
    title: '班级',
    dataIndex: 'stuClass',
    align: 'center',
  },
  {
    title: '入学年份',
    dataIndex: 'stuStartYear',
    sorter: true,
    align: 'center',
  },
  {
    title: '毕业年份',
    dataIndex: 'stuEndYear',
    sorter: true,
    align: 'center',
  },
  {
    title: '是否党员',
    dataIndex: 'redParty',
    align: 'center',
    render(val) {
      return <Badge status={statusMap[val]} text={status[val]} />;
    },
  },
  {
    title: '是否毕业',
    dataIndex: 'stuPower',
    align: 'center',
    render(val) {
      return <Badge status={statusMap[val]} text={stupower[val]} />;
    },
  },
  {
    title: '现在邮箱',
    dataIndex: 'currentEmail',
    align: 'center',
  },
  {
    title: '现在联系方式',
    dataIndex: 'currentPhone',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'creatTime',
    align: 'center',
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

  // const { selectedRows } = this.state;
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
        title="修改学生用户"
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
          rules: [{ message: '请输入学生名字' }],
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
          rules: [{ message: '请输入学生学号' }],
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
          rules: [{ message: '请输入学生专业' }],
        })(
          <Input placeholder="请输入学生专业" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="学生班级"
        >
          {form.getFieldDecorator('stuClass', {
          rules: [{ message: '请输入学生班级' }],
        })(
          <Input placeholder="请输入学生班级" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="入学年份"
        >
          {form.getFieldDecorator('stuStartYear', {
          rules: [{ message: '请输入学生入学年份' }],
        })(
          <Input placeholder="请输入学生入学年份" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="毕业年份"
        >
          {form.getFieldDecorator('stuEndYear', {
          rules: [{ message: '请输入学生毕业年份' }],
        })(
          <Input placeholder="请输入学生毕业年份" />
        )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="是否为党员"
        >
          {form.getFieldDecorator('redParty', {
            rules: [{ message: '请选择学生是否为党员' }],
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            <Option value="0">普通</Option>
            <Option value="1">党员</Option>
          </Select>
              )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="是否毕业"
        >
          {form.getFieldDecorator('redParty', {
            rules: [{ message: '请选择学生是否毕业' }],
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            <Option value="0">实习生</Option>
            <Option value="1">毕业生</Option>
          </Select>
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
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="学生班级"
        >
          {form.getFieldDecorator('stuClass', {
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
          {form.getFieldDecorator('stuStartYear', {
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
          {form.getFieldDecorator('stuEndYear', {
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
          {form.getFieldDecorator('redParty', {
            rules: [{ required: true, message: '请选择学生是否为党员' }],
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            <Option value="0">普通</Option>
            <Option value="1">党员</Option>
          </Select>
              )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="是否毕业"
        >
          {form.getFieldDecorator('redParty', {
            rules: [{ required: true, message: '请选择学生是否毕业' }],
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            <Option value="0">实习生</Option>
            <Option value="1">毕业生</Option>
          </Select>
              )}
        </FormItem>
      </Modal>
    );
  }
});

@connect(({ stuinfor, loading }) => ({
  stuinfor,
  loading: loading.models.stuinfor,
}))
@Form.create()
export default class StudentBasicInfor extends PureComponent {
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
      type: 'stuinfor/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { stuinfor: { data }, dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    // console.log('formValuessad==>', formValues);
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    // console.log('formValues==>', formValues);

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

    // console.log('pageSize==>', params.pageSize);
    // console.log('result==>', result);
    dispatch({
      type: 'stuinfor/save',
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
      type: 'stuinfor/fetch',
      payload: {},
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  handleDeleteClick = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    // console.log('srows==>', selectedRows);
    // console.log('object==>', selectedRows.map(objectId => objectId.objectId).join(','));
    if (!selectedRows) return;
    dispatch({
      type: 'stuinfor/delete',
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
    // console.log('rows==>', rows);
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
        stuName: fieldsValue.stuName,
        stuMajor: fieldsValue.stuMajor,
        stuStartYear: fieldsValue.stuStartYear,
        stuEndYear: fieldsValue.stuEndYear,
        redParty: fieldsValue.redParty && fieldsValue.redParty.valueOf(),
        stuPower: fieldsValue.stuPower && fieldsValue.stuPower.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'stuinfor/search',
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
    const { dispatch } = this.props;
    dispatch({
      type: 'stuinfor/add',
      payload: {
        stuNumber: fields.stuNumber,
        stuName: fields.stuName,
        stuMajor: fields.stuMajor,
        stuClass: fields.stuClass,
        stuStartYear: fields.stuStartYear,
        stuEndYear: fields.stuEndYear,
        redParty: fields.redParty,
        stuPower: fields.stuPower,
      },
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
      type: 'stuinfor/fetch',
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
      type: 'stuinfor/modify',
      payload: {
        objectId: selectedRows.map(objectId => objectId.objectId).join(','),
        stuNumber: fields.stuNumber,
        stuName: fields.stuName,
        stuMajor: fields.stuMajor,
        stuClass: fields.stuClass,
        stuStartYear: fields.stuStartYear,
        stuEndYear: fields.stuEndYear,
        redParty: fields.redParty,
        stuPower: fields.stuPower,
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
            <FormItem label="学生学号">
              {getFieldDecorator('stuNumber')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="是否为党员">
              {getFieldDecorator('redParty')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">普通</Option>
                  <Option value="1">党员</Option>
                </Select>
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
            <FormItem label="名字">
              {getFieldDecorator('stuName')(
                <Input placeholder="请输入学生名字" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="学号">
              {getFieldDecorator('stuNumber')(
                <Input placeholder="请输入学生学号" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="学生专业">
              {getFieldDecorator('stuMajor')(
                <Input placeholder="请输入学生专业" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="毕业年份">
              {getFieldDecorator('stuEndYear')(
                <Input placeholder="请输入学生毕业年份" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="是否为党员">
              {getFieldDecorator('redParty')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">普通</Option>
                  <Option value="1">党员</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="是否毕业">
              {getFieldDecorator('stuPower')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">实习生</Option>
                  <Option value="1">毕业生</Option>
                </Select>
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
    const { stuinfor: { data }, loading } = this.props;
    const { selectedRows, modalVisible, formprops } = this.state;


    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModify: this.handleModify,
      handleDelete: this.handleDelete,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout title="学生用户管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator} >
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>

              {
                selectedRows.length > 0 && (
                  <span>
                    <Button icon="edit" type="primary" onClick={() => this.handleModifyModalVisible(true)}>
                        修改
                    </Button>
                    <Button icon="delete" type="primary" onClick={this.handleDeleteClick}>
                        删除
                    </Button>
                  </span>
                )
              }
              <Upload {...fileprops}>
                <Button type="ghost" icon="upload">
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
