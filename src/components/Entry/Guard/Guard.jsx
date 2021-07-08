import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Entry from '../Entry';
import Authority from '../../Authority/Authority';
import { actions } from '../../../redux/actions';

class Guard extends React.Component {
  componentDidMount() {
    this.props.onAuthChange();
  }

  render() {
    const { userName, userType } = this.props;
    const redirectPath = userName ? '/home' : '/login';
    console.log(userName, userType, redirectPath);
    return (
      <Switch>
        {userName && <Route path="/" component={Entry} />}
        {!userName && <Route path="/login" component={Authority} />}
        <Redirect from="/*" to={redirectPath} />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.userName,
  userType: state.userType,
});
const mapDispatchToProps = {
  onAuthChange: actions.onAuthChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Guard);
