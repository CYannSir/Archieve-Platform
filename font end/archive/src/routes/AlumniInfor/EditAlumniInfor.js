import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import {
  Form, Input, Button, Card, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './EditAlumniInfor.less';

const FormItem = Form.Item;


const description = (
  <div className={styles.pageHeaderContent}>
    <p>
        Dear graduates：
    </p>
    <p style={{ marginLeft: 16 }}>
        Welcome home! Here are always your home! You are one of the family.
    </p>
    <p style={{ marginLeft: 16 }}>
        Please remember the motto: Seek truth from facts, rigorous
        and steadfast, exert oneself being eager to make progress,open up and be creative.
    </p>
    <p style={{ marginTop: 24 }}>
        Sincerely,
    </p>
    <p>
        Ruqian Zhang
    </p>
    <p>
        Zheng Jiang University and City Collage
    </p>
  </div>
);

@connect(({ loading }) => ({
  submitting: loading.effects['form/addAlumniInfor'],
}))
@Form.create()
export default class EditAlumniInfor extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/addAlumniInfor',
          payload: values,
        });
      }
    });
  }
  handleBack = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/alumniinformation/alumniinfor',
    }));
  }
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };


    return (
      <PageHeaderLayout title="Edit Your Alumni Information" content={description} >
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="Your Company"
            >
              {getFieldDecorator('company', {
                rules: [{
                  required: true, message: 'Please enter your company',
                }],
              })(
                <Input placeholder="Please enter your company" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Company Address"
            >
              {getFieldDecorator('companyAddress', {
                rules: [{
                  required: true, message: 'Please enter your company address',
                }],
              })(
                <Input placeholder="Please enter your company address" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Industry"
            >
              {getFieldDecorator('industry', {
                rules: [{
                  required: true, message: 'Please enter your industry',
                }],
              })(
                <Input placeholder="Please enter your industry" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Occupation"
            >
              {getFieldDecorator('occupation', {
                rules: [{
                  required: true, message: 'Please enter your occupation',
                }],
              })(
                <Input placeholder="Please enter your occupation" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  Salary
                  <em className={styles.optional}>
                    (Optional)
                    <Tooltip title="校方不会泄露您的信息">
                      <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                    </Tooltip>
                  </em>
                </span>
              }
            >
              {getFieldDecorator('salary')(
                <Input placeholder="Please enter your salary. 9k/month, etc" />
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Save
              </Button>
              <Button type="primary" style={{ marginLeft: 12 }} onClick={this.handleBack}>
                Back
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
