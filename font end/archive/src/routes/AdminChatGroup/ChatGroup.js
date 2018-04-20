import React, { PureComponent } from 'react';
import { Card, Form } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import TableForm from './TableForm';
import styles from './style.less';


/* const tableData = [{
  key: '1',
  stuMajor: '软件工程',
  stuEndYear: '2018',
  qqNo: '623209668',
}, {
  key: '2',
  stuMajor: '商务管理',
  stuEndYear: '2019',
  qqNo: '1234444444',
}, {
  key: '3',
  stuMajor: '计算机',
  stuEndYear: '2018',
  qqNo: '4444444444',
}]; */

class ChatGroup extends PureComponent {
  state = {
    width: '100%',
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chatgroup/fetch',
    });
    window.addEventListener('resize', this.resizeFooterToolbar);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }
  resizeFooterToolbar = () => {
    const sider = document.querySelectorAll('.ant-layout-sider')[0];
    const width = `calc(100% - ${sider.style.width})`;
    if (this.state.width !== width) {
      this.setState({ width });
    }
  }
  render() {
    const { chatgroup: { data }, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <PageHeaderLayout
        title="交流群设置"
        content="为毕业生或者实习生专门设置的交流群设置"
        wrapperClassName={styles.advancedForm}
      >
        <Card title="交流群设置" bordered={false}>
          {getFieldDecorator('chatgroup', {
            initialValue: data.list,
          })(<TableForm />)}
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default connect(({ chatgroup, global, loading }) => ({
  chatgroup,
  collapsed: global.collapsed,
  submitting: loading.effects['chatgroup/submitAdvancedForm'],
}))(Form.create()(ChatGroup));
