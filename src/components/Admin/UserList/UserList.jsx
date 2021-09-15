import React from 'react';
import { Table, Divider, Image, Button, Layout, Input, Modal, Menu, Checkbox, Tooltip } from 'antd';
import { Switch } from 'antd/es';
import { CloseOutlined, CheckOutlined, PlusCircleOutlined, PlusCircleFilled, EditOutlined } from '@ant-design/icons';
import changeUserState from '../../../services/request/auth/changeUserState';
import changeUserJurisdiction from '../../../services/request/data/changeUserJurisdiction';
import Register from '../../Authority/Register/Register';
import changeUserEventLimiter from '../../../services/request/data/changeUserEventLimiter';
import getSensitiveWordTypes from '../../../services/request/data/getSensitiveWordTypes';
import getSensitiveWords from '../../../services/request/data/getSensitiveWords';
import changeUserSensitiveLimiter from '../../../services/request/data/changeUserSensitiveLimiter';

class UserList extends React.Component {
  constructor() {
    super();
    this.state = {
      addNewUserVisible: false,
      swordTypes: [],
      curSwordType: undefined,
      swords: [],
      swordsList: [],
      addNewSwordVisible: false,
      checkedSwordsList: [],
      checkedSwords: [],
      nowUser: undefined,
    };
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '权限',
        dataIndex: 'role',
        key: 'role',
        render: (field) => {
          if (field === 'admin') {
            return '管理员';
          }
          if (field === 'default') {
            return '普通用户';
          }
          if (field === 'tourist') {
            return '访问者';
          }
        },
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
    ];
  }

  changeSwordsType=async (e) => {
    await this.setState({
      curSwordType: e.key,
    });
    const { swordsList, checkedSwordsList } = this.state;
    let swords;
    swordsList.forEach((item) => {
      if (item.type === e.key) {
        swords = item.swords;
      }
    });
    let checkedSwords;
    checkedSwordsList.forEach((item) => {
      if (item.type === e.key) {
        checkedSwords = item.checkedSwords;
      }
    });
    this.setState({
      checkedSwords,
      swords,
    });
  };

  addNewSword=async (record) => {
    const swordTypes = await getSensitiveWordTypes();
    const swordsList = [];
    const checkedSwordsList = [];
    for (const item of swordTypes) {
      const swords = await getSensitiveWords(item.type);
      const swordsArray = swords.length > 0 ? swords.map((item1) => item1.value) : [];
      const sensitiveWords = record.sensitiveLimiter ? record.sensitiveLimiter.split(/\s+/) : [];
      const newArr = [];
      for (let i = 0; i < swordsArray.length; i++) {
        for (let j = 0; j < sensitiveWords.length; j++) {
          if (sensitiveWords[j] === swordsArray[i]) {
            newArr.push(sensitiveWords[j]);
          }
        }
      }
      const swordsListItem = {};
      swordsListItem.type = item.type;
      swordsListItem.swords = swords;
      swordsList.push(swordsListItem);
      const checkedSwordsListItem = {};
      checkedSwordsListItem.type = item.type;
      checkedSwordsListItem.checkedSwords = newArr;
      checkedSwordsList.push(checkedSwordsListItem);
    }
    this.setState({
      swordTypes,
      curSwordType: swordTypes.length === 0 ? undefined : swordTypes[0].type,
      swordsList,
      swords: swordsList.length === 0 ? undefined : swordsList[0].swords,
      checkedSwordsList,
      checkedSwords: checkedSwordsList.length === 0 ? undefined : checkedSwordsList[0].checkedSwords,
      addNewSwordVisible: true,
      nowUser: record.username,
    });
  };

  handleCheck = (value) => {
    const { curSwordType, checkedSwordsList } = this.state;
    checkedSwordsList.forEach((item) => {
      if (item.type === curSwordType) {
        item.checkedSwords = value;
      }
    });
    this.setState({
      checkedSwords: value,
      checkedSwordsList,
    });
  };

  addNewSwordToUser=async () => {
    const { checkedSwordsList, nowUser } = this.state;
    let sensitiveLimiterList = [];
    checkedSwordsList.forEach((item) => {
      sensitiveLimiterList = sensitiveLimiterList.concat(item.checkedSwords);
    });
    const sensitiveLimiterStr = sensitiveLimiterList.toString().replace(/,/g, ' ');
    const ret = await changeUserSensitiveLimiter(nowUser, sensitiveLimiterStr);
    if (ret.changeUserSensitiveLimiter === 1) {
      alert('修改成功');
    } else {
      alert('修改失败');
    }
    await this.handleAddSwordModalCancel();
  };

  handleChange = async (username) => {
    console.log(username);
    const result = await changeUserState(username);
    if (result.changeUserState) {
      alert('编辑成功！');
    } else alert('编辑失败！');
  };

    changeUserJurisdiction=async (checked, record, type) => {
      const ret = await changeUserJurisdiction(record.username, type, checked);
    };

  handleAddNewUser=() => {
    this.setState({
      addNewUserVisible: true,
    });
  };

  handleAddUserModalCancel=() => {
    this.setState({
      addNewUserVisible: false,
    });
    const { onGetUsers } = this.props;
    onGetUsers();
  };

  handleEventLimiterInputChange=(e, record) => {
    record.eventLimiter = e.target.value;
  };

  handleChangeUserEventLimiter=async (record) => {
    const ret = await changeUserEventLimiter(record.username, record.eventLimiter);
    if (ret.changeUserEventLimiter === 1) {
      alert('修改成功');
    } else {
      alert('修改失败');
    }
  };

  handleAddSwordModalCancel=() => {
    this.setState({
      addNewSwordVisible: false,
    });
    const { onGetUsers } = this.props;
    onGetUsers();
  };

  render() {
    const { addNewUserVisible, swordTypes, curSwordType, swords, addNewSwordVisible, checkedSwords } = this.state;
    const { users } = this.props;
    console.log(users);
    return (
      <Layout>
        <div className="enter-background">
          <Button style={{ marginBottom: '10px' }} icon={<PlusCircleOutlined />} type="primary" onClick={this.handleAddNewUser}>添加新用户</Button>
          <Table
            columns={this.columns}
            rowKey={(record) => record.username}
            expandable={{
              expandedRowRender: (record) => {
                const jurisdiction = record.userRights;
                return (
                  <div>
                    <div style={{ width: '100%' }}>

                      <div
                        style={{ width: '14%', float: 'left', textAlign: 'center', fontSize: '14px' }}
                      >
                        数据大屏
                        <Divider type="vertical" />
                        <Switch
                          size="small"
                          defaultChecked={jurisdiction.dataScreen}
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                          onChange={(checked) => this.changeUserJurisdiction(checked, record, 'dataScreen')}
                        />
                      </div>
                      <div
                        style={{ width: '14%', float: 'left', textAlign: 'center', fontSize: '14px' }}
                      >
                        新建和配置方案
                        <Divider type="vertical" />
                        <Switch
                          size="small"
                          defaultChecked={jurisdiction.schemeConfiguration}
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                          onChange={(checked) => this.changeUserJurisdiction(checked, record, 'schemeConfiguration')}
                        />
                      </div>
                      <div
                        style={{ width: '14%', float: 'left', textAlign: 'center', fontSize: '14px' }}
                      >
                        全网搜索
                        <Divider type="vertical" />
                        <Switch
                          size="small"
                          defaultChecked={jurisdiction.globalSearch}
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                          onChange={(checked) => this.changeUserJurisdiction(checked, record, 'globalSearch')}
                        />
                      </div>
                      <div
                        style={{ width: '14%', float: 'left', textAlign: 'center', fontSize: '14px' }}
                      >
                        舆情分析
                        <Divider type="vertical" />
                        <Switch
                          size="small"
                          defaultChecked={jurisdiction.analysis}
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                          onChange={(checked) => this.changeUserJurisdiction(checked, record, 'analysis')}
                        />
                      </div>
                      <div
                        style={{ width: '14%', float: 'left', textAlign: 'center', fontSize: '14px' }}
                      >
                        舆情预警配置
                        <Divider type="vertical" />
                        <Switch
                          size="small"
                          defaultChecked={jurisdiction.warning}
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                          onChange={(checked) => this.changeUserJurisdiction(checked, record, 'warning')}
                        />
                      </div>
                      <div
                        style={{ width: '14%', float: 'left', textAlign: 'center', fontSize: '14px' }}
                      >
                        简报生成与发送
                        <Divider type="vertical" />
                        <Switch
                          size="small"
                          defaultChecked={jurisdiction.briefing}
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                          onChange={(checked) => this.changeUserJurisdiction(checked, record, 'briefing')}
                        />
                      </div>
                      <div
                        style={{ width: '14%', float: 'left', textAlign: 'center', fontSize: '14px' }}
                      >
                        用户权限
                        <Divider type="vertical" />
                        <Switch
                          size="small"
                          defaultChecked={record.status}
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                          onChange={() => this.handleChange(record.username)}
                        />
                      </div>
                    </div>
                    <div
                      style={{ width: '48%', float: 'left', margin: '10px 1%' }}
                    >
                      <Tooltip
                        title={(
                          <div style={{ textAlign: 'center' }}>
                            <p>请直接在文本框进行修改</p>
                            <p>以空格键隔开词语</p>
                          </div>
                      )}
                        trigger="click"
                      >
                        <Input.TextArea rows={4} defaultValue={record.eventLimiter} onChange={(e) => this.handleEventLimiterInputChange(e, record)} />
                      </Tooltip>
                      <Button style={{ marginTop: '10px' }} icon={<EditOutlined />} type="primary" onClick={() => this.handleChangeUserEventLimiter(record)}>修改搜索限定词</Button>
                    </div>
                    <div
                      style={{ width: '48%', float: 'left', margin: '10px 1%' }}
                    >
                      <Tooltip title="请点击按钮进行修改">
                        <Input.TextArea rows={4} value={record.sensitiveLimiter} />
                      </Tooltip>
                      <Button style={{ marginTop: '10px' }} icon={<EditOutlined />} type="primary" onClick={() => this.addNewSword(record)}>修改敏感限定词</Button>
                    </div>
                  </div>
                );
              },
              rowExpandable: record => true,
            }}
            dataSource={users}
          />
          <Modal
            visible={addNewUserVisible}
            onCancel={this.handleAddUserModalCancel}
            closable={false}
            title="请输入信息添加用户"
            footer={null}
          >
            <Register />
          </Modal>
          <Modal
            visible={addNewSwordVisible}
            onCancel={this.handleAddSwordModalCancel}
            closable={false}
            title={(
              <Button
                icon={<PlusCircleFilled />}
                style={{ fontSize: '15px' }}
                type="primary"
                onClick={this.addNewSwordToUser}
              >
                确认修改
              </Button>
              )}
            footer={null}
            width={1200}
          >
            <Menu onClick={this.changeSwordsType} mode="horizontal" selectedKeys={[curSwordType]} theme="light">
              { swordTypes.map((item) => (
                <Menu.Item key={item.type.toString()}>{item.type}</Menu.Item>
              ))}
            </Menu>
            <div>
              <Checkbox.Group options={swords} onChange={this.handleCheck} value={checkedSwords} />
            </div>
          </Modal>
        </div>
      </Layout>
    );
  }
}

export default UserList;
