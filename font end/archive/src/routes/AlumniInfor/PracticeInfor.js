import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './PracticeInfor.less';


const { Description } = DescriptionList;

const description = (
  <DescriptionList className={styles.headerList} size="small" col="2">
    <Description term="Name">吴成洋</Description>
    <Description term="Numeber ID">31401417</Description>
    <Description term="Phone Number">13588299239</Description>
    <Description term="E-mail">wcy623209668@vip.qq.com</Description>
    <Description term="Class Belong">软件工程1404</Description>
    <Description term="Graduated Year">2018</Description>
  </DescriptionList>
);


@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchPracticeInfor'],
}))
export default class PracticeInfor extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchPracticeInfor',
    });
  }
  render() {
    return (
      <PageHeaderLayout
        title="Practice Information"
        logo={<img alt="Practice Information" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
        content={description}
      >
        <Card title="Practice Information" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="Your Company">浙江大学城市学院 学工办</Description>
            <Description term="Company Address">浙江省 杭州市 拱墅区 湖州街51号 浙江大学城市学院</Description>
            <Description term="Industry">IT互联网</Description>
            <Description term="Occupation">项目经理</Description>
            <Description term="Salary">1W/month</Description>
          </DescriptionList>
        </Card>
      </PageHeaderLayout>
    );
  }
}
