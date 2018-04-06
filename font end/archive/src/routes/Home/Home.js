import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Form, Card, List, Icon, Button, Avatar, Tooltip } from 'antd';


import styles from './Home.less';


const pageSize = 5;

@Form.create()
@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
export default class Home extends Component {
  componentDidMount() {
    this.fetchMore();
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  }

  fetchMore = () => {
    this.props.dispatch({
      type: 'list/appendFetch',
      payload: {
        count: pageSize,
      },
    });
  }
  handleFormSubmit = () => {
    const { form, dispatch } = this.props;
    // setTimeout 用于保证获取表单值是在所有表单字段更新完毕的时候
    setTimeout(() => {
      form.validateFields((err) => {
        if (!err) {
          // eslint-disable-next-line
            dispatch({
            type: 'list/fetch',
            payload: {
              count: 8,
            },
          });
        }
      });
    }, 0);
  }

  render() {
    const { list: { list }, loading } = this.props;

    const CardInfor = ({ industry, company, occupation }) => (
      <div className={styles.cardInfo}>
        <div className={styles.extra}>行业：{industry}</div>
        <div className={styles.extra}>工作公司：{company}</div>
        <div className={styles.extra}>公司职位：{occupation}</div>
        {/* 目前的联系方式邮箱 公司职位 和 公司                 */}
      </div>
    );


    const loadMore = list.length > 0 ? (
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
          {loading ? <span><Icon type="loading" /> Loading...</span> : 'More'}
        </Button>
      </div>
    ) : null;

    return (
      <Fragment >
        <List
          loading={list.length === 0 ? loading : false}
          rowKey="id"
          style={{ marginTop: 24 }}
          grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
          loadMore={loadMore}
          dataSource={list}
          renderItem={item => (
            <List.Item key={item.id}>
              <Card
                hoverable
                bodyStyle={{ paddingBottom: 20 }}
                cover={<img alt="cover" src={item.cover} size="small" />}
                actions={[
                  <Tooltip title={item.email}><Icon type="mail" /></Tooltip>,
                  <Tooltip title={item.phonenumber}><Icon type="mobile" /></Tooltip>,
                ]}
              >
                <Card.Meta
                  avatar={<Avatar style={{ magain: 48 }} src={item.avatar} size="small" />}
                  title={item.title}
                />
                <div className={styles.cardItemContent}>
                  <CardInfor
                    company={item.company}
                    industry={item.industry}
                    occupation={item.occupation}
                  />
                </div>
              </Card>
            </List.Item>
            )}
        />
      </Fragment>
    );
  }
}
