import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './RedArchive.less';


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
  loading: loading.effects['profile/fetchRedArchive'],
}))
export default class RedArchive extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchRedArchive',
    });
  }
  render() {
    return (
      <PageHeaderLayout
        title="Personal Red Archive"
        logo={<img alt="Archive" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
        content={description}
      >
        <Card title="Red Archive Infomation" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="Join Date">2017-05-02</Description>
            <Description term="Became Activists">2017-05-02</Description>
            <Description term="Introducter">张如仟</Description>
          </DescriptionList>
        </Card>
      </PageHeaderLayout>
    );
  }
}
