import React from 'react';
import * as echarts from 'echarts';
import { connect } from 'react-redux';
import { Input, Divider, Layout, List, Button, Space, Image, Affix, Steps, message, Radio, Table, Tooltip, Form, Select, Badge, Result } from 'antd';
import {
  StarOutlined,
  CaretUpFilled,
  CaretDownFilled,
  DeleteFilled,
  PlusCircleOutlined,
  PlusCircleFilled, LoadingOutlined, FileWordFilled, FileExcelFilled, FilePdfFilled,
} from '@ant-design/icons';
import moment from 'moment';
import Lodash from 'lodash';
import { actions } from '../../../redux/actions';
import getMaterial from '../../../services/request/data/getMaterial';
import getMaterialDetail from '../../../services/request/data/getMaterialDetail';
import DataContent from '../../common/DataContent/DataContent';
import deleteMaterialIDs from '../../../services/request/data/deleteMaterialIDs';
import criteria from '../Material/criteria';
import getBriefingTemplate from '../../../services/request/data/getBriefingTemplate';
import './BriefingGeneration.scss';
import dimension from '../Briefing/dimension';
import generateFile from '../../../services/request/data/generateFile';
import genEchartSensiLayoutImage from './genEchartSensiLayoutImage';
import genEchartRegionLayoutImage from './genEchartRegionLayoutImage';
import getBriefingFiles from '../../../services/request/data/getBriefingFiles';
import deleteBriefingFiles from '../../../services/request/data/deleteBriefingFiles';
import downloadBriefingFiles from '../../../services/request/data/downloadBriefingFiles';

const DATE_FORMAT2 = 'YYYY-MM-DD HH:mm';
const { Step } = Steps;
const { Option } = Select;

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

const briefingmake = [
  {
    briefingName: '选择来源添加素材',
    briefingTime: '1',
    operation: '1',
  },
];

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

