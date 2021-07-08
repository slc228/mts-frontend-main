import React from 'react';
import { Radio, Input, Form, Divider, DatePicker } from 'antd';
import criteria from './criteria';
import './MultiFilter.scss';

class MultiFilter extends React.Component {
  handleSelect = (event, type) => {
    if (this.props.onSelect) {
      this.props.onSelect(type, event.target.value);
    }
  };

  handleSearch = (keyword) => {
    if (this.props.onSearch) {
      this.props.onSearch(keyword);
    }
  };

  handleDateChange = (moments) => {
    console.log(moments);
    if (this.props.onDateChange) {
      this.props.onDateChange(moments);
    }
  };

  render() {
    const { current, initialKeyword } = this.props;
    return (
      <div className="mts-multi-filter-container">
        <Input.Search
          className="mts-multi-filter-input"
          enterButton="模糊匹配"
          size="large"
          onSearch={this.handleSearch}
          defaultValue={initialKeyword}
        />
        <Form
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 999 }}
        >
          <div className="criteria" style={{ width: '50%'}}>
            <span className="criteria-attr">{criteria[0].label}: </span>
            <Radio.Group
              className="mts-multi-filter-radios"
              value={current[criteria[0].name]}
              onChange={(event) => this.handleSelect(event, criteria[0].name)}
            >
              {criteria[0].options.map((option) => (
                <Radio
                  value={option.value}
                  key={option.value}
                >
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
            {criteria[0].name === 'dateRange' && current[criteria[0].name] === -1 && (
              <DatePicker.RangePicker
                className="mts-multi-filter-date-picker"
                onChange={this.handleDateChange}
              />
            )}
          </div>
          <div className="criteria" style={{ width: '50%'}}>
            <span className="criteria-attr">{criteria[1].label}: </span>
            <Radio.Group
              className="mts-multi-filter-radios"
              value={current[criteria[1].name]}
              onChange={(event) => this.handleSelect(event, criteria[1].name)}
            >
              {criteria[1].options.map((option) => (
                <Radio
                  value={option.value}
                  key={option.value}
                >
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
            {criteria[1].name === 'dateRange' && current[criteria[1].name] === -1 && (
              <DatePicker.RangePicker
                className="mts-multi-filter-date-picker"
                onChange={this.handleDateChange}
              />
            )}
          </div>
          <Divider className="divider" />
          <div className="criteria">
            <span className="criteria-attr">{criteria[2].label}: </span>
            <Radio.Group
              className="mts-multi-filter-radios"
              value={current[criteria[2].name]}
              onChange={(event) => this.handleSelect(event, criteria[2].name)}
            >
              {criteria[2].options.map((option) => (
                <Radio
                  value={option.value}
                  key={option.value}
                >
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
            {criteria[2].name === 'dateRange' && current[criteria[2].name] === -1 && (
              <DatePicker.RangePicker
                className="mts-multi-filter-date-picker"
                onChange={this.handleDateChange}
              />
            )}
          </div>
          <Divider className="divider" />
          <div className="criteria">
            <span className="criteria-attr">{criteria[3].label}: </span>
            <Radio.Group
              className="mts-multi-filter-radios"
              value={current[criteria[3].name]}
              onChange={(event) => this.handleSelect(event, criteria[3].name)}
            >
              {criteria[3].options.map((option) => (
                <Radio
                  value={option.value}
                  key={option.value}
                >
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
            {criteria[3].name === 'dateRange' && current[criteria[3].name] === -1 && (
              <DatePicker.RangePicker
                className="mts-multi-filter-date-picker"
                onChange={this.handleDateChange}
              />
            )}
          </div>
          <Divider className="divider" />
        </Form>
      </div>
    );
  }
}

export default MultiFilter;
