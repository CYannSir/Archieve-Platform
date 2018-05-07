import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, List, Button } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './PracticeInfor.less';


const { Description } = DescriptionList;

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.models.profile,
}))
export default class PracticeInfor extends Component {
  state = {
    flag: false,
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchPracticeInfor',
      flag: true,
    });
    dispatch({
      type: 'profile/fetchUserInfor',
    });
  }
  handleAdd = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/alumniinformation/editpractice',
    }));
  }
  render() {
    const { profile: { data }, profile: { practicedata } } = this.props;
    const { flag } = this.state;
    // console.log('ss', practicedata);
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
    const CardInfor =
    ({ company, companyAddress, industry, occupation, salary, startDate, endDate }) => (
      <Card title="Practice Information" bordered={false}>
        <DescriptionList style={{ marginBottom: 24 }}>
          <Description term="Your Company">{company}</Description>
          <Description term="Industry">{industry}</Description>
          <Description term="Occupation">{occupation}</Description>
          <Description term="Start Date">{startDate}</Description>
          <Description term="End Date">{endDate}</Description>
          <Description term="Salary">{salary}</Description>
          <Description term="Company Address">{companyAddress}</Description>
        </DescriptionList>
      </Card>
    );
    return (
      <PageHeaderLayout
        title="Practice Information"
        logo={<img alt="Practice Information" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
        content={description}
      >
        <List
          loading={flag}
          split={false}
          locale={{ emptyText: 'Empty!' }}
          dataSource={practicedata}
          renderItem={item => (
            <List.Item>
              <CardInfor
                company={item ? item.company : ''}
                companyAddress={item ? item.companyAddress : ''}
                industry={item ? item.industry : ''}
                occupation={item ? item.occupation : ''}
                salary={item ? item.salary : ''}
                startDate={item ? item.startDate : ''}
                endDate={item ? item.endDate : ''}
              />
            </List.Item>
            )}
        />
        <Card style={{ marginBottom: 24 }} bordered={false}>
          <Button style={{ width: '100%' }} type="dashed" size="large" onClick={this.handleAdd} icon="plus">New</Button>
        </Card>
      </PageHeaderLayout>
    );
  }
}