class BriefingGeneration extends React.Component {
  constructor() {
    super();
    this.state = {
      briefingfiles: [],
      current: 0,
      materiallibs: [],
      curmateriallib: undefined,
      loading: true,
      data: [],
      dataSize: 0,
      selectedRowKeys: [],
      visible: false,
      curRecord: undefined,
      templateList: [],
      templateId: undefined,
      title: undefined,
      header: undefined,
      echartsData: [],
    };
    this.briefingColumns = [
      {
        title: '简报名称',
        dataIndex: 'briefingName',
        key: 'briefingName',
        render: this.renderBriefingName,
        align: 'center',
      },
      {
        title: '生成时间',
        dataIndex: 'briefingTime',
        key: 'briefingTime',
        render: this.renderBriefingTime,
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: this.renderOperation,
        align: 'center',
      },
    ];
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

  renderBriefingName=(text) => (text);

  renderBriefingTime=(text) => (text);

  renderOperation=(text, record) => (
    <div>
      <Button style={{ margin: '5px' }} icon={<FileWordFilled />} type="primary" onClick={() => this.downloadBriefings(record.id, 'word')} />
      <Button style={{ margin: '5px' }} icon={<FilePdfFilled />} type="primary" onClick={() => this.downloadBriefings(record.id, 'pdf')} />
      <Button style={{ margin: '5px' }} icon={<FileExcelFilled />} type="primary" onClick={() => this.downloadBriefings(record.id, 'excel')} />
      <Button style={{ margin: '5px' }} icon={<DeleteFilled />} type="primary" onClick={() => this.handleDeleteBriefings(record.id)} danger />
    </div>
  );

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

  getBriefings=async () => {
    const { fid } = this.props.curProgramme;
    const ret = await getBriefingFiles(fid);
    this.setState({
      briefingfiles: ret,
    });
  };

  handleDeleteBriefings=async (id) => {
    const ret = await deleteBriefingFiles(id);
    if (ret.deleteBriefingFiles === 1) {
      alert('删除成功！');
    } else {
      alert('删除失败！');
    }
    this.getBriefings();
  };

  downloadBriefings=(id, type) => {
    downloadBriefingFiles(id, type);
  };

  getMateriallibs= async () => {
    this.setState({ current: 0 });
    const { fid } = this.props.curProgramme;
    const ret = await getMaterial(fid);
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

  handleGetTemplate = async () => {
    const { fid } = this.props.curProgramme;
    const result = await getBriefingTemplate(fid);
    this.setState({
      templateList: result,
    });
  };

  componentDidMount() {
    this.props.onBriefingGenPathChange({ path: '' });
    this.getBriefings();
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
    this.setState({ selectedRowKeys: [] });
  };

  next = (current) => {
    this.setState({ current: current + 1 });
    if (current === 0) {
      this.getBriefingMaterialDetail();
    }
    if (current === 1) {
      this.handleGetTemplate();
    }
  };

  prev = (current) => {
    this.setState({ current: current - 1 });
  };

  handleGenerateFile=async () => {
    const { fid } = this.props.curProgramme;
    const { selectedRowKeys, templateId, title, header, templateList } = this.state;
    let keyList;
    templateList.forEach((item) => {
      if (item.id === templateId) {
        keyList = item.keylist.length === 0 ? [] : item.keylist.split(',');
      }
    });
    this.handleGenEchartImage(keyList);
    // const ret = await generateFile(fid, templateId, title, header, selectedRowKeys);
    this.props.onBriefingGenPathChange({ path: '' });
    this.getBriefings();
  };

  handleGenEchartImage=async (keyList) => {
    const { fid } = this.props.curProgramme;
    for (const item of keyList) {
      if (dimension[item - 1].type === 'image') {
        let ret;
        if (dimension[item - 1].name === '敏感度分布') {
          ret = await genEchartSensiLayoutImage(fid);
          console.log(ret);
        }
        if (dimension[item - 1].name === '地域分布') {
          ret = await genEchartRegionLayoutImage(fid);
        }
        const { echartsData } = this.state;
        echartsData.push(ret);
        this.setState({
          echartsData,
        });
      }
    }
    const { selectedRowKeys, templateId, title, header, echartsData } = this.state;
    const ret = await generateFile(fid, templateId, title, header, selectedRowKeys, echartsData);
    this.setState({
      echartsData: [],
    });
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

  handleTemplateChange=(value) => {
    const { templateList } = this.state;
    let header = '';
    let templateId = 0;
    templateList.forEach((item) => {
      if (item.title === value) {
        header = item.institution;
        templateId = item.id;
      }
    });
    this.setState({
      title: value,
      header,
      templateId,
    });
  };

  handleBriefingTitleChange=(e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleBriefingHeaderChange=(e) => {
    this.setState({
      header: e.target.value,
    });
  };

  handleAddNewBriefingFile=() => {
    this.props.onBriefingGenPathChange({ path: 'result' });
    this.setState({
      current: 0,
      materiallibs: [],
      curmateriallib: undefined,
      loading: true,
      data: [],
      dataSize: 0,
      selectedRowKeys: [],
      visible: false,
      curRecord: undefined,
      templateList: [],
      templateId: undefined,
      title: undefined,
      header: undefined,
    });
    this.getMateriallibs();
  };

  handleGenEchartsBase64=(e) => {
    console.log('here');
    console.log(e.getDataURL());
  };

  render() {
    const { fid } = this.props.curProgramme;
    const { current, materiallibs, curmateriallib, loading, data, dataSize, selectedRowKeys, visible, curRecord, templateList, title, header, briefingfiles } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const curPath = this.props.briefingGenPath;

    switch (curPath) {
      case '':
        return (
          <Layout>
            <div className="enter-background">
              <Button style={{ marginBottom: '10px' }} icon={<PlusCircleOutlined />} type="primary" onClick={this.handleAddNewBriefingFile}>新建简报文件</Button>
              <Table columns={this.briefingColumns} dataSource={briefingfiles} />
            </div>
          </Layout>
        );
      case 'result':
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
                  <div style={{ marginTop: '20px' }}>
                    {
                          materiallibs.length === 0 ?
                            (
                              <div>
                                <div style={{ marginBottom: '20px', fontSize: '20px' }}>
                                  暂时没有素材库，请点击按钮跳转添加素材库
                                  <Button style={{ marginLeft: '5%' }} onClick={this.turnToMaterial}>跳转</Button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div style={{ marginBottom: '20px', fontSize: '20px' }}>选择一个素材库作为素材数据来源</div>
                                <Radio.Group
                                  onChange={this.onRadioChange}
                                  value={curmateriallib}
                                  style={{ marginLeft: '40%', marginBottom: '20px' }}
                                >
                                  <Space direction="vertical">
                                    {materiallibs.map((item) => (
                                      <Radio
                                        style={{ fontSize: '18px' }}
                                        value={item.materiallib}
                                      >{`${item.materiallib} (${item.num})`}
                                      </Radio>
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
                          <div style={{
                            float: 'left',
                            width: '15%',
                            fontSize: '17px',
                            textAlign: 'center',
                            color: '#1890ff',
                          }}
                          >
                            {'添加舆情素材 '}
                            <Tooltip placement="topLeft" title="跳转到舆情列表进行添加" arrowPointAtCenter>
                              <PlusCircleFilled onClick={this.turnToSpecific} style={{ fontSize: '15px' }} />
                            </Tooltip>
                          </div>
                          <div style={{
                            float: 'left',
                            width: '15%',
                            fontSize: '17px',
                            textAlign: 'center',
                            color: 'red',
                          }}
                          >
                            {'批量删除 '}
                            <Tooltip placement="topLeft" title="批量删除选中的素材" arrowPointAtCenter>
                              <DeleteFilled
                                onClick={this.handleDeleteMateriallibIds}
                                style={{ fontSize: '15px' }}
                              />
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
                  <div style={{ marginTop: '20px' }}>
                    <div style={{ width: '40%', float: 'left', minHeight: '45vh' }}>
                      <Form {...layout} name="control-hooks" style={{ width: '80%', marginTop: '13vh' }}>
                        <Form.Item
                          name="template"
                          label="选择模板"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Select
                            placeholder="请选择一个简报模板"
                            allowClear
                            onChange={this.handleTemplateChange}
                          >
                            {templateList.length === 0 ? null : (templateList.map((item) => (
                              <Option value={item.title}>{item.title}</Option>
                            ))
                            )}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name="title"
                          label="简报标题"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Input placeholder="请输入简报标题" value={title} onChange={this.handleBriefingTitleChange} />
                        </Form.Item>
                        <Form.Item
                          name="header"
                          label="简报标头"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Input placeholder="请输入简报标头" value={header} onChange={this.handleBriefingHeaderChange} />
                        </Form.Item>
                      </Form>
                    </div>
                    <Badge.Ribbon text="预览效果" color="red">
                      <div className="briefingGen-real">
                        <div className="briefingGen-title">
                          <div className="title-div">
                            <Input className="title-input" value={title} bordered={false} />
                          </div>
                          <div className="subtitle-div">
                            <Input className="subtitle-input" defaultValue="第（）期" bordered={false} />
                          </div>
                          <div className="tinytitle-div">
                            <Input className="institution" value={header} bordered={false} />
                            <Input className="time" defaultValue={moment().format(DATE_FORMAT2)} bordered={false} />
                          </div>
                        </div>
                        <Divider className="briefing-divider" style={{ color: 'red', border: 'red' }}><StarOutlined /></Divider>
                        <div className="briefing-dimension">
                          <div>
                            <div className="briefing-dimension-title">
                              <div className="briefing-dimension-title-name">
                                <span className="title-name-span">
                                  简报概述
                                </span>
                              </div>
                            </div>
                            <Divider />
                            <div className="briefing-dimension-content">
                              <Input.TextArea rows={4} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Badge.Ribbon>
                  </div>
                )}
                {current === 3 && (
                  <Result
                    status="success"
                    title="简报制作完成"
                    subTitle="点击完成按钮查看简报文件制作进度"
                  />
                )}
              </div>
              <div className="steps-action">
                {current < steps.length - 1 && (
                  <Button type="primary" onClick={() => this.next(current)}>
                    下一步
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button type="primary" onClick={() => this.handleGenerateFile()}>
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
}

const mapStateToProps = (state) => ({
  userName: state.userName,
  curProgramme: state.curProgramme,
  briefingGenPath: state.briefingGenPath,
  curPageTag: state.curPageTag,
});
const mapDispatchToProps = {
  onPageTagChange: actions.onPageTagChange,
  onProgrammeChange: actions.onProgrammeChange,
  onBriefingGenPathChange: actions.onBriefingGenPathChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(BriefingGeneration);
