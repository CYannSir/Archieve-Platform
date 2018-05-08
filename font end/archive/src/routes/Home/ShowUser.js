import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, List } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';


const { Description } = DescriptionList;


@connect(({ profile, loading }) => ({
  profile,
  loading: loading.models.profile,
}))
export default class ShowUser extends Component {
  state = {
    flag: false,
  }
  componentDidMount() {
    const { dispatch } = this.props;
    console.log(this.props.location.state);
    const values = this.props.location.state;
    console.log('value', values);
    console.log('stuNumber', values.stuNumber);
    // console.log(this.props.location.paylaod.stuName);
    dispatch({
      type: 'profile/fetchShowUserInfor',
      payload: {
        ...values,
      },
    });
    dispatch({
      type: 'profile/fetchShowUserAlumniInformation',
      flag: true,
      payload: {
        stuNumber: values.stuNumber,
      },
    });
    dispatch({
      type: 'profile/fetchShowUserPracticeInfor',
      flag: true,
      payload: {
        stuNumber: values.stuNumber,
      },
    });
  }
  handleAdd = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/alumniinformation/editalumniinfor',
    }));
  }
  render() {
    const { profile: { data }, profile: { alumnidata }, profile: { practicedata } } = this.props;
    const { flag } = this.state;
    // console.log('ss', alumnidata);
    const nameTitle = (
      <div style={{ textAlign: 'center' }}>
        <img alt="avart" height="150" width="150" src="https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png" />
        <h4 style={{ textAlign: 'center' }}>{ `${data ? data.stuName : ''}  |  ${data ? data.stuEndYear : ''}` }</h4>
        <h6 style={{ textAlign: 'center' }}>
          {`Numeber ID:   ${data ? data.stuNumber : ''}` }
        </h6>
        <h6 style={{ textAlign: 'center' }}>
          {`Class Belong: ${data ? data.stuMajor : ''}` }
        </h6>
        <h6 style={{ textAlign: 'center' }}>
          {`Phone Number: ${data ? data.currentPhone : ''} ` }
        </h6>
        <h6 style={{ textAlign: 'center' }}>
          {`E-mail:       ${data ? data.currentEmail : ''}` }
        </h6>
      </div>
    );

    const ACardInfor =
    ({ company, companyAddress, industry, occupation, salary, startDate, endDate }) => (
      <Card title="Work Experience" bordered={false}>
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
    const PCardInfor =
    ({ company, companyAddress, industry, occupation, salary, startDate, endDate }) => (
      <Card title="Intern Experience" bordered={false}>
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
        title={nameTitle}
      >
        <List
          loading={flag}
          split={false}
          locale={{ emptyText: 'Empty!' }}
          dataSource={alumnidata}
          renderItem={item => (
            <List.Item>
              <h1> w w w  w w</h1>
              <ACardInfor
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
        <List
          loading={flag}
          split={false}
          locale={{ emptyText: 'Empty!' }}
          dataSource={practicedata}
          renderItem={item => (
            <List.Item>
              <PCardInfor
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
      </PageHeaderLayout>
    );
  }
}
