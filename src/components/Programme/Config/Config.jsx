import React from 'react';
import {Form, Input, Button, Radio, Layout, Switch, Modal, Menu, Checkbox, Select} from 'antd';
import {CheckOutlined, PlusCircleFilled, QuestionCircleFilled, EditOutlined} from '@ant-design/icons';
import './Config.scss';
import modifyProgramme from "../../../services/request/programme/modifyProgamme";
import delProgramme from "../../../services/request/programme/delProgramme";
import { connect } from "react-redux";
import { actions } from "../../../redux/actions";
import getProgrammes from "../../../services/request/programme/getProgrammes";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import sampleKeywordAnalysis from "../../../services/request/programme/sampleKeywordAnalysis";
import getSensitiveWordTypes from "../../../services/request/data/getSensitiveWordTypes";
import getSensitiveWords from "../../../services/request/data/getSensitiveWords";

const formItemLayoutWithOutLabel = {
  wrapperCol: {span: 22, offset: 3},
};

const formItemLayout = {
  wrapperCol: {span: 20},
};

class Config extends React.Component {
  constructor() {
    super();
    this.layout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 999 }
    };
    this.subLayout = { wrapperCol: { offset: 6, span: 999 }};
    this.radioLayout = {};
    this.state = {
      fid: 0,
      sampleVisible: false,
      sampleText: '',
      swordTypes: [],
      curSwordType: undefined,
      swords: [],
      addNewSwordVisible: false,
      checkedSwordsList:[],
      checkedSwords:[],
      userCheckedSwords:[],
    }
  }

  handleGetSwordTypes=async () => {
    const swordTypes = await getSensitiveWordTypes();
    this.setState({
      swordTypes,
      curSwordType: swordTypes.length === 0 ? undefined : swordTypes[0].type,
      checkedSwordsList : swordTypes.length > 0 ? swordTypes.map((item) => ({
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
    const {checkedSwordsList} = this.state;
    let checkedSwords;
    checkedSwordsList.forEach((item) => {
      if (item.type === e.key) {
        checkedSwords = item.checkedSwords;
      }
    });
    this.setState({
      checkedSwords,
    })
  };

  handleAddSwordModalCancel=() => {
    this.setState({
      addNewSwordVisible: false,
    });
  };

  addNewSword=() => {
    const {userType, programmes}=this.props;
    if (userType==='systemAdmin')
    {
      const { swordTypes } = this.state;
      this.setState({
        addNewSwordVisible: true,
        checkedSwordsList : swordTypes.length > 0 ? swordTypes.map((item) => ({
          type: item.type,
          checkedSwords: [],
        })) : [],
        checkedSwords:[],
      });
    }else {
      const curProgramme = programmes.find((item) => item.fid === this.props.curProgramme.fid);
      const sensitiveWords = curProgramme.sensitiveWord?curProgramme.sensitiveWord.split(/\s+/):[];
      this.setState({
        addNewSwordVisible: true,
        userCheckedSwords:sensitiveWords,
      });
    }
  };

  handleCheck = (value) => {
    const {curSwordType, checkedSwordsList} = this.state;
      checkedSwordsList.forEach((item) => {
        if (item.type === curSwordType) {
          item.checkedSwords=value;
        }
      });
      this.setState({
        checkedSwords: value,
        checkedSwordsList,
      });
  };

  handleUserCheck=(value)=>{
    this.setState({
      userCheckedSwords: value,
    });
  }

  addNewSwordToProgramme=async () => {
    const {programmes} = this.props;
    const {checkedSwordsList} = this.state;
    let str = [];
    checkedSwordsList.forEach((item) => {
      str = str.concat(item.checkedSwords);
    });
    const curProgramme = programmes.find((item) => item.fid === this.props.curProgramme.fid);
    const sensitiveWords = curProgramme.sensitiveWord.split(/\s+/);
    str = str.concat(sensitiveWords);
    str = Array.from(new Set(str));
    // curProgramme.sensitiveWord = str.toString().replace(/,/g, ' ');
    // await this.props.onProgrammeChange({curProgramme});
    this.form.setFieldsValue({
      sensitiveWord:str.toString().replace(/,/g, ' '),
    })
    // this.resetProgrammeForm();
    this.handleAddSwordModalCancel();
  }

  addNewSwordToProgrammeForUser=()=>{
    const {programmes} = this.props;
    const {userCheckedSwords} = this.state;
    const curProgramme = programmes.find((item) => item.fid === this.props.curProgramme.fid);
    curProgramme.sensitiveWord = userCheckedSwords.toString().replace(/,/g, ' ');
    this.props.onProgrammeChange({curProgramme});
    this.handleAddSwordModalCancel();
  }

  handleProgrammeConfig = (type, data) => {
    switch (type) {
      case 'submit':
        this.modifyProgramme(data);
        break;
      case 'reject': break;
      case 'del':
        this.delProgramme();
        break;
    }
  }

  /*
  enableAlert: undefined
  eventKeywords: "1"
  eventMatchMethod: "and"
  keywordMatchMethod: "titleOnly"
  programmeName: "1"
  regionKeywords: "1"
  regionMatchMethod: "or"
  roleKeywords: "1"
  roleMatchMethod: "or"
   */
  modifyProgramme = async (rawData) => {
    const { userName, curProgramme } = this.props;
    const data = {
      fid: this.props.curProgramme.fid,
      userName,
      ...rawData,
    };
    const result = await modifyProgramme(data);
    if (result.modifyProgramme !== 1) { alert('提交失败！'); }
    else {
      alert('提交成功！');
      await this.getProgrammes();
      const { programmes, curProgramme } = this.props;
      // const curProgramme = programmes.find((item) => item.fid === data.fid)
      // console.log(curProgramme);
      // this.props.onProgrammeChange({ curProgramme: this.props.programmes[0] || undefined });
      this.props.onProgrammeChange({ curProgramme:programmes[programmes.length - 1] });
    }
  }

  getProgrammes = async () => {
    const programmes = await getProgrammes(this.props.userName);
    const { curProgramme } = this.props;
    await this.props.onProgrammesChange({
      programmes,
      curProgramme: curProgramme || programmes[programmes.length - 1],
    });
  };


  delProgramme = async () => {
    const { userName } = this.props;
    const { fid } = this.props.curProgramme;
    const result = await delProgramme(fid, userName);
    if (result.delProgramme !== 1) { alert('删除失败！'); }
    else {
      alert('删除成功！');
      this.props.onProgrammeChange({ curProgramme: this.props.programmes[0] || undefined });
    }
  }

  async componentDidMount() {
    console.log(this.props.curProgramme);
    // console.log(this.form.input.props.value);
    this.resetProgrammeForm();
    await this.handleGetSwordTypes();
    await this.handleGetSwords();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { fid } = this.state;
    if (fid !== this.props.curProgramme?.fid) {
      this.resetProgrammeForm();
    }
  }

  resetProgrammeForm = () => {
    const fid = this.props.curProgramme?.fid;
    this.setState({
      fid,
    })
    this.form.setFieldsValue({
      ...this.props.curProgramme
    })
  }

  handleSampleChange = (e) => {
    this.setState({
      sampleText: e.target.value,
    })
  }

  handleSampleSubmit = async (e) => {
    const { sampleText } = this.state;
    const fid = this.props.curProgramme.fid;
    const result = await sampleKeywordAnalysis(fid, sampleText);
    if (result.autoaddEkeyword !== 1) { alert('分析失败'); }
    else {
      alert('分析成功！');
      await this.getProgrammes();
      const { programmes } = this.props;
      const curProgramme = programmes.find((item) => item.fid === this.props.curProgramme.fid)
      this.props.onProgrammeChange({ curProgramme })
    }
    this.setState({
      sampleText: '',
      sampleVisible: false,
    })
  }

  handleSampleCancel = (e) => {
    this.setState({
      sampleText: '',
      sampleVisible: false,
    })
  }

  openSample = (e) => {
    this.setState({
      sampleVisible: true,
    })
  }

  render() {
    const { layout, subLayout } = this;
    const { sampleVisible, sampleText, swordTypes, curSwordType, swords, addNewSwordVisible, checkedSwords, userCheckedSwords } = this.state;
    const {userType, userSensitiveLimiter}=this.props;
    const sensitiveWords = userSensitiveLimiter&&userSensitiveLimiter!=='' ? userSensitiveLimiter.split(/\s+/) : [];
    // console.log(this.props.curProgramme);
    return (
      <Layout className="programme-config-wrap">
        <Form
          {...layout}
          ref = {(r) => {this.form = r}}
          className="config-form"
          onFinish={info => this.handleProgrammeConfig('submit', info)}
          onFinishFailed={err => this.handleProgrammeConfig('reject', err)}
        >
          <Form.Item
            label="方案名称"
            name="name"
            rules={[{ required: true, message: '请输入方案名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              name="priority"
              label="紧急程度"
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Select
                placeholder="选择一个紧急程度作为方案优先级"
                allowClear
            >
              <Select.Option value={0}>低</Select.Option>
              <Select.Option value={1}>中</Select.Option>
              <Select.Option value={2}>高</Select.Option>
              <Select.Option color={"red"} value={3}>紧急</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="keywordMatch"
            label="匹配方式"
            rules={[{ required: true, message: '请选择匹配方式' }]}
          >
            <Radio.Group>
              <Radio.Button value="titleOnly">只匹配标题</Radio.Button>
              <Radio.Button value="contentOnly">只匹配正文</Radio.Button>
              <Radio.Button value="both">匹配标题或正文</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="地域关键词"
            name="regionKeywords"
          >
            <Input.TextArea
              rows={5}
            />
          </Form.Item>
          <Form.Item
            name="regionMatch"
            label="地域关系"
            rules={[{ required: true, message: '请选择匹配方式' }]}
          >
            <Radio.Group size="small">
              <Radio value="or">或</Radio>
              <Radio value="and">与</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="人物关键词"
            name="roleKeywords"
          >
            <Input.TextArea
              rows={5}
            />
          </Form.Item>
          <Form.Item
            name="roleMatch"
            label="人物关系"
            rules={[{ required: true, message: '请选择匹配方式' }]}
          >
            <Radio.Group size="small">
              <Radio value="or">或</Radio>
              <Radio value="and">与</Radio>
            </Radio.Group>
          </Form.Item>
{/*
          <Form.Item
              name="tip"
              label="事件关键词"
              rules={[{ required: false }]}
          >
            <span>  请点击按钮添加</span>
          </Form.Item>*/}

          <Form.List
              name="eventKeywords"
              label="事件关系词"
              rules={[
                {
                  validator: async (_, names) => {},
                },
              ]}
          >
            {(fields, { add, remove }, { errors }) => (
                <>
                  <Form.Item
                      {...(formItemLayout)}
                      label={'事件关键词'}
                  >
                    <Button
                        type={'primary'}
                        onClick={() => add()}
                        className="config-form-button"
                        icon={<PlusOutlined />}
                    >
                      添加事件关键词
                    </Button>

                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                  {fields.map((field, index) => (
                      <Form.Item
                          {...(formItemLayoutWithOutLabel)}
                          required={false}
                          key={field.key}
                      >
                        <Form.Item
                            {...field}
                            validateTrigger={['onChange', 'onBlur']}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message: "请输入内容或者删除本词条.",
                              },
                            ]}
                            noStyle
                        >
                          <Input placeholder="请输入关键字词组，以空格隔开"  className="config-form-input"/>
                        </Form.Item>
                        {fields.length > 0 ? (
                            <MinusCircleOutlined
                                className="dynamic-delete-button"
                                onClick={() => remove(field.name)}
                            />
                        ) : null}
                      </Form.Item>
                  ))}
                </>
            )}
          </Form.List>
          <Form.Item
              label="方案敏感词"
          >
            <Button
                type={'primary'}
                className="config-form-button"
                icon={<PlusOutlined />}
                onClick={this.addNewSword}
            >
              添加方案敏感词
            </Button>
          </Form.Item>
          <Form.Item
              name="sensitiveWord"
              {...(formItemLayoutWithOutLabel)}
          >
            <Input.TextArea
                rows={5}
            />
          </Form.Item>
          <Form.Item>
            <div className="submit-btn-wrap">
              <Button
                className="submit-btn"
                type="primary"
                htmlType="submit"
              >
                提交方案
              </Button>
              <Button
                  className="submit-btn"
                  type="primary"
                  onClick={this.openSample}
              >
                样例分析
              </Button>
              <Button
                type="danger"
                onClick={() => this.handleProgrammeConfig('del')}
              >
                删除方案
              </Button>
            </div>
          </Form.Item>
        </Form>
        <Modal
            title="根据样例文档分析关键词"
            visible={sampleVisible}
            onOk={this.handleSampleSubmit}
            onCancel={this.handleSampleCancel}
        >
          <Input.TextArea
              placeholder="请输入一段样例文本"
              rows={5}
              value={sampleText}
              onChange={this.handleSampleChange}
          />
        </Modal>
        {userType==='systemAdmin'?
            <Modal
                visible={addNewSwordVisible}
                onCancel={this.handleAddSwordModalCancel}
                closable={false}
                title={
                  <Button
                      icon={<PlusCircleFilled />}
                      className="config-modal-button"
                      type="primary"
                      onClick={this.addNewSwordToProgramme}
                  >
                    添加新敏感词
                  </Button>
                }
                footer={null}
                width={1200}
            >
              <Menu onClick={this.changeSwordsType} mode="horizontal" selectedKeys={[curSwordType]} theme={"light"}>
                { swordTypes.map((item) => (
                    <Menu.Item key={item.type.toString()}>{item.type}</Menu.Item>
                ))}
              </Menu>
              <div>
                <Checkbox.Group className="sen-checkbox-group" options={swords} onChange={this.handleCheck} value={checkedSwords} />
              </div>
            </Modal>:
            <Modal
                visible={addNewSwordVisible}
                onCancel={this.handleAddSwordModalCancel}
                closable={false}
                title={
                  <Button
                      icon={<EditOutlined />}
                      className="config-modal-button"
                      type="primary"
                      onClick={this.addNewSwordToProgrammeForUser}
                  >
                    修改敏感词
                  </Button>
                }
                footer={null}
                width={1200}
            >
              <div>
                <Checkbox.Group options={sensitiveWords} onChange={this.handleUserCheck} value={userCheckedSwords} />
              </div>
            </Modal>
        }
      </Layout>
    )
  }
}


const mapStateToProps = (state) => ({
  userName: state.userName,
  userType: state.userType,
  userSensitiveLimiter: state.userSensitiveLimiter,
  curProgramme: state.curProgramme,
  programmes: state.programmes,
});
const mapDispatchToProps = {
  onProgrammeChange: actions.onProgrammeChange,
  onProgrammesChange: actions.onProgrammesChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Config);
