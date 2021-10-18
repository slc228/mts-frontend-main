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
      if (this.props.userEventLimiter === '' || !this.props.userEventLimiter) {
        this.props.onSearch(keyword);
      } else {
        let eventLimiter = this.props.userEventLimiter ? this.props.userEventLimiter.split(/\s+/) : [];
        eventLimiter = Array.from(new Set(eventLimiter));
        let arrayInput = keyword ? keyword.split(/\s+/) : [];
        arrayInput = Array.from(new Set(arrayInput));
        const subArray = arrayInput.filter((i) => !eventLimiter.includes(i));
        if (subArray.length > 0) {
          alert(`${subArray.toString()}  关键词不允许搜索`);
        } else {
          this.props.onSearch(keyword);
        }
      }
    }
  };

  handleDateChange = (moments) => {
    if (this.props.onDateChange) {
      this.props.onDateChange(moments);
    }
  };

  render() {
    const { current, initialKeyword, resources } = this.props;
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
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 999 }}
        >
          <div className="criteria">
            <span className="criteria-attr">{criteria(resources)[0].label}: </span>
            <Radio.Group
              className="mts-multi-filter-radios"
              value={current[criteria(resources)[0].name]}
              onChange={(event) => this.handleSelect(event, criteria(resources)[0].name)}
            >
              {criteria(resources)[0].options.map((option) => (
                <Radio
                  value={option.value}
                  key={option.value}
                >
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
            {criteria(resources)[0].name === 'dateRange' && current[criteria(resources)[0].name] === -1 && (
            <DatePicker.RangePicker
              className="mts-multi-filter-date-picker"
              onChange={this.handleDateChange}
            />
            )}
          </div>
          <Divider className="divider" />
          <div className="criteria">
            <span className="criteria-attr">{criteria(resources)[1].label}: </span>
            <Radio.Group
              className="mts-multi-filter-radios"
              value={current[criteria(resources)[1].name]}
              onChange={(event) => this.handleSelect(event, criteria(resources)[1].name)}
            >
              {criteria(resources)[1].options.map((option) => (
                <Radio
                  value={option.value}
                  key={option.value}
                >
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
            {criteria(resources)[1].name === 'dateRange' && current[criteria(resources)[1].name] === -1 && (
            <DatePicker.RangePicker
              className="mts-multi-filter-date-picker"
              onChange={this.handleDateChange}
            />
            )}
          </div>
          <Divider className="divider" />
          <div className="criteria">
            <span className="criteria-attr">{criteria(resources)[2].label}: </span>
            <Radio.Group
              className="mts-multi-filter-radios"
              value={current[criteria(resources)[2].name]}
              onChange={(event) => this.handleSelect(event, criteria(resources)[2].name)}
            >
              {criteria(resources)[2].options.map((option) => (
                <Radio
                  value={option.value}
                  key={option.value}
                >
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
            {criteria(resources)[2].name === 'dateRange' && current[criteria(resources)[2].name] === -1 && (
            <DatePicker.RangePicker
              className="mts-multi-filter-date-picker"
              onChange={this.handleDateChange}
            />
            )}
          </div>
          <Divider className="divider" />
          <div className="criteria">
            <span className="criteria-attr">{criteria(resources)[3].label}: </span>
            <Radio.Group
              className="mts-multi-filter-radios"
              value={current[criteria(resources)[3].name]}
              onChange={(event) => this.handleSelect(event, criteria(resources)[3].name)}
            >
              {criteria(resources)[3].options.map((option) => (
                <Radio
                  value={option.value}
                  key={option.value}
                >
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
            {criteria(resources)[3].name === 'dateRange' && current[criteria(resources)[3].name] === -1 && (
            <DatePicker.RangePicker
              className="mts-multi-filter-date-picker"
              onChange={this.handleDateChange}
            />
            )}
          </div>
          <Divider className="divider" />
          <div className="criteria">
            <span className="criteria-attr">{criteria(resources)[4].label}: </span>
            <Radio.Group
              className="mts-multi-filter-radios"
              value={current[criteria(resources)[4].name]}
              onChange={(event) => this.handleSelect(event, criteria(resources)[4].name)}
            >
              {criteria(resources)[4].options.map((option) => (
                <Radio
                  value={option.value}
                  key={option.value}
                >
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
            {criteria(resources)[4].name === 'dateRange' && current[criteria(resources)[4].name] === -1 && (
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
