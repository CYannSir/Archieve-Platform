import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, List } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';


const { Description } = DescriptionList;


@connect(({ profile, loading }) => ({
  profile,
  loading: loading.models.profile,
}))
export default class ShowUser extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const values = this.props.location.state;
    // console.log('value', values);
    dispatch({
      type: 'profile/showUser',
      payload: {
        stuNumber: values.stuNumber,
      },
    });
    dispatch({
      type: 'profile/fetchShowUserAlumniInformation',
      payload: {
        stuNumber: values.stuNumber,
      },
      flag: true,
    });
    dispatch({
      type: 'profile/fetchShowUserPracticeInfor',
      flag: true,
      payload: {
        stuNumber: values.stuNumber,
      },
    });
  }
  render() {
    const { profile: { data }, profile: { alumnidata },
      profile: { practicedata }, loading } = this.props;
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
        loading={loading}
      >
        <List
          loading={loading}
          split={false}
          locale={{ emptyText: 'Empty!' }}
          dataSource={alumnidata}
          renderItem={item => (
            <List.Item>
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
          loading={loading}
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
