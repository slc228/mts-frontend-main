import React from 'react';
import { connect } from 'react-redux';
import { Input, Card, Modal, Table, Button, List, Avatar, Divider, Space, Collapse, Carousel, Badge, Image } from 'antd';
import { LoadingOutlined, MessageOutlined, ManOutlined, WomanOutlined, SendOutlined, LikeOutlined } from '@ant-design/icons';
import { color } from 'echarts';
import moment from 'moment';
import AutofitWrap from '../../common/AutofitWrap/AutofitWrap';
import { actions } from '../../../redux/actions';
import './Monitor.scss';
import addWeiboUser from '../../../services/request/data/addWeiboUser';
import getFangAnMonitor from '../../../services/request/data/getFangAnMonitor';
import getWeiboListByid from '../../../services/request/data/getWeiboListByid';
import searchBriefWeiboUser from '../../../services/request/data/searchBriefWeiboUser';

class Monitor extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedRowKeys: [],
      WeiboUserForSearch: '',
      SearchedWeiboUser: {},
      loading: false,
      sampleVisible: false,
      FangAnMonitor: [],
      WeiboList: [],
    };
    this.columnsRender = [
      {
        title: '微博id',
        dataIndex: 'uri',
        key: 'uri',
        render: this.renderId,
        width: 100,
      },
      {
        title: '微博昵称',
        dataIndex: 'nickname',
        key: 'nickname',
        render: this.renderNickname,
        width: 100,
      },
    ];
  }

  renderId = (text) => <span style={{ color: 'blue' }}>{text}</span>;

  renderNickname = (text) => <span style={{ color: 'blue' }}>{text}</span>;

  componentDidMount() {
    this.props.onMonitorPathChange({ path: '' });
    this.handleGetFangAnMonitor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.handleGetFangAnMonitor();
  }

  handleGetFangAnMonitor = async () => {
    const { fid } = this.props.curProgramme;
    const result = await getFangAnMonitor(fid);
    console.log(result);
    this.setState({
      FangAnMonitor: result,
    });
  };

  handlegetWeiboListByid = async (fid, weibouserid) => {
    const ret = await getWeiboListByid(fid, weibouserid);
    console.log(ret);
    this.setState({
      WeiboList: ret,
    });
  };

  handleOpen = async (text, record) => {
    const { userid } = record;
    const { fid } = this.props.curProgramme;
    await this.handlegetWeiboListByid(fid, userid);
    this.props.onMonitorPathChange({ path: '/result' });
  };

  handleInputChange = (e) => {
    this.setState({
      WeiboUserForSearch: e.target.value,
    });
  };

  handleSearch = async (e) => {
    const { fid } = this.props.curProgramme;
    const { WeiboUserForSearch } = this.state;
    console.log(fid);
    console.log(WeiboUserForSearch);
    // const result = await getWeiboUsers(fid, WeiboUserForSearch);
    const result = await searchBriefWeiboUser(fid, WeiboUserForSearch);
    console.log(result);
    this.setState({
      loading: false,
      SearchedWeiboUser: result,
      sampleVisible: true,
    });
  };

  handleSampleCancel = (e) => {
    this.setState({
      sampleVisible: false,
    });
  };

  handleSampleSubmit= async (e) => {
    const { selectedRowKeys } = this.state;
    const { fid } = this.props.curProgramme;
    let print1 = '';
    let print2 = '';
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < selectedRowKeys.length; j++) {
      // eslint-disable-next-line no-await-in-loop
      const ret = await addWeiboUser(fid, selectedRowKeys[j].uri, selectedRowKeys[j].nickname);
      if (ret.addWeiboUser !== 1) {
        print1 = `${print1}id: ${selectedRowKeys[j].uri}昵称: ${selectedRowKeys[j].nickname} \n `;
      } else {
        print2 = `${print2}id: ${selectedRowKeys[j].uri}昵称: ${selectedRowKeys[j].nickname} \n `;
      }
    }
    let print = '';
    if (print1 !== '') {
      print = `${print1}添加失败 \n `;
    }
    if (print2 !== '') {
      print = `${print + print2}添加成功 \n `;
    }
    alert(print);
    this.setState({
      sampleVisible: false,
    });
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  render() {
    const { username, loading, sampleVisible, SearchedWeiboUser, selectedRowKeys, WeiboUserForSearch } = this.state;
    const FangAnMonitor = this.state.FangAnMonitor || [];
    const WeiboList = this.state.WeiboList || [];
    const curPath = this.props.monitorPath;
    const { fid } = this.props.curProgramme;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    // eslint-disable-next-line default-case
    switch (curPath) {
      case '/result':
        return (
          <div>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 10,
              }}
              dataSource={WeiboList}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  actions={[
                    <Space>
                      <SendOutlined />
                      {item.retweet_num}
                    </Space>,
                    <Space>
                      <MessageOutlined />
                      {item.comment_num}
                    </Space>,
                    <Space>
                      <LikeOutlined />
                      {item.up_num}
                    </Space>,
                  ]}
                  extra={item.original_pictures.length === 0 ? null : (
                    <div
                      style={{ width: 300 }}
                    >
                      <Carousel autoplay>
                        {item.original_pictures.map(picitem => (
                          <div
                            align="center"
                          >
                            <Image
                              width={300}
                              height={200}
                              alt="logo"
                              src={picitem}
                            />
                          </div>
                        ))}
                      </Carousel>
                    </div>
                  )}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.user_avatar} />}
                    title={<a>{item.nickname}</a>}
                    description={(
                      <div style={{ color: 'black' }}>
                        <a style={{ color: '#555555' }}>{item.publish_time}</a>
                        <Divider type="vertical" />
                        <a style={{ color: '#555555' }}>来自  {item.publish_tool}</a>
                        <Divider type="vertical" />
                        <a style={{ color: '#555555' }}>发布于  {item.publish_place}</a>
                      </div>
                    )}
                  />
                  <div>
                    {item.content}
                  </div>
                </List.Item>
              )}
            />
          </div>
        );
      case '':
        return (
          <AutofitWrap
            padding={200}
            minHeight={550}
            className="trace-wrap"
          >
            <div>
              <div className="input-wrap">
                <Input.Search
                  className="mts-multi-filter-input"
                  enterButton="选择用户"
                  size="large"
                  onSearch={this.handleSearch}
                  onChange={this.handleInputChange}
                  value={WeiboUserForSearch}
                />
              </div>
              <Modal
                title="添加监测用户"
                visible={sampleVisible}
                width={720}
                onOk={this.handleSampleSubmit}
                onCancel={this.handleSampleCancel}
              >
                <Table
                  rowSelection={rowSelection}
                  pagination={{
                    pageSize: 5,
                  }}
                  rowKey={record => record}
                  columns={this.columnsRender}
                  dataSource={SearchedWeiboUser}
                  loading={loading}
                  style={{ fontSize: '16px' }}
                />
              </Modal>
            </div>
            <div>
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: page => {
                    console.log(page);
                  },
                  pageSize: 5,
                }}
                dataSource={FangAnMonitor}
                renderItem={item => (
                  <List.Item
                    key={item.title}
                  >
                    <List.Item.Meta
                      avatar={(
                        <Badge dot={item.isnew === 1}>
                          <Avatar src={item.user_avatar} />
                        </Badge>
                      )}
                      title={(
                        <div onClick={e => this.handleOpen(item.userid, item)}>
                          <a>{item.nickname}</a>
                          <Divider type="vertical" />
                          {item.gender === '男' ? <ManOutlined style={{ color: '#1890FF' }} /> : <WomanOutlined style={{ color: '#FFB6C1' }} />}
                        </div>
                      )}
                      description={(
                        <div style={{ color: 'black' }}>
                          <Space size="small" direction="vertical">
                            <a style={{ display: 'block', color: '#555555' }}>{item.location}</a>
                            {item.description ? <a style={{ display: 'block', color: '#555555' }}>{item.verified_reason}</a> : null}
                            {item.description ? <a style={{ display: 'block', color: '#555555' }}>简介： {item.description}</a> : null}
                            {item.description ? <a style={{ display: 'block', color: '#555555' }}>标签： {item.tags}</a> : null}
                            <div>
                              <a style={{ color: '#555555' }}>关注  {item.following}</a>
                              <Divider type="vertical" />
                              <a style={{ color: '#555555' }}>粉丝  {item.followers}</a>
                              <Divider type="vertical" />
                              <a style={{ color: '#555555' }}>微博  {item.weibo_num}</a>
                            </div>
                          </Space>
                        </div>
                      )}
                    />
                    {item.content}
                  </List.Item>
                )}
              />
            </div>
          </AutofitWrap>
        );
    }
  }
}

const mapStateToProps = (state) => ({
  userName: state.userName,
  curProgramme: state.curProgramme,
  monitorPath: state.monitorPath,
});
const mapDispatchToProps = {
  onProgrammeChange: actions.onProgrammeChange,
  onMonitorPathChange: actions.onMonitorPathChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Monitor);