import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Button, Card, Carousel, Layout, Modal, Select, Switch, DatePicker, Table } from 'antd';
import { Divider } from 'antd/es';
import './WarningRecord.scss';
import getWarningRecord from '../../../services/request/programme/getWarningRecord';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm';

class WarningRecord extends React.Component {
  constructor() {
    super();
    this.state = {
      type: 0,
      startTime: moment().subtract(30, 'days'),
      endTime: moment(),
      warningRecord: [],
      warningRecordNum: 0,
    };
    this.columns = [
      {
        title: '发送内容',
        dataIndex: 'content',
        key: 'content',
      },
      {
        title: '联系方式',
        dataIndex: 'contact',
        key: 'contact',
        width: 200,
      },
      {
        title: '发送时间',
        dataIndex: 'time',
        key: 'time',
        width: 200,
        render: this.renderTime,
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        width: 100,
        render: this.renderType,
      },
    ];
  }

  renderTime = (text) => {
    const timeStr = moment(text).format(DATE_FORMAT);
    return (<span>{timeStr}</span>);
  };

  renderType=(text) => {
    if (text === 1) {
      return (<span>自动预警</span>);
    }
    return (<span>定向预警</span>);
  };

  componentDidMount() {
    this.handleGetWarningRecord();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { fid } = this.state;
    if (fid !== this.props.curProgramme?.fid) {
      this.handleGetWarningRecord();
    }
  }

  handleChangeType=(value) => {
    this.setState({ type: value });
  };

  handleTimeChange=(value, dateString) => {
    this.setState({
      startTime: value[0],
      endTime: value[1],
    });
  };

  handleTimeOk=(value) => {
    this.setState({
      startTime: value[0],
      endTime: value[1],
    });
  };

  handleGetWarningRecord=async () => {
    const fid = this.props.curProgramme?.fid;
    const { type, startTime, endTime } = this.state;
    const start = startTime.format(DATE_FORMAT);
    const end = endTime.format(DATE_FORMAT);
    const ret = await getWarningRecord(fid, type, start, end);
    this.setState({
      fid,
      warningRecord: ret.warningRecordContent,
      warningRecordNum: ret.number,
    });
  };

  render() {
    const { type, startTime, endTime, warningRecord, warningRecordNum } = this.state;
    return (
      <Layout className="warning-record-wrap">
        <Card
          className="record-list"
          title={(
            <p className="record-list-title">预警发送记录</p>
          )}
          bordered={false}
        >
          <div style={{ width: '100%', marginBottom: '20px' }}>
            <span>类型选择：&nbsp;</span>
            <Select style={{ width: 120 }} value={type} onChange={(value) => this.handleChangeType(value)}>
              <Select.Option value={0}>全部</Select.Option>
              <Select.Option value={1}>定向预警</Select.Option>
              <Select.Option value={2}>自动预警</Select.Option>
            </Select>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发送时间：&nbsp;</span>
            <DatePicker.RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              value={[startTime, endTime]}
              onChange={(value) => this.handleTimeChange(value)}
              onOk={(value) => this.handleTimeOk(value)}
            />
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Button type="primary" onClick={this.handleGetWarningRecord}>
              查询
            </Button>
          </div>
          <div>
            <Table
              columns={this.columns}
              rowKey={(record) => record.id}
              dataSource={warningRecord}
              pagination={{
                position: ['none', 'bottomRight'],
                pageSize: 10,
                total: warningRecordNum,
              }}
            />
          </div>
        </Card>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  curProgramme: state.curProgramme,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(WarningRecord);
