import React from 'react';
import { Button, Table, Modal, Tooltip, Divider, Menu } from 'antd';
import {
  HeartOutlined,
  TagsOutlined,
  LoadingOutlined,
  PlusCircleFilled,
  DeleteFilled,
  SettingFilled,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import Lodash from 'lodash';
import criteria from '../MultiFilter/criteria';
import './DataList.scss';
import moment from 'moment';
import DataContent from '../DataContent/DataContent';
import modeifyMaterial from '../../../services/request/data/modeifyMaterial';
import getMaterial from '../../../services/request/data/getMaterial';
import getProgrammeOrigins from '../../../services/request/programme/getProgrammeOrigins';

class DataList extends React.Component {
  constructor() {
    super();
    this.state = {
      curRecord: undefined,
      visible: false,
    };
    this.columnsRender = [
      {
        title: () => (
          <div>
            内容
            <Divider type="vertical" />
            <Tooltip
              placement="topLeft"
              title={() => (
                <div>
                  <div>选择素材库进行添加</div>
                  {this.props.materiallibs.length === 0 ? null : (this.props.materiallibs.map((item) => (
                    <div className="addMateriallibsButton">
                      <Button type="primary" block onClick={() => this.props.onModeifyMaterial(item.materiallib)}>{`${item.materiallib} (${item.num})`}</Button>
                    </div>
                  )))}
                </div>
              )}
              arrowPointAtCenter
            >
              <PlusCircleFilled />
            </Tooltip>
          </div>
        ),
        dataIndex: 'title',
        key: 'title',
        render: this.renderTitle,
      },
      {
        title: '站点',
        dataIndex: 'resource',
        key: 'resource',
        render: (text) => text,
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

  renderMoment = (text) => (moment(text).format('YYYY-MM-DD hh:mm'));

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
    if (text === '政治敏感 ') return <span className="redSpan">敏感</span>;
    if (text) return <span className="redSpan">{text}</span>;
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
        <div className="graySpan">{renderTxt}</div>
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
    const { dataSize, pageSize, loading, selectedRowKeys } = this.props;

    return (
      <div className="mts-data-list">
        <div id="table">
          <Table
            rowKey={(record) => record.webpageUrl}
            rowSelection={{
              selectedRowKeys,
              preserveSelectedRowKeys: true,
              onChange: this.props.onSelectChange,
            }}
            columns={this.columnsRender}
            dataSource={data}
            pagination={{
              position: ['none', 'bottomRight'],
              total: dataSize - 1,
              onShowSizeChange: this.props.onPageSizeChange,
            }}
            onChange={this.handlePageTurned}
            loading={loading}
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
