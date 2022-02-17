import React from 'react';
import { Button, Table, Modal, Divider, Tooltip, Layout, Affix, List, Image, Input, Space, Menu } from 'antd';
import {
  HeartOutlined,
  TagsOutlined,
  LoadingOutlined,
  DeleteFilled,
  PlusCircleFilled,
  StarOutlined, CaretUpFilled, CaretDownFilled, EditOutlined, PlusSquareOutlined, SettingFilled, CheckOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import Lodash from 'lodash';
import moment from 'moment';
import criteria from './criteria';
import DataContent from '../../common/DataContent/DataContent';
import { actions } from '../../../redux/actions';
import getMaterial from '../../../services/request/data/getMaterial';
import modeifyMaterial from '../../../services/request/data/modeifyMaterial';
import getMaterialDetail from '../../../services/request/data/getMaterialDetail';
import deleteMaterial from '../../../services/request/data/deleteMaterial';
import renameMaterial from '../../../services/request/data/renameMaterial';
import deleteMaterialIDs from '../../../services/request/data/deleteMaterialIDs';
import addNewMaterialLib from '../../../services/request/data/addNewMaterialLib';

const { Sider } = Layout;
const { Search } = Input;

class Material extends React.Component {
  constructor() {
    super();
    this.state = {
      materiallibs: [],
      materiallibsLoading: true,
      curmateriallib: undefined,
      data: [],
      dataSize: 0,
      loading: true,
      curRecord: undefined,
      visible: false,
      selectedRowKeys: [],
      addNewMaterialLibVisible: false,
      modeifyMaterialLibVisible: false,
    };
    this.columnsRender = [
      {
        title: '内容',
        dataIndex: 'title',
        key: 'title',
        render: this.renderTitle,
      },
      {
        title: '站点',
        dataIndex: 'fromType',
        key: 'fromType',
        render: this.renderSource,
        width: 100,
      },
      {
        title: '发布时间',
        dataIndex: 'publishedDay',
        key: 'publishedDay',
        render: this.renderMoment,
        width: 100,
      },
      {
        title: '敏感类型',
        dataIndex: 'sensitiveType',
        key: 'sensitiveType',
        render: this.renderSensitiveType,
        align: 'center',
        width: 100,
      },
      {
        title: '情感',
        dataIndex: 'emotion',
        key: 'emotion',
        render: this.renderEmotion,
        width: 100,
      },

      {
        title: '分类',
        dataIndex: 'tag',
        key: 'tag',
        render: (text) => text || <LoadingOutlined />,
        width: 100,

      },
      {
        title: '操作',
        dataIndex: 'webpageUrl',
        key: 'webpageUrl',
        render: this.renderAddr,
        width: 100,
      },
    ];
  }

  turnToSpecific=() => {
    this.props.onPageTagChange({
      curPageTag: 'info',
    });
  };

  async componentDidMount() {
    await this.getMateriallibs();
    this.getBriefingMaterialDetail();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { curProgramme } = this.props;
    if (!prevProps.curProgramme || !curProgramme) return;
    if (prevProps.curProgramme.fid !== curProgramme.fid || prevProps.curProgramme.name !== curProgramme.name) {
      await this.getMateriallibs();
      this.getBriefingMaterialDetail();
    }
  }

  getMateriallibs= async () => {
    const { fid } = this.props.curProgramme;
    const ret = await getMaterial(fid);
    console.log(ret);
    this.setState({
      materiallibs: ret,
      materiallibsLoading: false,
      curmateriallib: ret.length === 0 ? undefined : ret[0].materiallib });
  };

  getBriefingMaterialDetail = async () => {
    await this.setState({ loading: true });
    const { fid } = this.props.curProgramme;
    const { curmateriallib } = this.state;
    console.log(curmateriallib);
    const data = await getMaterialDetail(fid, curmateriallib);
    console.log(data);
    this.setState({ data: data.yuQingContent, loading: false, dataSize: data.hitNumber, selectedRowKeys: [] });
  };

    renderMoment = (text) => (moment(text).format('YYYY-MM-DD hh:mm'));

    renderSource = (text) => {
      const options = Lodash.find(criteria, { name: 'source' })?.options || [];
      return Lodash.find(options, { value: text })?.label || '';
    };

    renderEmotion = (text) => {
      if (text === 'happy') return '积极 🥰';
      if (text === 'angry') return '愤怒 😡';
      if (text === 'sad') return '悲伤 😭';
      if (text === 'fear') return '恐惧 😰';
      if (text === 'surprise') return '惊讶 😮';
      if (text === 'neutral') return '中立 😐';
      return <LoadingOutlined />;
    };

    renderSensitiveType = (text) => {
      if (text === '正常信息 ') return text;
      if (text === '政治敏感 ') return <span style={{ color: 'red' }}>敏感</span>;
      if (text) return <span style={{ color: 'red' }}>{text}</span>;
      return <LoadingOutlined />;
    };

    renderTitle = (text, record) => {
      const { content, source } = record;
      let renderTxt = '';
      if (content) {
        renderTxt = `${content.slice(0, 100)}`;
      }
      return (
        <div
          onClick={() => this.handleTitleClicked(record)}
          className="title-content"
        >
          <a>
            {text}
          </a>
          <div style={{ color: 'gray' }}>{renderTxt}</div>
        </div>

      );
    };

    handleOpen = (text) => {
      window.open(text);
    };

    renderAddr = (text) => (
      <a
        className="mts-data-list-addr"
        onClick={e => this.handleOpen(text)}
      >
        点击访问 >
      </a>
    );

    handleTitleClicked = (record) => {
      this.setState({
        visible: true,
        curRecord: record,
      });
    };

    handleModalCancel = () => {
      this.setState({ visible: false });
    };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  handleInputNewMateriallibName= () => {
    this.setState({ addNewMaterialLibVisible: true });
  };

  handlemodeifyMaterialLibVisible= async (material) => {
    this.setState({ modeifyMaterialLibVisible: true, curmateriallib: material });
  };

  handleAddMateriallibModalCancel = () => {
    this.setState({ addNewMaterialLibVisible: false });
  };

  handleModeifyMateriallibModalCancel = () => {
    this.setState({ modeifyMaterialLibVisible: false });
  };

  handleAddNewMateriallib=async (value) => {
    const { fid } = this.props.curProgramme;
    const ret = await addNewMaterialLib(fid, value);
    if (ret.addNewMaterialLib === 1) {
      alert('添加成功！');
    } else {
      alert('添加失败！');
    }
    this.setState({ addNewMaterialLibVisible: false });
    await this.getMateriallibs();
    await this.setState({ curmateriallib: value });
    await this.getBriefingMaterialDetail();
  };

  handleRenameMateriallib=async (value) => {
    const { fid } = this.props.curProgramme;
    const { curmateriallib } = this.state;
    const ret = await renameMaterial(fid, curmateriallib, value);
    if (ret.renameMaterial === 1) {
      alert('修改名称成功！');
    } else {
      alert('修改名称失败！');
    }
    this.setState({ modeifyMaterialLibVisible: false });
    await this.getMateriallibs();
    await this.setState({ curmateriallib: value });
    await this.getBriefingMaterialDetail();
  };

  handleDeleteMateriallib=async () => {
    const { fid } = this.props.curProgramme;
    const { curmateriallib } = this.state;
    const ret = await deleteMaterial(fid, curmateriallib);
    if (ret.deleteMaterial === 1) {
      alert('删除成功！');
    } else {
      alert('删除失败！');
    }
    this.setState({ modeifyMaterialLibVisible: false });
    await this.getMateriallibs();
    await this.getBriefingMaterialDetail();
  };

  handleDeleteMateriallibIds=async () => {
    const { fid } = this.props.curProgramme;
    const { curmateriallib, selectedRowKeys } = this.state;
    const ret = await deleteMaterialIDs(fid, curmateriallib, selectedRowKeys);
    console.log(ret);
    if (ret.deleteMaterialIDs === 1) {
      alert('删除成功！');
    } else {
      alert('删除失败！');
    }
    await this.getMateriallibs();
    await this.setState({ curmateriallib });
    await this.getBriefingMaterialDetail();
  };

  handleMaterialLibSelect=async (e) => {
    await this.setState({ curmateriallib: e.key });
    await this.getBriefingMaterialDetail();
  };

  render() {
    const { visible, curRecord, dataSize, loading, data, selectedRowKeys, materiallibs, materiallibsLoading, addNewMaterialLibVisible, modeifyMaterialLibVisible, curmateriallib } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    console.log(data);

    return (
      <Layout className="briefing-layout">
        <Sider className="briefing-layout-slider" theme="light">
          <Affix>
            <Button block icon={<PlusSquareOutlined />} type="primary" onClick={this.handleInputNewMateriallibName}>添加新素材库</Button>
            <Menu
              mode="inline"
              onClick={this.handleMaterialLibSelect}
              selectedKeys={[curmateriallib?.toString()]}
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                  materiallibs.length === 0 ? null : (materiallibs.map((item) => (
                    <Menu.Item key={item.materiallib}>
                      {`${item.materiallib} (${item.num})`}
                      <SettingFilled onClick={() => this.handlemodeifyMaterialLibVisible(item.materiallib)} style={{ float: 'right', paddingTop: '13px' }} />
                    </Menu.Item>
                  )))
              }
            </Menu>
          </Affix>
        </Sider>
        <Modal
          visible={addNewMaterialLibVisible}
          onCancel={this.handleAddMateriallibModalCancel}
          closable={false}
          title="请输入素材库名称"
          footer={null}
        >
          <Search placeholder="输入名称后点击按钮完成添加" enterButton={<CheckOutlined />} onSearch={this.handleAddNewMateriallib} />
        </Modal>
        <Modal
          visible={modeifyMaterialLibVisible}
          onCancel={this.handleModeifyMateriallibModalCancel}
          closable={false}
          title="请对素材库进行操作"
          footer={null}
        >
          <Search placeholder="输入名称后点击按钮完成修改" enterButton={<CheckOutlined />} onSearch={this.handleRenameMateriallib} style={{ width: '80%' }} />
          <Button danger type="primary" style={{ width: '15%', float: 'right' }} onClick={this.handleDeleteMateriallib}>删除</Button>
        </Modal>
        <div className="briefing-real">
          <div className="mts-data-list">
            <div id="table">
              <Table
                title={() => (
                  <div>
                    <div style={{ float: 'left', width: '15%', fontSize: '17px', textAlign: 'center', color: '#1890ff' }}>
                      {'添加舆情素材 '}
                      <Tooltip placement="topLeft" title="跳转到舆情列表进行添加" arrowPointAtCenter>
                        <PlusCircleFilled onClick={this.turnToSpecific} style={{ fontSize: '15px' }} />
                      </Tooltip>
                    </div>
                    <div style={{ float: 'left', width: '15%', fontSize: '17px', textAlign: 'center', color: 'red' }}>
                      {'批量删除 '}
                      <Tooltip placement="topLeft" title="批量删除选中的素材" arrowPointAtCenter>
                        <DeleteFilled onClick={this.handleDeleteMateriallibIds} style={{ fontSize: '15px' }} />
                      </Tooltip>
                    </div>
                  </div>

                )}
                rowKey={(record) => record.webpageUrl}
                columns={this.columnsRender}
                rowSelection={rowSelection}
                dataSource={data}
                pagination={{
                  position: ['none', 'bottomRight'],
                  total: dataSize,
                }}
                loading={loading}
                style={{ fontSize: '16px' }}
              />
              <DataContent
                record={curRecord}
                visible={visible}
                fid={this.props.curProgramme.fid}
                handleModalCancel={this.handleModalCancel}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.userName,
  curProgramme: state.curProgramme,
  curPageTag: state.curPageTag,
});
const mapDispatchToProps = {
  onPageTagChange: actions.onPageTagChange,
  onProgrammeChange: actions.onProgrammeChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Material);
