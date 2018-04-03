import React from 'react';
import { Button } from 'antd';
import { Link } from 'dva/router';
import Result from 'components/Result';
import styles from './RegisterResult.less';

const actions = (
  <div className={styles.actions}>
    <Link to="/home"><Button size="large">Return Index</Button></Link>
  </div>
);

export default ({ location }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={
      <div className={styles.title}>
        Your Account:{location.state ? location.state.account : 'ArchiveBook@tech.com'} Registration success
      </div>
    }
    description="The activation email has been sent to your email. The email is valid for 24 hours. Please log in to the e-mail and click on the link in the email to activate the account"
    actions={actions}
    style={{ marginTop: 56 }}
  />
);
