import React from 'react';
import { Menu, Dropdown } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { LogoutOutlined, RadarChartOutlined } from '@ant-design/icons';
import getRoutes from '../getRoutes';
import './Header.scss';
import { connect } from 'react-redux';
import logout from '../../../services/request/auth/logout';
import login from '../../../services/request/auth/login';
import { actions } from '../../../redux/actions';

const history = createBrowserHistory();

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current: 'home' };
    /* this.userMenu = (
      <Menu
        theme="dark"
      >
        <Menu.Item onClick={this.handleLogout}>
          登出
        </Menu.Item>
      </Menu>
    ); */
  }

  handleLogout = async () => {
    // const result = await logout();
    // if (result.logout !== 1) alert('登出失败');
    // else {
    //   alert('登出成功');
    //   localStorage.removeItem('userName');
    //   localStorage.removeItem('userType');
    //   this.props.onAuthChange();
    //   this.props.history.push('/login');
    // }
    localStorage.removeItem('userName');
    localStorage.removeItem('userType');
    this.props.onAuthChange();
    this.props.history.push('/login');
  };

  handleClick = (e) => {
    if (e.key === 'search') this.props.onOverallPathChange({ path: '' });
    this.setState({ current: e.key });
  };

  componentDidMount = () => {
    const { userType } = this.props;
    const { pathname } = this.props.location;
    const routeLinks = getRoutes(userType).map((item) => item.link);
    let text = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length);
    if (!routeLinks.includes(text)) text = 'home';
    this.setState({ current: text });
    history.listen((event) => {
      const test = event.location.pathname;
      console.log(test);
      const current = test.substring(test.lastIndexOf('/') + 1, test.length);
      this.setState({ current });
    });
  };

  render() {
    const { userType, userName } = this.props;
    const { current } = this.state;
    return (
      <div className="mts-header-container">
        <div className="top-bar">
          <span className="title">
            <RadarChartOutlined />
            &nbsp;
            舆情监测系统
          </span>
          <span className="logout" onClick={this.handleLogout}>
            <LogoutOutlined />
          </span>
          <span className="username">{userName}</span>
        </div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
          className="mts-header"
          theme="dark"
        >
          {getRoutes(userType).map((route) => (
            route.hasOwnProperty('type') ? null : (
              <Menu.Item key={route.key}>
                <Link
                  to={route.link}
                  className="link"
                >
                  {route.label}
                </Link>
              </Menu.Item>
            )
          ))}
          <Menu.SubMenu key="Admin" title="管理" style={{ fontSize: '16px' }}>
            {getRoutes(userType).map((route) => (
              route.hasOwnProperty('type') ? (
                <Menu.Item key={route.key}>
                  <Link
                    to={route.link}
                    className="link"
                  >
                    {route.label}
                  </Link>
                </Menu.Item>
              ) : null
            ))}
          </Menu.SubMenu>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userType: state.userType,
  userName: state.userName,
});
const mapDispatchToProps = {
  onAuthChange: actions.onAuthChange,
  onOverallPathChange: actions.onOverallPathChange,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Header));
