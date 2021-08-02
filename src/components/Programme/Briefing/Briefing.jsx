import React from 'react';
import { connect } from 'react-redux';
import { Input, Divider, Layout, List, Button, Space } from 'antd';
import { StarOutlined, CaretUpFilled, CaretDownFilled, DeleteFilled, PlusCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import dimension from './dimension';
import { actions } from '../../../redux/actions';
import './Briefing.scss';

const DATE_FORMAT2 = 'YYYY-MM-DD HH:mm';
const { Sider } = Layout;

class Briefing extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '行业版',
      numOfVersion: '第（）期',
      institution: '网络舆情中心',
      time: moment().format(DATE_FORMAT2),
      nowKey: '',
      keyList: [],
    };
  }

  componentDidMount() {
    this.props.onBriefingPathChange({ path: '/result' });
  }

  handleTitleChange=(e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleNumOfVersionChange=(e) => {
    this.setState({
      numOfVersion: e.target.value,
    });
  };

  handleInstitutionChange=(e) => {
    this.setState({
      institution: e.target.value,
    });
  };

  handleTimeChange=(e) => {
    this.setState({
      time: e.target.value,
    });
  };

  handleDragStart = e => {
    this.setState({
      nowKey: e.target.id,
    });
  };

    handleDragOver = e => {
      e.preventDefault();
    };

    handleDrop = e => {
      const { keyList, nowKey } = this.state;
      if (keyList.indexOf(nowKey) !== -1) {
        keyList.splice(keyList.indexOf(nowKey), 1);
        keyList.push(nowKey);
      } else {
        keyList.push(nowKey);
      }
      this.setState({
        keyList,
      });
    };

    handleDimensionUp = (key) => {
      const { keyList } = this.state;
      const pos = keyList.indexOf(key);
      if (pos !== 0) {
        keyList.splice(pos, 1);
        keyList.splice(pos - 1, 0, key);
      }
      this.setState({
        keyList,
      });
    };

    handleDimensionDown = (key) => {
      const { keyList } = this.state;
      const pos = keyList.indexOf(key);
      if (pos !== keyList.length) {
        keyList.splice(pos, 1);
        keyList.splice(pos + 1, 0, key);
      }
      this.setState({
        keyList,
      });
    };

    handleDimensionDel = (key) => {
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

    handleAddNewTemplate = e => {
      this.props.onBriefingPathChange({ path: '/result' });
    };

    handleReturn = e => {
      this.props.onBriefingPathChange({ path: '' });
    };

    render() {
      const { fid } = this.props.curProgramme;
      const { title, numOfVersion, institution, time, keyList, nowTag } = this.state;
      const curPath = this.props.briefingPath;

      switch (curPath) {
        case '':
          return (
            <Layout>
              <div className="enter-background">
                <div>
                  <span>自定义模板库</span>
                </div>
                <div className="add-template" onClick={this.handleAddNewTemplate}>
                  <div className="add-template-in">
                    <PlusCircleOutlined className="add-template-icon" />
                    <span className="add-template-span">自定义模板</span>
                  </div>
                </div>
              </div>
            </Layout>
          );
        case '/result':
          return (
            <Layout className="briefing-layout">
              <Sider className="briefing-layout-slider" theme="light">
                <List
                  bordered={false}
                  split={false}
                  dataSource={dimension}
                  renderItem={item => (
                    <List.Item>
                      <div className="list-items" id={item.id} draggable="true" onDragStart={this.handleDragStart}>
                        <item.icon />
                        {`  ${item.name}`}
                      </div>
                    </List.Item>
                  )}
                />
              </Sider>
              <div className="briefing-real">
                <div className="briefing-title">
                  <div className="title-div">
                    <Input className="title-input" value={title} bordered={false} onChange={this.handleTitleChange} />
                  </div>
                  <div className="subtitle-div">
                    <Input className="subtitle-input" defaultValue="第（）期" value={numOfVersion} bordered={false} onClick={this.handleNumOfVersionChange} />
                  </div>
                  <div className="tinytitle-div">
                    <Input className="institution" defaultValue="网络舆情中心" value={institution} bordered={false} onClick={this.handleInstitutionChange} />
                    <Input className="time" defaultValue={moment().format(DATE_FORMAT2)} value={time} bordered={false} onClick={this.handleTimeChange} />
                  </div>
                </div>
                <Divider className="briefing-divider"><StarOutlined /></Divider>
                <div className="briefing-dimension">
                  {keyList.map((key) => (
                    <div className="briefing-dimension-title">
                      <div className="briefing-dimension-title-name">
                        <span className="title-name-span">
                          {dimension[key - 1].name}
                        </span>
                      </div>
                      <div className="briefing-dimension-title-icon">
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
                <div className="add-dimension" onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
                  <span className="add-dimension-span1">添加维度</span>
                  <span className="add-dimension-span2">从左侧选择选择维度拖拽到此处</span>
                </div>
                <div className="handle-button">
                  <Space size="large">
                    <Button type="primary">保存</Button>
                    <Button type="primary" danger>删除</Button>
                    <Button type="default" onClick={this.handleReturn}>返回</Button>
                  </Space>
                </div>
              </div>
            </Layout>
          );
      }
    }
}

const mapStateToProps = (state) => ({
  userName: state.userName,
  curProgramme: state.curProgramme,
  briefingPath: state.briefingPath,
});
const mapDispatchToProps = {
  onProgrammeChange: actions.onProgrammeChange,
  onBriefingPathChange: actions.onBriefingPathChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Briefing);
