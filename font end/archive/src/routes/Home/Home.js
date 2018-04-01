import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Form, Card, Select, List, Tag, Icon, Row, Col, Button, Avatar } from 'antd';


import StandardFormRow from 'components/StandardFormRow';
import styles from './Home.less';

const { Option } = Select;
const FormItem = Form.Item;

const pageSize = 5;

@Form.create()
@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
export default class Home extends Component {
  componentDidMount() {
    this.fetchMore();
  }

  fetchMore = () => {
    this.props.dispatch({
      type: 'list/appendFetch',
      payload: {
        count: pageSize,
      },
    });
  }

  render() {
    const { form, list: { list }, loading } = this.props;
    const { getFieldDecorator } = form;

    const ListContent = ({ data: { email, phonenumber, industry, company, occupation } }) => (
      <div className={styles.listContent}>
        <div className={styles.description}>邮箱地址：{email}</div>
        <div className={styles.description}>联系方式：{phonenumber}</div>
        <div className={styles.extra}>行业：{industry}</div>
        <div className={styles.extra}>工作公司：{company}</div>
        <div className={styles.extra}>公司职位：{occupation}</div>
        {/* 目前的联系方式邮箱 公司职位 和 公司 */}
      </div>
    );

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12 },
      },
    };

    const loadMore = list.length > 0 ? (
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
          {loading ? <span><Icon type="loading" /> Loading...</span> : 'More'}
        </Button>
      </div>
    ) : null;

    return (
      <Fragment >
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow
              title="Options"
              grid
              last
            >
              <Row gutter={16}>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem
                    {...formItemLayout}
                    label="Graduate Year"
                  >
                    {getFieldDecorator('endyear', {})(
                      <Select
                        onChange={this.handleFormSubmit}
                        placeholder="Any"
                        style={{ maxWidth: 200, width: '100%' }}
                      >
                        <Option value="lisa">2018</Option>
                        <Option value="lisa">2017</Option>
                        <Option value="lisa">2016</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem
                    {...formItemLayout}
                    label="Major"
                  >
                    {getFieldDecorator('major', {})(
                      <Select
                        onChange={this.handleFormSubmit}
                        placeholder="Any"
                        style={{ maxWidth: 200, width: '100%' }}
                      >
                        <Option value="softwar">软件工程</Option>
                        <Option value="statistics">统计</Option>
                        <Option value="computer">计算机</Option>
                        <Option value="information">信息管理</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>
        <Card
          style={{ marginTop: 24 }}
          bordered={false}
          bodyStyle={{ padding: '8px 32px 32px 32px' }}
        >
          <List
            size="large"
            loading={list.length === 0 ? loading : false}
            rowKey="id"
            itemLayout="vertical"
            loadMore={loadMore}
            dataSource={list}
            renderItem={item => (
              <List.Item
                key={item.id}
                extra={<div className={styles.listItemExtra} />}
              >
                <List.Item.Meta
                  title={(
                    <span>
                      <Avatar style={{ magain: 48 }} src={item.avatar} size="small" />
                      <a className={styles.listItemMetaTitle} href={item.href}>{item.title}</a>
                    </span>
                  )}
                  description={
                    <span>
                      <Tag>{item.tag_startdate}</Tag>
                      <Tag>{item.tag_enddate}</Tag>
                      <Tag>{item.tag_major}</Tag>
                    </span>
                  }
                />
                <ListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
      </Fragment>
    );
  }
}
