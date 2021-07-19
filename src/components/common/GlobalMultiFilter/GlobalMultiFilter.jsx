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
    console.log(moments);
    if (this.props.onDateChange) {
      this.props.onDateChange(moments);
    }
  };

  handleSubmitKeyword = (type, data) => {
    // eslint-disable-next-line default-case
    switch (type) {
      case 'submit':
        console.log(data);
        if (this.props.onSearch) {
          this.props.onSearch(data);
        }
        break;
      case 'reject':
        break;
    }
  };

  render() {
    const { current, initialKeyword } = this.props;
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
            <Input defaultValue={initialKeyword} />
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
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 999 }}
        >
          <div className="criteria" style={{ width: '50%' }}>
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
          <div className="criteria" style={{ width: '50%' }}>
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

export default GlobalMultiFilter;