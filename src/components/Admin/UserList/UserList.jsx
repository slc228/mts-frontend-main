import React from 'react';
import { Table, Divider, Image, Button, Layout, Input, Modal } from 'antd';
import { Switch } from 'antd/es';
import { CloseOutlined, CheckOutlined, PlusCircleOutlined } from '@ant-design/icons';
import changeUserState from '../../../services/request/auth/changeUserState';
import changeUserJurisdiction from '../../../services/request/data/changeUserJurisdiction';
import Register from '../../Authority/Register/Register';

class UserList extends React.Component {
  constructor() {
    super();
    this.state = {
      addNewUserVisible: false,
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

  handleChange = async (username) => {
    console.log(username);
    const result = await changeUserState(username);
    if (result.changeUserState) {
      alert('编辑成功！');
    } else alert('编辑失败！');
  };

    changeUserJurisdiction=(checked, record, type, jurisdiction) => {
      jurisdiction.forEach(item => {
        if (item.type === type) {
          item.tag = checked;
        }
      });
      changeUserJurisdiction(record.username, JSON.stringify(jurisdiction));
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

  render() {
    const { addNewUserVisible } = this.state;
    const { users } = this.props;
    return (
      <Layout>
        <div className="enter-background">
          <Button style={{ marginBottom: '10px' }} icon={<PlusCircleOutlined />} type="primary" onClick={this.handleAddNewUser}>添加新用户</Button>
          <Table
            columns={this.columns}
            rowKey={(record) => record.userName}
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
                      <Input.TextArea rows={4} />
                      <Button style={{ marginTop: '10px' }} icon={<PlusCircleOutlined />} type="primary" onClick={this.handleAddNewUser}>添加搜索限定词</Button>
                    </div>
                    <div
                      style={{ width: '48%', float: 'left', margin: '10px 1%' }}
                    >
                      <Input.TextArea rows={4} />
                      <Button style={{ marginTop: '10px' }} icon={<PlusCircleOutlined />} type="primary" onClick={this.handleAddNewUser}>添加敏感限定词</Button>
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
        </div>
      </Layout>
    );
  }
}

export default UserList;
