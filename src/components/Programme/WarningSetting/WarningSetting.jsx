import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  Carousel,
  Input,
  Layout,
  Modal,
  Switch,
  Tooltip,
  Radio,
  Cascader,
  Checkbox,
  Table,
  Select,
} from 'antd';
import { Divider } from 'antd/es';
import './WarningSetting.scss';
import { CheckOutlined, QuestionCircleOutlined, StarFilled } from '@ant-design/icons';
import { value } from 'lodash/seq';
import getProgrammeWarning from '../../../services/request/programme/getProgrammeWarning';
import modifyProgrammeWarning from '../../../services/request/programme/modifyProgrammeWarning';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const options = [
  {
    value: '全国',
    label: '全国',
  },
  {
    value: '北京',
    label: '北京',
  },
  {
    value: '天津',
    label: '天津',
  },
  {
    value: '上海',
    label: '上海',
  },
  {
    value: '重庆',
    label: '重庆',
  },
  {
    value: '河北',
    label: '河北',
  },
  {
    value: '山西',
    label: '山西',
  },
  {
    value: '辽宁',
    label: '辽宁',
  },
  {
    value: '吉林',
    label: '吉林',
  },
  {
    value: '黑龙江',
    label: '黑龙江',
  },
  {
    value: '江苏',
    label: '江苏',
  },
  {
    value: '浙江',
    label: '浙江',
  },
  {
    value: '安徽',
    label: '安徽',
  },
  {
    value: '福建',
    label: '福建',
  },
  {
    value: '江西',
    label: '江西',
  },
  {
    value: '山东',
    label: '山东',
  },
  {
    value: '河南',
    label: '河南',
  },
  {
    value: '湖北',
    label: '湖北',
  },
  {
    value: '湖南',
    label: '湖南',
  },
  {
    value: '广东',
    label: '广东',
  },
  {
    value: '海南',
    label: '海南',
  },
  {
    value: '四川',
    label: '四川',
  },
  {
    value: '贵州',
    label: '贵州',
  },
  {
    value: '云南',
    label: '云南',
  },
  {
    value: '陕西',
    label: '陕西',
  },
  {
    value: '甘肃',
    label: '甘肃',
  },
  {
    value: '青海',
    label: '青海',
  },
  {
    value: '内蒙古',
    label: '内蒙古',
  },
  {
    value: '广西',
    label: '广西',
  },
  {
    value: '西藏',
    label: '西藏',
  },
  {
    value: '宁夏',
    label: '宁夏',
  },
  {
    value: '新疆',
    label: '新疆',
  },
  {
    value: '香港',
    label: '香港',
  },
  {
    value: '澳门',
    label: '澳门',
  },
  {
    value: '台湾',
    label: '台湾',
  },
];

const plainOptions = ['微博', '政务', '网站', '外媒', '论坛', '报刊', '客户端', '微信', '视频', '博客', '新闻'];

