import React from 'react';
import { Button, Table, Modal } from 'antd';
import { HeartOutlined, TagsOutlined, LoadingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import Lodash from 'lodash';
import './HotArticle.scss';
import moment from 'moment';
import getHotArticle from '../../../services/request/data/getHotArticle';

const PAGE_SIZE = 10;
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class HotArticle extends React.Component {
  constructor() {
    super();
    this.state = {
      pageId: 0,
      pageSize: PAGE_SIZE,
      loading: false,
      data: [],
      dataSize: 0,
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
        dataIndex: 'resource',
        key: 'resource',
        render: this.renderResource,
        width: 150,
      },
      {
        title: '热度',
        dataIndex: 'heat',
        key: 'heat',
        render: this.renderHeat,
        width: 150,
      },
    ];
  }

  componentDidMount() {
    this.handleSearch();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.state.data && !this.state.loading) {
      this.handleSearch();
    }
  }

  handleSearch = async () => {
    await this.setState({ loading: true });
    const { pageSize, pageId, data } = this.state;
    const params = [pageSize, pageId];
    const result = await getHotArticle(...params);
    console.log(result);
    this.setState({
      loading: false,
      data: result.data,
      dataSize: result.dataSize,
    });
  };

  renderTitle = (text, record) => {
    const addr = record.url;
    return (
      <a style={{ color: '#1890ff' }} onClick={e => this.handleOpen(addr)}>{text}</a>
    );
  };

  renderResource = (text) => (
    <div>{text}</div>
  );

  renderHeat = (text) => (
    <div>{text}</div>
  );

  handleOpen = (text) => {
    window.open(text);
  };

  handlePageChange = (pageId) => {
    this.setState({ pageId }, () => {
      this.handleSearch();
    });
  };

  handlePageSizeChange = (current, pageSize) => {
    this.setState({ pageSize, pageId: 0 }, () => {
      this.handleSearch();
    });
  };

    handlePageTurned = (pagination) => {
      if (this.handlePageChange) {
        this.handlePageChange(pagination.current - 1);
      }
    };

    render() {
      const { data, dataSize, pageSize, loading } = this.state;
      console.log(dataSize);
      console.log(data);
      return (
        <div className="mts-data-list">
          <div id="table">
            <Table
              rowKey={(record) => record.title}
              columns={this.columnsRender}
              dataSource={data}
              pagination={{
                position: ['none', 'bottomRight'],
                total: dataSize,
                pageSize: this.state.pageSize,
                onShowSizeChange: this.handlePageSizeChange,
              }}
              onChange={this.handlePageTurned}
              loading={loading}
              style={{ fontSize: '16px' }}
            />
          </div>
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(HotArticle);
