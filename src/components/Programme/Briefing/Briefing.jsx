import React from 'react';
import { connect } from 'react-redux';
import { Input, Divider, Tag, Layout, Menu, List } from 'antd';
import { StarOutlined, EditOutlined, FacebookOutlined, CaretUpFilled, CaretDownFilled, DeleteFilled } from '@ant-design/icons';
import moment from 'moment';
import dimension from './dimension';
import { actions } from '../../../redux/actions';
import './Briefing.scss';

const DATE_FORMAT2 = 'YYYY-MM-DD HH:mm';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

class Briefing extends React.Component {
  constructor() {
    super();
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      nowKey: '',
      keyList: [],
    };
  }

  onDragStart=e => {
    console.log(e.target.id);
    this.setState({
      nowTag: e.target.id,
    });
  };

  onDragOver=e => {
    e.preventDefault();
  };

  onDrop=e => {
    const { keyList, nowTag } = this.state;
    if (keyList.indexOf(nowTag) !== -1) {
      keyList.splice(keyList.indexOf(nowTag), 1);
      keyList.push(nowTag);
    } else {
      keyList.push(nowTag);
    }
    this.setState({
      keyList,
    });
    console.log(keyList);
  };

  handleDimensionUp=(key) => {
    const { keyList } = this.state;
    const pos = keyList.indexOf(key);
    if (pos !== 0) {
      keyList.splice(pos, 1);
      keyList.splice(pos - 1, 0, key);
    }
    this.setState({
      keyList,
    });
    console.log(keyList);
  };

  handleDimensionDown=(key) => {
    const { keyList } = this.state;
    const pos = keyList.indexOf(key);
    if (pos !== keyList.length) {
      keyList.splice(pos, 1);
      keyList.splice(pos + 1, 0, key);
    }
    this.setState({
      keyList,
    });
    console.log(keyList);
  };

  handleDimensionDel=(key) => {
    const { keyList } = this.state;
    const pos = keyList.indexOf(key);
    if (pos !== keyList.length) {
      keyList.splice(pos, 1);
    }
    this.setState({
      keyList,
    });
    console.log(keyList);
  };

  render() {
    const { fid } = this.props.curProgramme;
    const { keyList, nowTag } = this.state;

    return (
      <Layout className="briefing-layout">
        <Sider className="briefing-layout-slider" theme="light">
          <List
            bordered={false}
            split={false}
            dataSource={dimension}
            renderItem={item => (
              <List.Item>
                <div
                  className="list-items"
                  id={item.id}
                  draggable="true"
                  onDragStart={this.onDragStart}
                >
                  <item.icon />
                  {`  ${item.name}`}
                </div>
              </List.Item>
            )}
          />
        </Sider>
        <div className="briefing-real">
          <div className="briefing-title">
            <div
              className="title-div"
            >
              <Input className="title-input" defaultValue="行业版" bordered={false} />
            </div>
            <div
              className="subtitle-div"
            >
              <Input className="subtitle-input" defaultValue="第（）期" bordered={false} />
            </div>
            <div
              className="tinytitle-div"
            >
              <Input className="institution" defaultValue="网络舆情中心" bordered={false} />
              <Input className="time" defaultValue={moment().format(DATE_FORMAT2)} bordered={false} />
            </div>
          </div>
          <Divider className="briefing-divider"><StarOutlined /></Divider>
          <div className="briefing-dimension">
            {keyList.map((key) => (
              <div className="briefing-dimension-title" style={{ width: '100%' }}>
                <div className="briefing-dimension-title-name" style={{ height: '30px', width: '50%', float: 'left' }}>
                  <span style={{ fontSize: '20px', borderBottom: '3px solid #1890ff' }}>
                    {dimension[key - 1].name}
                  </span>
                </div>
                <div style={{ height: '30px', width: '50%', float: 'right', textAlign: 'right', fontSize: '20px', color: '#1890ff' }}>
                  <CaretUpFilled onClick={() => this.handleDimensionUp(key)} />
                  <Divider type="vertical" />
                  <CaretDownFilled onClick={() => this.handleDimensionDown(key)} />
                  <Divider type="vertical" />
                  <DeleteFilled onClick={() => this.handleDimensionDel(key)} />
                </div>
                <Divider />
              </div>
            ))}
          </div>
          <div className="add-dimension" onDragOver={this.onDragOver} onDrop={this.onDrop}>
            <span className="add-dimension-span1">添加维度</span>
            <span className="add-dimension-span2">从左侧选择选择维度拖拽到此处</span>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.userName,
  curProgramme: state.curProgramme,
});
const mapDispatchToProps = {
  onProgrammeChange: actions.onProgrammeChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Briefing);