class WarningSetting extends React.Component {
  constructor() {
    super();
    this.state = {
      area: '全国',
      deWeight: 0,
      filtrate: 0,
      informationType: [],
      involve: 0,
      matchingWay: 0,
      result: 0,
      sensitiveAttribute: 0,
      similarArticle: 0,
      sourceSite: 0,
      warningSwitch: 0,
      warningType: 0,
      weiboType: 0,
      words: '',
    };
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 100,
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '微信',
        dataIndex: 'weChat',
        key: 'weChat',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        width: 100,
      },
    ];
  }

  componentDidMount() {
    this.handleGetFanganWarning();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { fid } = this.state;
    if (fid !== this.props.curProgramme?.fid) {
      this.handleGetFanganWarning();
    }
  }

  handleGetFanganWarning=async () => {
    const fid = this.props.curProgramme?.fid;
    const result = await getProgrammeWarning(fid);
    this.setState({
      fid,
      area: result.area,
      deWeight: result.deWeight,
      filtrate: result.filtrate,
      informationType: result.informationType.split(','),
      involve: result.involve,
      matchingWay: result.matchingWay,
      result: result.result,
      sensitiveAttribute: result.sensitiveAttribute,
      similarArticle: result.similarArticle,
      sourceSite: result.sourceSite,
      warningSwitch: result.warningSwitch,
      warningType: result.warningType,
      weiboType: result.weiboType,
      words: result.words,
    });
  };

  handleChangeWarningSetting=async (setting, type) => {
    const {
      area, deWeight, filtrate, informationType, involve, matchingWay, result, sensitiveAttribute,
      similarArticle, sourceSite, warningSwitch, warningType, weiboType, words,
    } = this.state;
    const warningSwitchNumber = warningSwitch ? 1 : 0;
    const informationTypeString = informationType.join(',');
    const fid = this.props.curProgramme?.fid;
    if (type === 'warningSwitch') {
      const ret = await modifyProgrammeWarning(fid, setting ? 1 : 0, words, sensitiveAttribute, similarArticle,
        area, sourceSite, result, involve, matchingWay, weiboType, deWeight, filtrate, informationTypeString, warningType);
      if (ret === 1) {
        this.setState({ warningSwitch: setting });
        alert('修改成功');
      } else {
        alert('修改失败');
      }
    }
    if (type === 'words') {
      const ret = await modifyProgrammeWarning(fid, warningSwitchNumber, words, sensitiveAttribute, similarArticle,
        area, sourceSite, result, involve, matchingWay, weiboType, deWeight, filtrate, informationTypeString, warningType);
      if (ret === 1) {
        alert('修改成功');
      } else {
        alert('修改失败');
      }
    }
    if (type === 'sensitiveAttribute') {
      const ret = await modifyProgrammeWarning(fid, warningSwitchNumber, words, setting.target.value, similarArticle,
        area, sourceSite, result, involve, matchingWay, weiboType, deWeight, filtrate, informationTypeString, warningType);
      if (ret === 1) {
        this.setState({ sensitiveAttribute: setting.target.value });
        alert('修改成功');
      } else {
        alert('修改失败');
      }
    }
    if (type === 'similarArticle') {
      const ret = await modifyProgrammeWarning(fid, warningSwitchNumber, words, sensitiveAttribute, setting.target.value,
        area, sourceSite, result, involve, matchingWay, weiboType, deWeight, filtrate, informationTypeString, warningType);
      if (ret === 1) {
        this.setState({ similarArticle: setting.target.value });
        alert('修改成功');
      } else {
        alert('修改失败');
      }
    }
    if (type === 'area') {
      const ret = await modifyProgrammeWarning(fid, warningSwitchNumber, words, sensitiveAttribute, similarArticle,
        setting, sourceSite, result, involve, matchingWay, weiboType, deWeight, filtrate, informationTypeString, warningType);
      if (ret === 1) {
        this.setState({ area: setting });
        alert('修改成功');
      } else {
        alert('修改失败');
      }
    }
    if (type === 'sourceSite') {
      const ret = await modifyProgrammeWarning(fid, warningSwitchNumber, words, sensitiveAttribute, similarArticle,
        area, setting.target.value, result, involve, matchingWay, weiboType, deWeight, filtrate, informationTypeString, warningType);
      if (ret === 1) {
        this.setState({ sourceSite: setting.target.value });
        alert('修改成功');
      } else {
        alert('修改失败');
      }
    }
    if (type === 'result') {
      const ret = await modifyProgrammeWarning(fid, warningSwitchNumber, words, sensitiveAttribute, similarArticle,
        area, sourceSite, setting.target.value, involve, matchingWay, weiboType, deWeight, filtrate, informationTypeString, warningType);
      if (ret === 1) {
        this.setState({ result: setting.target.value });
        alert('修改成功');
      } else {
        alert('修改失败');
      }
    }
    if (type === 'involve') {
      const ret = await modifyProgrammeWarning(fid, warningSwitchNumber, words, sensitiveAttribute, similarArticle,
        area, sourceSite, result, setting.target.value, matchingWay, weiboType, deWeight, filtrate, informationTypeString, warningType);
      if (ret === 1) {
        this.setState({ involve: setting.target.value });
        alert('修改成功');
      } else {
        alert('修改失败');
      }
    }
    if (type === 'matchingWay') {
      const ret = await modifyProgrammeWarning(fid, warningSwitchNumber, words, sensitiveAttribute, similarArticle,
        area, sourceSite, result, involve, setting.target.value, weiboType, deWeight, filtrate, informationTypeString, warningType);
      if (ret === 1) {
        this.setState({ matchingWay: setting.target.value });
        alert('修改成功');
      } else {
        alert('修改失败');
      }
    }
    if (type === 'weiboType') {
      const ret = await modifyProgrammeWarning(fid, warningSwitchNumber, words, sensitiveAttribute, similarArticle,
        area, sourceSite, result, involve, matchingWay, setting.target.value, deWeight, filtrate, informationTypeString, warningType);
      if (ret === 1) {
        this.setState({ weiboType: setting.target.value });
        alert('修改成功');
      } else {
        alert('修改失败');
      }
    }
    if (type === 'deWeight') {
      const ret = await modifyProgrammeWarning(fid, warningSwitchNumber, words, sensitiveAttribute, similarArticle,
        area, sourceSite, result, involve, matchingWay, weiboType, setting.target.value, filtrate, informationTypeString, warningType);
      if (ret === 1) {
        this.setState({ deWeight: setting.target.value });
        alert('修改成功');
      } else {
        alert('修改失败');
      }
    }
    if (type === 'filtrate') {
      const ret = await modifyProgrammeWarning(fid, warningSwitchNumber, words, sensitiveAttribute, similarArticle,
        area, sourceSite, result, involve, matchingWay, weiboType, deWeight, setting.target.value, informationTypeString, warningType);
      if (ret === 1) {
        this.setState({ filtrate: setting.target.value });
        alert('修改成功');
      } else {
        alert('修改失败');
      }
    }
    if (type === 'informationType') {
      const ret = await modifyProgrammeWarning(fid, warningSwitchNumber, words, sensitiveAttribute, similarArticle,
        area, sourceSite, result, involve, matchingWay, weiboType, deWeight, filtrate, setting.join(','), warningType);
      if (ret === 1) {
        this.setState({ informationType: setting });
        alert('修改成功');
      } else {
        alert('修改失败');
      }
    }
  };

  handleChangeWarningWords=(e) => {
    this.setState({ words: e.target.value });
  };

  render() {
    const { area, deWeight, filtrate,
      informationType, involve,
      matchingWay, result, sensitiveAttribute,
      similarArticle, sourceSite, warningSwitch,
      warningType, weiboType, words } = this.state;
    return (
      <Layout className="warning-setting-wrap">
        <Card
          className="setting-form"
          title={(
            <div>
              <span className="setting-form-switch">预警开关&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <Switch checked={warningSwitch} onChange={(checked) => this.handleChangeWarningSetting(checked, 'warningSwitch')} />
            </div>
          )}
          bordered={false}
        >
          <div>
            <p className="setting-form-title">
              <span className="setting-form-blueblock">&nbsp;</span>
              <span>&nbsp;&nbsp;&nbsp;</span>
              预警词
            </p>
            <Tooltip title="根据预警词进行预警的发送">
              <QuestionCircleOutlined />
            </Tooltip>
            <span className="setting-form-span">设置预警词：</span>
            <Input.Search
              className="setting-form-input"
              placeholder="输入名称后点击按钮完成添加"
              enterButton="提交"
              value={words}
              onChange={(event) => this.handleChangeWarningWords(event)}
              onSearch={() => this.handleChangeWarningSetting(1, 'words')}
            />
          </div>
          <Divider />
          <div>
            <p className="setting-form-title">
              <span className="setting-form-blueblock">&nbsp;</span>
              <span>&nbsp;&nbsp;&nbsp;</span>
              预警条件设置
            </p>
            <div className="setting-form-item">
              <span>敏感属性：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <Radio.Group value={sensitiveAttribute} size="small" buttonStyle="solid" onChange={(event) => this.handleChangeWarningSetting(event, 'sensitiveAttribute')}>
                <Radio.Button value={0}>全部</Radio.Button>
                <Radio.Button value={1}>负面</Radio.Button>
                <Radio.Button value={2}>正面</Radio.Button>
                <Radio.Button value={3}>中性</Radio.Button>
              </Radio.Group>
            </div>
            <div className="setting-form-item">
              <span>相似文章：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <Radio.Group value={similarArticle} size="small" buttonStyle="solid" onChange={(event) => this.handleChangeWarningSetting(event, 'similarArticle')}>
                <Radio.Button value={0}>不合并</Radio.Button>
                <Radio.Button value={1}>合并</Radio.Button>
              </Radio.Group>
            </div>
            <div className="setting-form-item">
              <span>信源区域：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <Select size="small" value={area} options={options} onChange={(value) => { this.handleChangeWarningSetting(value, 'area'); }} />
            </div>
            <div className="setting-form-item">
              <span>来源网站：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <Radio.Group value={sourceSite} size="small" buttonStyle="solid" onChange={(event) => this.handleChangeWarningSetting(event, 'sourceSite')}>
                <Radio.Button value={0}>全部</Radio.Button>
                <Radio.Button value={1}>贴吧</Radio.Button>
                <Radio.Button value={2}>定向信源</Radio.Button>
              </Radio.Group>
            </div>
            <div className="setting-form-item">
              <span>结果呈现：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <Radio.Group value={result} size="small" buttonStyle="solid" onChange={(event) => this.handleChangeWarningSetting(event, 'result')}>
                <Radio.Button value={0}>全部信息</Radio.Button>
                <Radio.Button value={1}>正常信息</Radio.Button>
                <Radio.Button value={2}>噪音信息</Radio.Button>
              </Radio.Group>
            </div>
            <div className="setting-form-item">
              <span>涉及方式：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <Radio.Group value={involve} size="small" buttonStyle="solid" onChange={(event) => this.handleChangeWarningSetting(event, 'involve')}>
                <Radio.Button value={0}>全部</Radio.Button>
                <Radio.Button value={1}>内容涉及</Radio.Button>
                <Radio.Button value={2}>定向涉及</Radio.Button>
              </Radio.Group>
            </div>
            <div className="setting-form-item">
              <span>匹配方式：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <Radio.Group value={matchingWay} size="small" buttonStyle="solid" onChange={(event) => this.handleChangeWarningSetting(event, 'matchingWay')}>
                <Radio.Button value={0}>按全文</Radio.Button>
                <Radio.Button value={1}>按标题</Radio.Button>
                <Radio.Button value={2}>按正文</Radio.Button>
              </Radio.Group>
            </div>
            <div className="setting-form-item">
              <span>微博类型：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <Radio.Group value={weiboType} size="small" buttonStyle="solid" onChange={(event) => this.handleChangeWarningSetting(event, 'weiboType')}>
                <Radio.Button value={0}>全部</Radio.Button>
                <Radio.Button value={1}>原创微博</Radio.Button>
                <Radio.Button value={2}>转发微博</Radio.Button>
              </Radio.Group>
            </div>
            <div className="setting-form-item">
              <span>信息去重：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <Radio.Group value={deWeight} size="small" buttonStyle="solid" onChange={(event) => this.handleChangeWarningSetting(event, 'deWeight')}>
                <Radio.Button value={0}>否</Radio.Button>
                <Radio.Button value={1}>是</Radio.Button>
              </Radio.Group>
            </div>
            <div className="setting-form-item">
              <span>精准筛选：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <Radio.Group value={filtrate} size="small" buttonStyle="solid" onChange={(event) => this.handleChangeWarningSetting(event, 'filtrate')}>
                <Radio.Button value={0}>关闭</Radio.Button>
                <Radio.Button value={1}>打开</Radio.Button>
              </Radio.Group>
            </div>
            <div>
              <span>信息类型：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <Checkbox.Group options={plainOptions} value={informationType} onChange={(checkedValue) => this.handleChangeWarningSetting(checkedValue, 'informationType')} />
            </div>
            <Divider />
          </div>
          <div>
            <p className="setting-form-title">
              <span className="setting-form-blueblock">&nbsp;</span>
              <span>&nbsp;&nbsp;&nbsp;</span>
              <span>预警模式设置</span><span style={{ color: 'gray' }}>(*定向预警和自动预警只能使用一种)</span>
            </p>
            <Table columns={this.columns} />
            <div style={{ textAlign: 'center' }}><Button>新增联系人</Button></div>
          </div>
        </Card>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.userName,
  curProgramme: state.curProgramme,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(WarningSetting);
