import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Form, Card, Select, List, Tag, Icon, Avatar, Row, Col, Button } from 'antd';


import StandardFormRow from 'components/StandardFormRow';
import styles from './Articles.less';

const { Option } = Select;
const FormItem = Form.Item;

const pageSize = 5;

@Form.create()
@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
export default class SearchList extends Component {
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

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const ListContent = ({ data: { content, updatedAt, avatar, owner, href } }) => (
      <div className={styles.listContent}>
        <div className={styles.description}>{content}</div>
        <div className={styles.extra}>
          <Avatar src={avatar} size="small" />
          <a href={href}>{owner}</a> Update
          <em>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
        </div>
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
                    label="Year"
                  >
                    {getFieldDecorator('user', {})(
                      <Select
                        onChange={this.handleFormSubmit}
                        placeholder="不限"
                        style={{ maxWidth: 200, width: '100%' }}
                      >
                        <Option value="lisa">2018届</Option>
                        <Option value="lisa">2017届</Option>
                        <Option value="lisa">2016届</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem
                    {...formItemLayout}
                    label="Major"
                  >
                    {getFieldDecorator('rate', {})(
                      <Select
                        onChange={this.handleFormSubmit}
                        placeholder="不限"
                        style={{ maxWidth: 200, width: '100%' }}
                      >
                        <Option value="good">软件工程</Option>
                        <Option value="good">统计</Option>
                        <Option value="good">计算机</Option>
                        <Option value="good">信息管理</Option>
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
                actions={[
                  <IconText type="star-o" text={item.star} />,
                  <IconText type="like-o" text={item.like} />,
                  <IconText type="message" text={item.message} />,
                ]}
                extra={<div className={styles.listItemExtra} />}
              >
                <List.Item.Meta
                  title={(
                    <a className={styles.listItemMetaTitle} href={item.href}>{item.title}</a>
                  )}
                  description={
                    <span>
                      <Tag>2014</Tag>
                      <Tag>2018</Tag>
                      <Tag>软件工程</Tag>
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
