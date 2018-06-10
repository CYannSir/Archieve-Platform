import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './RedArchive.less';


const { Description } = DescriptionList;


@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchRedArchive'],
}))
export default class RedArchive extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchUserInfor',
    });
    dispatch({
      type: 'profile/fetchRedArchive',
    });
  }
  render() {
    const { profile: { data }, profile: { redarchivedata }, loading } = this.props;
    // console.log('aaa', redarchivedata);
    const description = (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="Name">{ data ? data.stuName : '' }</Description>
        <Description term="Numeber ID">{ data ? data.stuNumber : '' }</Description>
        <Description term="Phone Number">{ data ? data.currentPhone : '' }</Description>
        <Description term="E-mail">{ data ? data.currentEmail : '' }</Description>
        <Description term="Class Belong">{ data ? data.stuMajor : '' }</Description>
        <Description term="Graduated Year">{ data ? data.stuEndYear : ''}</Description>
      </DescriptionList>
    );
    return (
      <PageHeaderLayout
        title="Personal Red Archive"
        logo={<img alt="Archive" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
        content={description}
      >
        <Card loading={loading} title="Red Archive Infomation" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="Join Date">{redarchivedata[0] ? redarchivedata[0].joinDate : ''}</Description>
            <Description term="Became Activists">{redarchivedata[0] ? redarchivedata[0].activistDate : ''}</Description>
            <Description term="Introducter">{redarchivedata[0] ? redarchivedata[0].introducer : ''}</Description>
            <Description term="IntroducterB">{redarchivedata[0] ? redarchivedata[0].introducerB : ''}</Description>
          </DescriptionList>
        </Card>
      </PageHeaderLayout>
    );
  }
}
