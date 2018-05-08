import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Form, Card, List, Icon, Avatar, Tooltip } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Home.less';

@Form.create()
@connect(({ list, profile, loading }) => ({
  list,
  profile,
  loading: loading.models.list,
}))
export default class Home extends Component {
  componentDidMount() {
    // this.fetchMore();
    this.props.dispatch({
      type: 'list/fetchHome',
    });
  }
  onItemClick = (item) => {
    console.log(item);
    this.props.dispatch(routerRedux.push({
      pathname: '/showuser',
      state: {
        stuNumber: item.stuNumber,
      },
    }));
  }
  /*
  fetchMore = () => {
    this.props.dispatch({
      type: 'list/appendFetchHome',
      payload: {
        pageNum: pageSize,
        pageSize: 20,
      },
    });
  }
 */


  render() {
    const { list: { list }, loading } = this.props;

    const CardInfor = ({ industry, company, occupation, salary, startDate, endDate }) => (
      <div className={styles.cardInfo}>
        <div className={styles.extra}>-----</div>
        <div className={styles.extra}>Industry:   {industry}</div>
        <div className={styles.extra}>Company:    {company}</div>
        <div className={styles.extra}>Occupation:     {occupation}</div>
        <div className={styles.extra}>Start Date:     {startDate}</div>
        <div className={styles.extra}>End Date:     {endDate}</div>
        <div className={styles.extra}>Salary:     {salary}</div>
        {/* 目前的联系方式邮箱 公司职位 和 公司                 */}
      </div>
    );

    /*
    const loadMore = list.length > 0 ? (
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
          {loading ? <span><Icon type="loading" /> Loading...</span> : 'More'}
        </Button>
      </div>
    ) : null;

    */
    return (
      <Fragment >
        <List
          loading={list.length === 0 ? loading : false}
          rowKey="objectId"
          style={{ marginTop: 24 }}
          grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
          dataSource={list}
          renderItem={item => (
            <List.Item
              key={item.currentEmail}
              onClick={() => this.onItemClick(item)}
            >
              <Card
                hoverable
                bodyStyle={{ paddingBottom: 20 }}
                cover={<img alt="cover" src={item.cover} size="small" />}
                actions={[
                  <Tooltip title={item.currentEmail}><Icon type="mail" /></Tooltip>,
                  <Tooltip title={item.currentPhone}><Icon type="mobile" /></Tooltip>,
                ]}
              >
                <Card.Meta
                  avatar={<Avatar style={{ magain: 48 }} src={item.avatar} size="small" />}
                  title={`${item.stuName}   ${item.tag}`}
                />
                <div className={styles.cardItemContent}>
                  <CardInfor
                    company={item.company}
                    industry={item.industry}
                    occupation={item.occupation}
                    salary={item.salary}
                    startDate={item.startDate}
                    endDate={item.endDate}
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
