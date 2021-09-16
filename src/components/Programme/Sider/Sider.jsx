import React from 'react';
import { Button, Input, Menu, Modal, Layout } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import getProgrammes from '../../../services/request/programme/getProgrammes';
import './Sider.scss';
import { connect } from 'react-redux';
import addProgramme from '../../../services/request/programme/addProgramme';
import { actions } from '../../../redux/actions';
import Overall from '../../Overall/Overall';
import HotArticle from '../HotArticle/HotArticle';
import View from '../../View/View';

class Sider extends React.Component {
  constructor() {
    super();
    this.state = {
      newProgrammeVisible: false,
      newProgrammeName: '',
    };
  }

  componentDidMount() {
    this.getProgrammes('init');
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { curProgramme } = this.props;
    if (!prevProps.curProgramme || !curProgramme) return;
    if (prevProps.curProgramme.fid !== curProgramme.fid || prevProps.curProgramme.name !== curProgramme.name) {
      this.getProgrammes();
    }
  }

  getProgrammes = async (type) => {
    const programmes = await getProgrammes(this.props.userName);
    const { curProgramme } = this.props;
    if (type === 'new') {
      this.props.onProgrammesChange({
        programmes,
        curProgramme: programmes[programmes.length - 1],
      });
    } else if (type === 'init') {
      this.props.onProgrammesChange({
        programmes,
        curProgramme: curProgramme || programmes[0],
      });
    } else {
      this.props.onProgrammesChange({
        programmes,
        curProgramme,
      });
    }
  };

  handleProgrammeNew = (type, data) => {
    switch (type) {
      case 'open':
        this.setState({ newProgrammeVisible: true });
        break;
      case 'ok':
        this.addProgramme();
        this.setState({
          newProgrammeVisible: false,
          newProgrammeName: '',
        });
        break;
      case 'cancel':
        this.setState({
          newProgrammeVisible: false,
          newProgrammeName: '',
        });
        break;
      case 'name':
        this.setState({ newProgrammeName: data.name });
        break;
      default: break;
    }
  };

  addProgramme = async () => {
    const { userName } = this.props;
    const name = this.state.newProgrammeName;
    const result = await addProgramme({ userName, name });
    if (result.addProgramme !== 1) { alert('添加失败'); } else {
      alert('添加成功');
      this.getProgrammes('new');
      this.props.onPageTagChange({ curPageTag: 'config' });
    }
  };

  handleProgrammeSelect = (e) => {
    const curProgramme = this.props.programmes.find((item) => item.fid === parseInt(e.key, 10));
    this.props.onProgrammeChange({ curProgramme });
  };

  render() {
    const { curProgramme, programmes, userType, userJurisdiction } = this.props;
    console.log(programmes);
    const { newProgrammeVisible, newProgrammeName } = this.state;
    const jurisdiction = userJurisdiction ? JSON.parse(userJurisdiction) : undefined;
    return (
      <Layout.Sider
        className="programme-sider-wrap"
      >
        {jurisdiction.schemeConfiguration ? (
          <Button
            block="block"
            type="primary"
            className="programme-new-btn"
            size="large"
            onClick={() => this.handleProgrammeNew('open')}
          >
            <PlusOutlined />
            添加方案
          </Button>
        ) : null}
        <Modal
          title="添加方案"
          visible={newProgrammeVisible}
          onCancel={() => this.handleProgrammeNew('cancel')}
          onOk={() => this.handleProgrammeNew('ok')}
        >
          <div style={{ fontSize: '16px', marginBottom: '5px' }}>方案名称</div>
          <Input
            value={newProgrammeName}
            onChange={e => this.handleProgrammeNew('name', { name: e.target.value })}
          />
        </Modal>
        <Menu
          onClick={this.handleProgrammeSelect}
          selectedKeys={[curProgramme?.fid.toString()]}
          mode="inline"
        >
          { programmes.map((item) => (
            <Menu.Item key={item.fid.toString()}>{item.name}</Menu.Item>
          ))}
        </Menu>
      </Layout.Sider>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.userName,
  userType: state.userType,
  userJurisdiction: state.userJurisdiction,
  curProgramme: state.curProgramme,
  programmes: state.programmes,
});
const mapDispatchToProps = {
  onProgrammesChange: actions.onProgrammesChange,
  onProgrammeChange: actions.onProgrammeChange,
  onPageTagChange: actions.onPageTagChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Sider);
