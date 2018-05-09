import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, List, Button, Icon } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './AlumniInformation.less';


const { Description } = DescriptionList;


@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchAlumniInformation'],
}))
export default class AlumniInformation extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchUserInfor',
    });
    dispatch({
      type: 'profile/fetchAlumniInformation',
      flag: true,
    });
    dispatch({
      type: 'profile/fetchChatGroup',
      // flag: true,
    });
  }
  handleAdd = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/alumniinformation/editalumniinfor',
    }));
  }
  render() {
    const { profile: { data }, profile: { alumnidata },
      profile: { chatgroup }, loading } = this.props;
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
      <Card title="Alumni Information" bordered={false}>
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
        title="Alumni Information"
        logo={<img alt="Alumni Information" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
        content={description}
      >
        <List
          loading={loading}
          split={false}
          locale={{ emptyText: 'Empty!' }}
          dataSource={alumnidata}
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
        <Card loading={loading} style={{ marginBottom: 24 }} bordered={false}>
          <Button style={{ width: '100%' }} type="dashed" size="large" onClick={this.handleAdd} icon="plus">New</Button>
        </Card>
        <Card loading={loading} title="Chat Group" bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="Major">{chatgroup ? chatgroup.stuMajor : ''}</Description>
            <Description term="Graduate Year">{chatgroup ? chatgroup.stuEndYear : ''}</Description>
            <Description term={
              <span>
                QQ Group
                <em className={styles.optional}>
                  <Icon type="qq" style={{ marginLeft: 4, color: '#595959' }} />
                </em>
              </span>
            }
            >{chatgroup ? chatgroup.qqNo : ''}
            </Description>
            <Description term={
              <span>
                Wechat Group
                <em className={styles.optional}>
                  <Icon type="wechat" style={{ marginLeft: 4, color: '#595959' }} />
                </em>
              </span>
            }
            >{chatgroup ? chatgroup.wechatNo : ''}
            </Description>
          </DescriptionList>
        </Card>
      </PageHeaderLayout>
    );
  }
}
