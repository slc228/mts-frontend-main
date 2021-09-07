import React from 'react';
import { Table, Divider, Image, Button, Layout, Input, Modal, Menu, Checkbox } from 'antd';
import { Switch } from 'antd/es';
import { CloseOutlined, CheckOutlined, PlusCircleOutlined, PlusCircleFilled } from '@ant-design/icons';
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
      addNewSwordVisible: false,
      checkedSwordsList: [],
      checkedSwords: [],
      nowRecord: {},
    };
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '权限',
        dataIndex: 'userType',
        key: 'userType',
        render: (field) => (field === 'admin' ? '管理员' : '普通用户'),
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

  handleGetSwordTypes=async () => {
    const swordTypes = await getSensitiveWordTypes();
    this.setState({
      swordTypes,
      curSwordType: swordTypes.length === 0 ? undefined : swordTypes[0].type,
      checkedSwordsList: swordTypes.length > 0 ? swordTypes.map((item) => ({
        type: item.type,
        checkedSwords: [],
      })) : [],
    });
  };

  handleGetSwords=async () => {
    const { curSwordType } = this.state;
    const swords = await getSensitiveWords(curSwordType);
    this.setState({
      swords,
    });
  };

  changeSwordsType=async (e) => {
    await this.setState({
      curSwordType: e.key,
    });
    await this.handleGetSwords();
    const { checkedSwordsList } = this.state;
    let checkedSwords;
    checkedSwordsList.forEach((item) => {
      if (item.type === e.key) {
        checkedSwords = item.checkedSwords;
      }
    });
    this.setState({
      checkedSwords,
    });
  };

  addNewSword=(record) => {
    const { swordTypes } = this.state;
    this.setState({
      nowRecord: record,
      addNewSwordVisible: true,
      checkedSwordsList: swordTypes.length > 0 ? swordTypes.map((item) => ({
        type: item.type,
        checkedSwords: [],
      })) : [],
      checkedSwords: [],
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
    const { checkedSwordsList, nowRecord } = this.state;
    let sensitiveLimiterList = [];
    checkedSwordsList.forEach((item) => {
      sensitiveLimiterList = sensitiveLimiterList.concat(item.checkedSwords);
    });
    const sensitiveWords = nowRecord.sensitiveLimiter ? nowRecord.sensitiveLimiter.split(/\s+/) : [];
    sensitiveLimiterList = sensitiveLimiterList.concat(sensitiveWords);
    sensitiveLimiterList = Array.from(new Set(sensitiveLimiterList));
    const sensitiveLimiterStr = sensitiveLimiterList.toString().replace(/,/g, ' ');
    const ret = await changeUserSensitiveLimiter(nowRecord.username, sensitiveLimiterStr);
    if (ret.changeUserSensitiveLimiter === 1) {
      alert('修改成功');
    } else {
      alert('修改失败');
    }
    await this.handleAddSwordModalCancel();
  };

  async componentDidMount() {
    await this.handleGetSwordTypes();
    await this.handleGetSwords();
  }

  handleChange = async (username) => {
    console.log(username);
    const result = await changeUserState(username);
    if (result.changeUserState) {
      alert('编辑成功！');
    } else alert('编辑失败！');
  };

    changeUserJurisdiction=async (checked, record, type, jurisdiction) => {
      jurisdiction.forEach(item => {
        if (item.type === type) {
          item.tag = checked;
        }
      });
      const ret = await changeUserJurisdiction(record.username, JSON.stringify(jurisdiction));
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
    return (
      <Layout>
        <div className="enter-background">
          <Button style={{ marginBottom: '10px' }} icon={<PlusCircleOutlined />} type="primary" onClick={this.handleAddNewUser}>添加新用户</Button>
          <Table
            columns={this.columns}
            rowKey={(record) => record.username}
            expandable={{
              expandedRowRender: (record) => {
                const jurisdiction = JSON.parse(record.jurisdiction);
                return (
                  <div>
                    <div style={{ width: '100%' }}>
                      {jurisdiction.map(item => (
                        <div
                          style={{ width: '20%', float: 'left', textAlign: 'center' }}
                        >
                          {item.type}
                          <Divider type="vertical" />
                          <Switch
                            defaultChecked={item.tag}
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            onChange={(checked) => this.changeUserJurisdiction(checked, record, item.type, jurisdiction)}
                          />
                        </div>
                      ))}
                      <div
                        style={{ width: '20%', float: 'left', textAlign: 'center' }}
                      >
                        用户权限
                        <Divider type="vertical" />
                        <Switch
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
                      <Input.TextArea rows={4} defaultValue={record.eventLimiter} onChange={(e) => this.handleEventLimiterInputChange(e, record)} />
                      <Button style={{ marginTop: '10px' }} icon={<PlusCircleOutlined />} type="primary" onClick={() => this.handleChangeUserEventLimiter(record)}>添加搜索限定词</Button>
                    </div>
                    <div
                      style={{ width: '48%', float: 'left', margin: '10px 1%' }}
                    >
                      <Input.TextArea rows={4} value={record.sensitiveLimiter} />
                      <Button style={{ marginTop: '10px' }} icon={<PlusCircleOutlined />} type="primary" onClick={() => this.addNewSword(record)}>添加敏感限定词</Button>
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
                添加新敏感词
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
