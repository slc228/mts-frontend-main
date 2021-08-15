import React from 'react';
import { Button, Table, Modal, Divider, Tooltip } from 'antd';
import { HeartOutlined, TagsOutlined, LoadingOutlined, DeleteFilled, PlusCircleFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import Lodash from 'lodash';
import moment from 'moment';
import criteria from './criteria';
import DataContent from '../../common/DataContent/DataContent';
import getMaterialDetail from '../../../services/request/data/getMaterialDetail';
import { actions } from '../../../redux/actions';

class Material extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataSize: 0,
      loading: true,
      curRecord: undefined,
      visible: false,
    };
    this.columnsRender = [
      {
        title: () => (
          <div>
            内容
            <Divider type="vertical" />
            <Tooltip placement="topLeft" title="跳转到舆情列表进行添加" arrowPointAtCenter>
              <PlusCircleFilled onClick={this.turnToSpecific} />
            </Tooltip>
          </div>
        ),
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
      {
        dataIndex: 'delete',
        key: 'delete',
        render: this.renderDelete,
      },
    ];
  }

  turnToSpecific=() => {
    this.props.onPageTagChange({
      curPageTag: 'info',
    });
  };

  componentDidMount() {
    this.getBriefingMaterialDetail();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.getBriefingMaterialDetail();
  }

  getBriefingMaterialDetail = async () => {
    const { fid } = this.props.curProgramme;
    const data = await getMaterialDetail(fid);
    this.setState({ data: data.dataContent, loading: false, dataSize: data.hitNumber });
  };

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

  renderDelete=(text, record) => (
    <DeleteFilled onClick={() => this.handleDeletemateria(record.id)} />
  );

    handleTitleClicked = (record) => {
      this.setState({
        visible: true,
        curRecord: record,
      });
    };

    handleModalCancel = () => {
      this.setState({ visible: false });
    };

    handleDeletemateria=(id) => {
      console.log(id);
      const { fid } = this.props.curProgramme;
    };

    render() {
      const { visible, curRecord, dataSize, loading, data } = this.state;

      return (
        <div className="mts-data-list">
          <div id="table">
            <Table
              rowKey={(record) => record.id}
              columns={this.columnsRender}
              dataSource={data}
              pagination={{
                position: ['none', 'bottomRight'],
                total: dataSize,
              }}
              loading={loading}
              style={{ fontSize: '16px' }}
            />
            <DataContent
              record={curRecord}
              visible={visible}
              fid={this.props.curProgramme.fid}
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
  curPageTag: state.curPageTag,
});
const mapDispatchToProps = {
  onPageTagChange: actions.onPageTagChange,
  onProgrammeChange: actions.onProgrammeChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Material);
