import React, { PureComponent } from 'react';
import { Card, Form } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import TableForm from './TableForm';
import styles from './style.less';


const tableData = [{
  key: '1',
  major: '软件工程',
  endyear: '2018',
  qqno: '623209668',
}, {
  key: '2',
  major: '商务管理',
  endyear: '2019',
  qqno: '1234444444',
}, {
  key: '3',
  major: '计算机',
  endyear: '2018',
  qqno: '4444444444',
}];

class ChatGroup extends PureComponent {
  state = {
    width: '100%',
  };
  componentDidMount() {
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
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <PageHeaderLayout
        title="交流群设置"
        content="为毕业生或者实习生专门设置的交流群设置"
        wrapperClassName={styles.advancedForm}
      >
        <Card title="交流群设置" bordered={false}>
          {getFieldDecorator('members', {
            initialValue: tableData,
          })(<TableForm />)}
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default connect(({ global, loading }) => ({
  collapsed: global.collapsed,
  submitting: loading.effects['form/submitAdvancedForm'],
}))(Form.create()(ChatGroup));
