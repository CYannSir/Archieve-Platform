import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import { Icon, Steps, Card } from 'antd';
import DescriptionList from 'components/DescriptionList';
import classNames from 'classnames';
import styles from './Account.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Step } = Steps;
const { Description } = DescriptionList;
const getWindowWidth = () => (window.innerWidth || document.documentElement.clientWidth);

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

const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      温州市瑞安市
      <Icon href="https://map.baidu.com/" type="environment-o" style={{ marginLeft: 8 }} />
    </Fragment>
    <div>2016-12-12</div>
  </div>
);

const desc2 = (
  <div className={styles.stepDescription}>
    <Fragment>
      杭州市拱墅区
      <Icon href="https://map.baidu.com/" type="environment-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
    </Fragment>
    <div>2016-12-12</div>
  </div>
);
@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchAccount'],
}))

export default class Account extends Component {
  state = {
    stepDirection: 'horizontal',
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchAccount',
    });

    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
    this.setStepDirection.cancel();
  }
  @Bind()
  @Debounce(200)
  setStepDirection() {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  }

  render() {
    const { stepDirection } = this.state;

    return (
      <PageHeaderLayout
        title="Account"
        logo={<img alt="Archive" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
        content={description}
      >
        <Card title="Account" style={{ marginBottom: 24 }} bordered={false}>
          <Steps direction={stepDirection} progressDot current={1}>
            <Step title="Level 1" description={desc1} />
            <Step title="Level 2" description={desc2} />
          </Steps>
        </Card>
      </PageHeaderLayout>
    );
  }
}
