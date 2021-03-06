import React from 'react';
import { Radio, Input, Form, Divider, DatePicker, Button, Layout } from 'antd';
import criteria from './criteria';
import './GlobalMultiFilter.scss';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

class GlobalMultiFilter extends React.Component {
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
    if (this.props.onDateChange) {
      this.props.onDateChange(moments);
    }
  };

  handleSubmitKeyword = (type, data) => {
    if (!data.keyWord) {
      data.keyWord = this.props.initialKeyword;
    }
    // eslint-disable-next-line default-case
    switch (type) {
      case 'submit':
        if (this.props.onSearch) {
          if (this.props.userEventLimiter === '' || !this.props.userEventLimiter) {
            this.props.onSearch(data);
          } else {
            let eventLimiter = this.props.userEventLimiter ? this.props.userEventLimiter.split(/\s+/) : [];
            eventLimiter = Array.from(new Set(eventLimiter));
            const arrInput = data.Keywords ? data.Keywords : [];
            let arrayInput = [];
            arrInput.forEach((item) => {
              arrayInput = arrayInput.concat(item.split(/\s+/));
            });
            arrayInput = Array.from(new Set(arrayInput));
            const subArray = arrayInput.filter((i) => !eventLimiter.includes(i));
            if (subArray.length > 0) {
              alert(`${subArray.toString()}  关键词不允许搜索`);
            } else {
              this.props.onSearch(data);
            }
          }
        }
        break;
      case 'reject':
        break;
    }
  };

  render() {
    const { current, initialKeyword, resources } = this.props;
    return (
      <div className="mts-multi-filter-container">
        <Form
          onFinish={info => this.handleSubmitKeyword('submit', info)}
          onFinishFailed={err => this.handleSubmitKeyword('reject', err)}
        >
          <Form.Item
            name="keyWord"
            rules={[{ required: false, message: '请输入关键词' }]}
            style={{ width: '70%', float: 'left' }}
          >
            <Input name="keyWord" defaultValue={initialKeyword} />
          </Form.Item>
          <Form.Item
            style={{ width: '15%', float: 'left', textAlign: 'center' }}
          >
            <div className="submit-btn-wrap">
              <Button
                className="submit-btn"
                type="primary"
                style={{ width: '90%' }}
                htmlType="submit"
              >
                搜索
              </Button>
            </div>
          </Form.Item>
          <Form.List
            name="Keywords"
            label="关系词"
            rules={[
              {
                validator: async (_, names) => {},
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                <Form.Item
                  style={{ width: '15%', float: 'left', textAlign: 'center' }}
                >
                  <Button
                    type="primary"
                    style={{ width: '90%' }}
                    onClick={() => add()}
                  >
                    添加关键词
                  </Button>

                  <Form.ErrorList errors={errors} />
                </Form.Item>
                {fields.map((field, index) => (
                  <Form.Item
                    required={false}
                    key={field.key}
                    style={{ width: '100%' }}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: '请输入内容或者删除本词条.',
                        },
                      ]}
                      noStyle
                    >
                      <Input placeholder="请输入关键字词组，以空格隔开" style={{ width: '70%' }} />
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

        </Form>
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

export default GlobalMultiFilter;
