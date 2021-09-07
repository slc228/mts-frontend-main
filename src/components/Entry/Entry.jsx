import { Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import { Layout } from 'antd';
import Header from './Header/Header';
import getRoutes from './getRoutes';
import './Entry.scss';

import { connect } from 'react-redux';

class Entry extends React.Component {
  render() {
    const { userType, userJurisdiction } = this.props;
    return (
      <Layout className="mts-app-wrap">
        <Header />
        <Layout.Content
          className="mts-app-body"
          ref={r => this.body = r}
        >
          <Switch>
            {getRoutes(userType, userJurisdiction).map((item) => (
              <Route path={item.link} component={item.component} />
            ))}
            <Redirect from="/*" to="/home" />
          </Switch>
        </Layout.Content>
        <Layout.Footer className="mts-footer">Shanghai Jiaotong University</Layout.Footer>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  userType: state.userType,
  userJurisdiction: state.userJurisdiction,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Entry);
