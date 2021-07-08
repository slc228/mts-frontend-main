import React from 'react';
import {DatePicker, Radio, Space} from "antd";
import './DateSelector.scss'
import moment from "moment";

class DateSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 30,
      startPublishedMoment: moment().subtract(1, 'month'),
      endPublishedMoment: moment(),
    };
  }

  handleDateSelect = (e) => {
    let startPublishedMoment;
    let endPublishedMoment;
    switch (e.target.value) {
      case 0:
        startPublishedMoment = moment().startOf('day');
        endPublishedMoment = moment();
        this.setState({
          value: e.target.value,
          startPublishedMoment,
          endPublishedMoment,
        });
        break;
      case 1:
        startPublishedMoment = moment().subtract(1, 'day');
        endPublishedMoment = moment();
        this.setState({
          value: e.target.value,
          startPublishedMoment,
          endPublishedMoment,
        });
        break;
      case 3:
        startPublishedMoment = moment().subtract(3, 'day');
        endPublishedMoment = moment();
        this.setState({
          value: e.target.value,
          startPublishedMoment,
          endPublishedMoment,
        });
        break;
      case 7:
        startPublishedMoment = moment().subtract(7, 'day');
        endPublishedMoment = moment();
        this.setState({
          value: e.target.value,
          startPublishedMoment,
          endPublishedMoment,
        });
        break;
      case 30:
        startPublishedMoment = moment().subtract(30, 'day');
        endPublishedMoment = moment();
        this.setState({
          value: e.target.value,
          startPublishedMoment,
          endPublishedMoment,
        });
        break;
      case -1:
        this.setState({
          value: e.target.value,
        });
        break;
    }
    if (e.target.value !== -1) this.props.onDateSelect([startPublishedMoment, endPublishedMoment])
  };

  handleDateChange = (moments) => {
    console.log(moments);
    this.setState({
      startPublishedMoment: moments[0],
      endPublishedMoment: moments[1],
    });
    this.props.onDateSelect(moments);
  };

  render() {
    const { value, startPublishedMoment, endPublishedMoment } = this.state;
    const { className } = this.props;
    return (
      <div className={`date-selector-wrap ${className}`}>
        <Radio.Group onChange={this.handleDateSelect} value={value}>
          <Space>
            <Radio value={0}>今日</Radio>
            <Radio value={1}>一天内</Radio>
          </Space>
          <Space>
            <Radio value={3}>三天内</Radio>
            <Radio value={7}>一周内</Radio>
          </Space>
          <Space>
            <Radio value={30}>一月内</Radio>
            <Radio value={-1}>自定义</Radio>
          </Space>
        </Radio.Group>
        {value === -1 &&
          <DatePicker.RangePicker
            className="date-picker"
            onChange={this.handleDateChange}
          />
        }
      </div>
    );
  }
}

export default DateSelector;