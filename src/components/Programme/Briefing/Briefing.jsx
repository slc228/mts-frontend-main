import React from 'react';
import { connect } from 'react-redux';
import { Input, Divider, Layout, List, Button, Space, Image, Affix } from 'antd';
import { StarOutlined, CaretUpFilled, CaretDownFilled, DeleteFilled, PlusCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import dimension from './dimension';
import { actions } from '../../../redux/actions';
import './Briefing.scss';
import saveBriefingTemplate from '../../../services/request/data/saveBriefingTemplate';
import deleteBriefingTemplate from '../../../services/request/data/deleteBriefingTemplate';
import getBriefingTemplate from '../../../services/request/data/getBriefingTemplate';
import getFangAnMonitor from '../../../services/request/data/getFangAnMonitor';

const DATE_FORMAT2 = 'YYYY-MM-DD HH:mm';
const { Sider } = Layout;

class Briefing extends React.Component {
  constructor() {
    super();
    this.state = {
      templateList: [],
      title: '行业版',
      numOfVersion: '第（）期',
      institution: '网络舆情中心',
      time: moment().format(DATE_FORMAT2),
      nowId: 0,
      nowKey: 0,
      keyList: [],
      hid: false,
      divHiddenList: dimension.map((item) => ({ hid: item.divHidden })),
      text: {},
    };
  }

  componentDidMount() {
    this.props.onBriefingPathChange({ path: '' });
    this.handleGetTemplate();
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

  handleDragStart = (e) => {
    this.setState({
      nowKey: e.target.id,
    });
    const { divHiddenList } = this.state;
    divHiddenList.splice(e.target.id - 1, 1, { hid: false });
    setTimeout(() => {
      this.setState({
        divHiddenList,
      });
    }, 0);
  };

  handleDragEnd= (e) => {
    const { divHiddenList, nowKey } = this.state;
    divHiddenList.splice(nowKey - 1, 1, { hid: true });
    this.setState({
      divHiddenList,
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

  handleTextChange=(name, event) => {
    const { text } = this.state;
    text[name] = event.target.value;
    this.setState({
      text,
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
  };

  handleOpenTemplate=(item) => {
    const keyList = item.keylist.length === 0 ? [] : item.keylist.split(',');
    const text = JSON.parse(item.text) ? JSON.parse(item.text) : {};
    this.setState({
      title: item.title,
      numOfVersion: item.version,
      institution: item.institution,
      time: moment(item.time).format(DATE_FORMAT2),
      nowId: item.id,
      nowKey: '',
      keyList,
      text,
    });
    this.props.onBriefingPathChange({ path: '/result' });
  };

  handleAddNewTemplate = e => {
    this.setState({
      title: '行业版',
      numOfVersion: '第（）期',
      institution: '网络舆情中心',
      time: moment().format(DATE_FORMAT2),
      nowId: 0,
      nowKey: '',
      keyList: [],
      text: {},
    });
    this.props.onBriefingPathChange({ path: '/result' });
  };

  handleReturn = e => {
    this.props.onBriefingPathChange({ path: '' });
  };

  handleGetTemplate = async () => {
    const { fid } = this.props.curProgramme;
    const result = await getBriefingTemplate(fid);
    this.setState({
      templateList: result,
    });
  };

    handleSaveTemplate=async e => {
      const { fid } = this.props.curProgramme;
      const { nowId, title, numOfVersion, institution, time, keyList, text } = this.state;
      const params = [nowId, fid, title, numOfVersion, institution, time, keyList, text];
      const result = await saveBriefingTemplate(...params);
      await this.handleGetTemplate();
      this.props.onBriefingPathChange({ path: '' });
    };

    handleDeleteTemplate=async e => {
      const { nowId } = this.state;
      const result = await deleteBriefingTemplate(nowId);
      await this.handleGetTemplate();
      this.props.onBriefingPathChange({ path: '' });
    };

  turnToSpecific=() => {
    this.props.onPageTagChange({
      curPageTag: 'info',
    });
  };

  render() {
    const { fid } = this.props.curProgramme;
    const { title, numOfVersion, institution, time, keyList, templateList, divHiddenList, text } = this.state;
    const curPath = this.props.briefingPath;

    switch (curPath) {
      case '':
        return (
          <Layout>
            <div className="enter-background">
              <div>
                <span>自定义模板库</span>
              </div>
              {templateList.length === 0 ? null : (templateList.map((item) => (
                <div className="added-template" onClick={() => this.handleOpenTemplate(item)}>
                  <div className="added-template-in">
                    <span className="added-template-span">{item.title}</span>
                    <span className="added-template-span">{item.institution}</span>
                    <span className="added-template-span">{item.version}</span>
                    <span className="added-template-span">{moment(item.time).format(DATE_FORMAT2)}</span>
                  </div>
                </div>
              ))
              )}
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
              <Affix>
                <List
                  bordered={false}
                  split={false}
                  dataSource={dimension}
                  renderItem={item => (
                    <List.Item>
                      <div className="list-items" id={item.id} draggable="true" onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd}>
                        <item.icon />
                        {`  ${item.name}`}
                        <Image src={item.src} hidden={divHiddenList[item.id - 1].hid} />
                      </div>
                    </List.Item>
                  )}
                />
              </Affix>
            </Sider>
            <div className="briefing-real">
              <div className="briefing-title">
                <div className="title-div">
                  <Input className="title-input" value={title} bordered={false} onChange={this.handleTitleChange} />
                </div>
                <div className="subtitle-div">
                  <Input className="subtitle-input" defaultValue="第（）期" value={numOfVersion} bordered={false} onChange={this.handleNumOfVersionChange} />
                </div>
                <div className="tinytitle-div">
                  <Input className="institution" defaultValue="网络舆情中心" value={institution} bordered={false} onChange={this.handleInstitutionChange} />
                  <Input className="time" defaultValue={moment().format(DATE_FORMAT2)} value={time} bordered={false} onChange={this.handleTimeChange} />
                </div>
              </div>
              <Divider className="briefing-divider"><StarOutlined /></Divider>
              <div className="briefing-dimension">
                {keyList.length === 0 ? null : (keyList.map((key) => (
                  <div>
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
                    </div>
                    <Divider />
                    <div className="briefing-dimension-content">
                      {dimension[key - 1].type === 'input' ?
                        <Input.TextArea rows={4} value={text[dimension[key - 1].name]} onChange={this.handleTextChange.bind(this, dimension[key - 1].name)} />
                        : <Image width={800} height={300} src={dimension[key - 1].src} />}
                    </div>
                  </div>
                )))}
              </div>
              <div className="add-dimension" onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
                <span className="add-dimension-span1">添加维度</span>
                <span className="add-dimension-span2">从左侧选择选择维度拖拽到此处</span>
              </div>
              <div className="handle-button">
                <Space size="large">
                  <Button type="primary" onClick={this.handleSaveTemplate}>保存</Button>
                  <Button type="primary" danger onClick={this.handleDeleteTemplate}>删除</Button>
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
  curPageTag: state.curPageTag,
});
const mapDispatchToProps = {
  onPageTagChange: actions.onPageTagChange,
  onProgrammeChange: actions.onProgrammeChange,
  onBriefingPathChange: actions.onBriefingPathChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Briefing);
