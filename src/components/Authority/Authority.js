import React from 'react';
import { Layout, Tabs } from 'antd';
import LoginForm from './Login/Login';
import RegisterForm from './Register/Register';
import './Authority.scss';

class Authority extends React.Component {
  render() {
    return (
      <Layout className="login-wrap">
        <Tabs className="login-tabs" type="card">
          <Tabs.TabPane tab="login" key="login">
            <LoginForm />
          </Tabs.TabPane>
          <Tabs.TabPane tab="register" key="register">
            <RegisterForm />
          </Tabs.TabPane>
        </Tabs>
      </Layout>
    );
  }
}

export default Authority;
