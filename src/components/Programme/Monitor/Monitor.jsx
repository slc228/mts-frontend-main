import React from 'react';
import { connect } from 'react-redux';
import { Input, Card, Modal, Table, Button, List, Avatar, Divider, Space, Collapse, Carousel, Badge, Image, PageHeader } from 'antd';
import { LoadingOutlined, MessageOutlined, ManOutlined, WomanOutlined, SendOutlined, LikeOutlined, CloseSquareFilled, PlusCircleFilled, UserOutlined, RollbackOutlined } from '@ant-design/icons';
import { color } from 'echarts';
import moment from 'moment';
import AutofitWrap from '../../common/AutofitWrap/AutofitWrap';
import { actions } from '../../../redux/actions';
import './Monitor.scss';
import addWeiboUser from '../../../services/request/data/addWeiboUser';
import getFangAnMonitor from '../../../services/request/data/getFangAnMonitor';
import getWeiboListByid from '../../../services/request/data/getWeiboListByid';
import searchBriefWeiboUser from '../../../services/request/data/searchBriefWeiboUser';
import deleteWeiboUser from '../../../services/request/data/deleteWeiboUser';

class Monitor extends React.Component {
  constructor() {
    super();
    this.state = {
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
        width: 200,
      },
      {
        title: '微博昵称',
        dataIndex: 'nickname',
        key: 'nickname',
        render: this.renderNickname,
        width: 200,
      },
      {
        title: '操作',
        dataIndex: 'add',
        key: 'add',
        render: this.renderAddButton,
        width: 100,
      },
    ];
  }

  renderId = (text) => <span className="blueSpan">{text}</span>;

  renderNickname = (text) => <span className="blueSpan">{text}</span>;

  renderAddButton = (text, record) => (
    <Button
      type="primary"
      icon={<PlusCircleFilled />}
      onClick={() => this.handleAddWeiboUser(record.uri, record.nickname)}
    >
      添加该用户
    </Button>
  );

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

  handleAddWeiboUser= async (uri, nickname) => {
    const { fid } = this.props.curProgramme;
    /* const ret = await addWeiboUser(fid, uri, nickname);
    if (ret.addWeiboUser !== 1) {
      alert('添加失败');
    } else {
      alert('添加成功');
    } */
    addWeiboUser(fid, uri, nickname);
    alert('添加成功');
    await this.handleSearch();
  };

  handleDeleteWeiboUser= async (uri, nickname) => {
    const { fid } = this.props.curProgramme;
    const ret = await deleteWeiboUser(fid, uri, nickname);
    if (ret.deleteWeiboUser === 1) {
      alert('删除成功');
    } else {
      alert('删除失败');
    }
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  handleRoolback = (e) => {
    this.props.onMonitorPathChange({ path: '' });
    this.handleGetFangAnMonitor();
  };

  render() {
    const { username, loading, sampleVisible, SearchedWeiboUser, selectedRowKeys, WeiboUserForSearch } = this.state;
    const FangAnMonitor = this.state.FangAnMonitor || [];
    const WeiboList = this.state.WeiboList || [];
    const curPath = this.props.monitorPath;
    const { fid } = this.props.curProgramme;

    // eslint-disable-next-line default-case
    switch (curPath) {
      case '/result':
        return (
          <div>
            <List
              itemLayout="vertical"
              size="large"
              header={(
                <Button
                  type="text"
                  size="large"
                  icon={<RollbackOutlined />}
                  onClick={this.handleRoolback}
                >
                  返回上一级
                </Button>
              )}
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
                      <div className="description">
                        <a className="descriptionSpan">{item.publish_time}</a>
                        <Divider type="vertical" />
                        <a className="descriptionSpan">来自  {item.publish_tool}</a>
                        <Divider type="vertical" />
                        <a className="descriptionSpan">发布于  {item.publish_place}</a>
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
                footer={null}
                onCancel={this.handleSampleCancel}
              >
                <Table
                  pagination={{
                    pageSize: 5,
                  }}
                  rowKey={record => record}
                  columns={this.columnsRender}
                  dataSource={SearchedWeiboUser}
                  loading={loading}
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
                renderItem={item => (!item.userid ? (
                  <List.Item>
                    <List.Item.Meta
                      avatar={(
                        <Avatar icon={<UserOutlined />} />
                        )}
                      title={(
                        <a>数据正在爬取中,请稍候!</a>
                        )}
                    />
                  </List.Item>
                ) : (
                  <List.Item
                    key={item.title}
                    extra={(
                      <Button
                        type="primary"
                        icon={<CloseSquareFilled />}
                        onClick={() => this.handleDeleteWeiboUser(item.userid, item.nickname)}
                      >
                        删除该用户
                      </Button>
                          )}
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
                          {item.gender === '男' ? <ManOutlined className="manIcon" /> : <WomanOutlined className="womanIcon" />}
                        </div>
                            )}
                      description={(
                        <div className="description">
                          <Space size="small" direction="vertical">
                            <a className="description-detail-span">{item.location}</a>
                            {item.description ? <a className="description-detail-span">{item.verified_reason}</a> : null}
                            {item.description ? <a className="description-detail-span">简介： {item.description}</a> : null}
                            {item.description ? <a className="description-detail-span">标签： {item.tags}</a> : null}
                            <div>
                              <a className="descriptionSpan">关注  {item.following}</a>
                              <Divider type="vertical" />
                              <a className="descriptionSpan">粉丝  {item.followers}</a>
                              <Divider type="vertical" />
                              <a className="descriptionSpan">微博  {item.weibo_num}</a>
                            </div>
                          </Space>
                        </div>
                            )}
                    />
                    {item.content}
                  </List.Item>
                )
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
