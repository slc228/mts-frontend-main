import React from 'react';
import { Layout, Tabs } from 'antd';
import Login from './Login/Login';
import Register from './Register/Register';
import './Authority.scss';

class Authority extends React.Component {
  render() {
    const roleList = [{ value: 'default', name: '普通用户' }, { value: 'tourist', name: '访问者' }];
    return (
      <Layout className="login-wrap">
        <Tabs className="login-tabs" type="card">
          <Tabs.TabPane tab="login" key="login">
            <Login />
          </Tabs.TabPane>
          <Tabs.TabPane tab="register" key="register">
            <Register
              roleList={roleList}
            />
          </Tabs.TabPane>
        </Tabs>
      </Layout>
    );
  }
}

export default Authority;
