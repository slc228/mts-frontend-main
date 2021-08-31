import React, { Component } from 'react';
import { Layout, Menu, Checkbox, Tooltip, Button, Modal, Input } from 'antd';
import getSensitiveWordTypes from '../../services/request/data/getSensitiveWordTypes';
import getSensitiveWords from '../../services/request/data/getSensitiveWords';
import './SensitiveWords.scss';
import { CheckOutlined, DeleteFilled, PlusCircleFilled } from '@ant-design/icons';
import deleteSensitiveWords from '../../services/request/data/deleteSensitiveWords';
import addSensitiveWordForAll from '../../services/request/data/addSensitiveWordForAll';

class SensitiveWords extends Component {
  constructor() {
    super();
    this.state = {
      swordTypes: [],
      curSwordType: undefined,
      swords: [],
      checkSwords: [],
      addNewSwordVisible: false,
    };
  }

  handleGetSwordTypes=async () => {
    const swordTypes = await getSensitiveWordTypes();
    console.log(swordTypes);
    this.setState({
      swordTypes,
      curSwordType: swordTypes.length === 0 ? undefined : swordTypes[0].type,
    });
  };

  handleGetSwords=async () => {
    const { curSwordType } = this.state;
    console.log(curSwordType);
    const swords = await getSensitiveWords(curSwordType);
    this.setState({
      swords,
    });
  };

  async componentDidMount() {
    await this.handleGetSwordTypes();
    await this.handleGetSwords();
  }

  changeSwordsType=async (e) => {
    await this.setState({
      curSwordType: e.key,
    });
    this.handleGetSwords();
  };

  handleCheck=(value) => {
    console.log(value);
    this.setState({
      checkSwords: value,
    });
  };

  addNewSword=() => {
    this.setState({
      addNewSwordVisible: true,
    });
  };

  handleAddSwordModalCancel=() => {
    this.setState({
      addNewSwordVisible: false,
    });
  };

  handleAddNewSword=async (value) => {
    const { curSwordType } = this.state;
    const ret = await addSensitiveWordForAll(curSwordType, value);
    if (ret.addSensitiveWordForAll === 0 && ret.isexisted === 1) {
      alert('该敏感词已存在');
    } else if (ret.addSensitiveWordForAll === 0) {
      alert('添加失败');
    } else {
      alert('添加成功');
    }
    this.setState({
      addNewSwordVisible: false,
    });
    this.handleGetSwords();
  };

  handleDelete=async () => {
    const { curSwordType, checkSwords } = this.state;
    const ret = await deleteSensitiveWords(curSwordType, checkSwords);
    if (ret.deleteSensitiveWords === 1) {
      alert('删除成功');
    } else {
      alert('删除失败');
    }
    this.handleGetSwords();
  };

  render() {
    const { swordTypes, curSwordType, swords, addNewSwordVisible } = this.state;
    return (
      <Layout>
        <Layout.Sider
          className="programme-sider-wrap"
          style={{ minHeight: '90vh' }}
        >
          <Menu onClick={this.changeSwordsType} mode="inline" selectedKeys={[curSwordType]}>
            { swordTypes.map((item) => (
              <Menu.Item key={item.type.toString()}>{item.type}</Menu.Item>
            ))}
          </Menu>
        </Layout.Sider>
        <Layout.Content>
          <div className="enter-background">
            <div style={{ width: '100%' }}>
              <Button
                icon={<PlusCircleFilled />}
                style={{ fontSize: '15px', margin: '10px 5px' }}
                type="primary"
                onClick={this.addNewSword}
              >
                添加新敏感词
              </Button>
              <Button
                icon={<DeleteFilled />}
                style={{ fontSize: '15px', margin: '10px 5px' }}
                type="primary"
                danger
                onClick={this.handleDelete}
              >
                批量删除
              </Button>
              <Modal
                visible={addNewSwordVisible}
                onCancel={this.handleAddSwordModalCancel}
                closable={false}
                title="请输入敏感词名称"
                footer={null}
              >
                <Input.Search placeholder="输入后点击按钮完成添加" enterButton={<CheckOutlined />} onSearch={this.handleAddNewSword} />
              </Modal>
            </div>
            <div>
              <Checkbox.Group options={swords} onChange={this.handleCheck} />
            </div>
          </div>
        </Layout.Content>
      </Layout>
    );
  }
}

export default SensitiveWords;
