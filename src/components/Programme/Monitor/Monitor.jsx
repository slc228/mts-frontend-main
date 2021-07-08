import React from 'react';
import { connect } from 'react-redux';
import { Input, Card, Modal, Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import AutofitWrap from '../../common/AutofitWrap/AutofitWrap';
import { actions } from '../../../redux/actions';
import DataList from '../../common/DataList/DataList';
import './Monitor.scss';
import getWeiboUserData from '../../../services/request/data/getWeiboUserData';
import getActiveWeiboUser from '../../../services/request/data/getAcitveWeiboUser';
import getOverallData from '../../../services/request/data/getOverallData';
import getSensitiveData from '../../../services/request/programme/getSensitiveData';
import getSensitiveType from '../../../services/request/data/getSensitiveType';
import getWeiboUsers from "../../../services/request/data/getWeiboUsers";

const PAGE_SIZE = 10;

class Monitor extends React.Component {
  constructor() {
    super();
    this.state = {
      prevUsername: '',
      WeiboUserForSearch: '',
      data: {},
      pageSize: PAGE_SIZE,
      loading: false,
      pageId: 0,
      activeWeiboUser: {},
      sensiWeiboUser: {},
      sampleVisible: false,
    };
    this.columnsRender = [
      {
        title: '微博id',
        dataIndex: 'id',
        key: 'id',
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
      {
        title: '操作',
        dataIndex: 'isadded',
        key: 'isadded',
        render: this.renderIsadded,
        width: 100,
      },
    ];
  }

  handleInputChange = (e) => {
    this.setState({
      WeiboUserForSearch: e.target.value,
    });
  };

  handleSearch = async (e) => {
    const { fid } = this.props.curProgramme;
    const { WeiboUserForSearch, data } = this.state;
    const result = await getWeiboUsers(fid, WeiboUserForSearch);
    const newData = { ...data };
    newData[this.getCriteria()] = result;
    this.setState({
      loading: false,
      data: newData,
    });
    this.getSensitiveType();
  };

    handleSampleCancel = (e) => {
      this.setState({
        sampleVisible: false,
      });
    };

    render() {
      const { username, loading, activeWeiboUser, sensiWeiboUser, sampleVisible } = this.state;
      const criteria = this.getCriteria();
      const data = this.state.data[criteria]?.data || [];
      const { fid } = this.props.curProgramme;
      const dataSize = this.state.data[criteria]?.dataSize || 0;
      return (
        <AutofitWrap
          padding={200}
          minHeight={550}
          className="trace-wrap"
        >
          <div className="trace-container">
            <div className="result">
              <div className="input-wrap">
                <Input.Search
                  className="mts-multi-filter-input"
                  enterButton="选择用户"
                  size="large"
                  onSearch={this.handleSearch}
                  onChange={this.handleInputChange}
                  value={username}
                />
              </div>
              <Modal
                title="根据样例文档分析关键词"
                visible={sampleVisible}
                onOk={this.handleSampleSubmit}
                onCancel={this.handleSampleCancel}
              >
                  <table>
                  </table>
              </Modal>
            </div>
          </div>
        </AutofitWrap>
      );
    }
}

const mapStateToProps = (state) => ({
  userName: state.userName,
  curProgramme: state.curProgramme,
});
const mapDispatchToProps = {
  onProgrammeChange: actions.onProgrammeChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Monitor);
