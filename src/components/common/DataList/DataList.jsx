import React from 'react';
import { Button, Table, Modal } from 'antd';
import { HeartOutlined, TagsOutlined, LoadingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import Lodash from 'lodash';
import criteria from '../MultiFilter/criteria';
import './DataList.scss';
import moment from 'moment';
import DataContent from '../DataContent/DataContent';

class DataList extends React.Component {
  constructor() {
    super();
    this.state = {
      curRecord: undefined,
      visible: false,
    };
    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows);
      },
      getCheckboxProps: (record) => ({}),
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

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    const { disableTag, disableSource, disableEmotion } = this.props;
    if (disableTag) this.columnsRender = this.columnsRender.filter(item => item.key !== 'tag');
    if (disableEmotion) this.columnsRender = this.columnsRender.filter(item => item.key !== 'emotion');
    if (disableSource) this.columnsRender = this.columnsRender.filter(item => item.key !== 'source');
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

  renderSensi = (text) => {
    if (text === '1') return <span style={{ color: 'red' }}>敏感</span>;
    return <span>非敏感</span>;
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

  renderFooter = () => (
    <div className="mts-data-list-footer">
      <span>批量操作：</span>
      <div className="mts-data-list-icon-button">
        <Button primary="true" icon={<TagsOutlined />} onClick={(e) => this.handleMaterial(e)} />
      </div>
      <div className="mts-data-list-icon-button">
        <Button primary="true" icon={<HeartOutlined />} onClick={(e) => this.handleCollect(e)} />
      </div>
    </div>
  );

  handlePageTurned = (pagination) => {
    if (this.props.onPageChange) {
      this.props.onPageChange(pagination.current - 1);
    }
  };

  handleTitleClicked = (record) => {
    this.setState({
      visible: true,
      curRecord: record,
    });
  };

  handleModalCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const data = this.props.data || [];
    const { visible, curRecord } = this.state;
    const { dataSize, pageSize, loading } = this.props;
    return (
      <div className="mts-data-list">
        <div id="table">
          <Table
            rowKey={(record) => record.id}
            columns={this.columnsRender}
            dataSource={data}
            pagination={{
              position: ['none', 'bottomRight'],
              total: dataSize - 1,
              onShowSizeChange: this.props.onPageSizeChange,
            }}
            onChange={this.handlePageTurned}
            loading={loading}
            style={{ fontSize: '16px' }}
          />
          <DataContent
            record={curRecord}
            visible={visible}
            fid={this.props.fid}
            handleModalCancel={this.handleModalCancel}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.userName,
  curProgramme: state.curProgramme,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(DataList);
