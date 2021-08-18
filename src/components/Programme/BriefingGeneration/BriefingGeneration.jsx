import React from 'react';
import { connect } from 'react-redux';
import { Input, Divider, Layout, List, Button, Space, Image, Affix, Steps, message, Radio, Table, Tooltip } from 'antd';
import {
  StarOutlined,
  CaretUpFilled,
  CaretDownFilled,
  DeleteFilled,
  PlusCircleOutlined,
  PlusCircleFilled, LoadingOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import Lodash from 'lodash';
import { actions } from '../../../redux/actions';
import getMaterial from '../../../services/request/data/getMaterial';
import getMaterialDetail from '../../../services/request/data/getMaterialDetail';
import DataContent from '../../common/DataContent/DataContent';
import deleteMaterialIDs from '../../../services/request/data/deleteMaterialIDs';
import criteria from '../Material/criteria';

const DATE_FORMAT2 = 'YYYY-MM-DD HH:mm';
const { Step } = Steps;

const steps = [
  {
    title: '选择来源添加素材',
  },
  {
    title: '确认简报素材',
  },
  {
    title: '生成简报',
  },
  {
    title: '完成',
  },
];

class BriefingGeneration extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 0,
      materiallibs: [],
      curmateriallib: undefined,
      loading: true,
      data: [],
      dataSize: 0,
      selectedRowKeys: [],
      visible: false,
      curRecord: undefined,
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

  getMateriallibs= async () => {
    this.setState({ current: 0 });
    const { fid } = this.props.curProgramme;
    const ret = await getMaterial(fid);
    console.log(ret);
    this.setState({
      materiallibs: ret,
      curmateriallib: ret.length === 0 ? undefined : ret[0].materiallib,
    });
  };

  getBriefingMaterialDetail = async () => {
    await this.setState({ loading: true });
    const { fid } = this.props.curProgramme;
    const { curmateriallib } = this.state;
    const data = await getMaterialDetail(fid, curmateriallib);
    this.setState({ data: data.dataContent, loading: false, dataSize: data.hitNumber });
  };

  componentDidMount() {
    this.getMateriallibs();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { curProgramme } = this.props;
    if (!prevProps.curProgramme || !curProgramme) return;
    if (prevProps.curProgramme.fid !== curProgramme.fid || prevProps.curProgramme.name !== curProgramme.name) {
      this.getMateriallibs();
    }
  }

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
    await this.getBriefingMaterialDetail();
  };

  next = (current) => {
    this.setState({ current: current + 1 });
    if (current === 0) {
      this.getBriefingMaterialDetail();
    }
  };

  prev = (current) => {
    this.setState({ current: current - 1 });
  };

  onRadioChange=(e) => {
    this.setState({ curmateriallib: e.target.value });
  };

  turnToMaterial=() => {
    this.props.onPageTagChange({
      curPageTag: 'material',
    });
  };

  turnToSpecific=() => {
    this.props.onPageTagChange({
      curPageTag: 'info',
    });
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  render() {
    const { fid } = this.props.curProgramme;
    const { current, materiallibs, curmateriallib, loading, data, dataSize, selectedRowKeys, visible, curRecord } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <Layout>
        <div className="enter-background">
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">
            {current === 0 && (
            <div>
              {
                materiallibs.length === 0 ?
                  (
                    <div>
                      <div>暂时没有素材库，请点击按钮跳转添加素材库</div>
                      <Button onClick={this.turnToMaterial}>跳转</Button>
                    </div>
                  ) : (
                    <div>
                      <div>选择一个素材库作为素材数据来源</div>
                      <Radio.Group onChange={this.onRadioChange} value={curmateriallib}>
                        <Space direction="vertical">
                          {materiallibs.map((item) => (
                            <Radio value={item.materiallib}>{`${item.materiallib} (${item.num})`}</Radio>
                          ))}
                        </Space>
                      </Radio.Group>
                    </div>
                  )
              }
            </div>
            )}
            {current === 1 && (
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
                rowKey={(record) => record.id}
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
            )}
            {current === 2 && (
            <div>
              <div style={{ backgroundColor: 'orange' }}>生成简报</div>
              <div style={{ backgroundColor: 'blue', width: '50%', float: 'left' }}><Button>hhh</Button></div>
              <div style={{ backgroundColor: 'red', width: '50%', float: 'left' }}><Button>hhh</Button></div>
            </div>
            )}
          </div>
          <div className="steps-action">
            {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next(current)}>
              下一步
            </Button>
            )}
            {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              完成
            </Button>
            )}
            {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => this.prev(current)}>
              上一步
            </Button>
            )}
          </div>
        </div>
      </Layout>
    );
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

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(BriefingGeneration);
