import React from 'react';
import moment from 'moment';
import Lodash from 'lodash';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import getProgrammeData from '../../../services/request/data/getProgrammeData';
import getContentEmotion from '../../../services/request/data/getContentEmotion';
import MultiFilter from '../../common/MultiFilter/MultiFilter';
import DataList from '../../common/DataList/DataList';
import './Specific.scss';
import { actions } from '../../../redux/actions';
import getContentTag from '../../../services/request/data/getContentTag';
import getOverallData from '../../../services/request/data/getOverallData';
import getSensitiveType from '../../../services/request/data/getSensitiveType';

const PAGE_SIZE = 10;
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class Specific extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageId: 0,
      pageSize: PAGE_SIZE,
      keyword: '',
      source: null,
      startPublishedDay: '',
      endPublishedDay: '',
      sensi: null,
      emotion: null,
      dateRange: null,
      loading: false,
      timeOrder: 0,
      data: {},
    };
  }

  getCriteria = () => {
    const fid = this.props.curProgramme?.fid;
    const { keyword, source, startPublishedDay, endPublishedDay, sensi, timeOrder, pageSize, pageId } = this.state;
    const criteria = { fid, keyword, source, startPublishedDay, endPublishedDay, sensi, timeOrder, pageSize, pageId };
    return JSON.stringify(criteria);
  };

  componentDidMount() {
    this.handleSearch();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const criteria = this.getCriteria();
    if (!this.state.data[criteria] && !this.state.loading) {
      this.handleSearch();
    }
  }

  handleSearch = async () => {
    await this.setState({ loading: true });
    const fid = this.props.curProgramme?.fid;
    const { keyword, source, startPublishedDay, endPublishedDay, sensi, emotion, timeOrder, pageSize, pageId, data } = this.state;
    const params = [fid, keyword, source, startPublishedDay, endPublishedDay, sensi, emotion, timeOrder, pageSize, pageId];
    const result = await getProgrammeData(...params);
    const newData = { ...data };
    newData[this.getCriteria()] = result;
    this.setState({
      loading: false,
      data: newData,
    });
  };

  handleDateChange = (moments) => {
    if (!moments) {
      this.setState({
        startPublishedDay: '',
        endPublishedDay: '',
      });
      return;
    }
    const [startMoment, endMoment] = moments;
    this.setState({
      startPublishedDay: startMoment.format(DATE_FORMAT),
      endPublishedDay: endMoment.format(DATE_FORMAT),
    });
  };

  handleSelect = (name, value) => {
    const newState = {};
    newState[name] = value;
    this.setState(newState);
    const current = moment();
    if (name === 'dateRange') {
      switch (value) {
        case 0:
          this.handleDateChange([
            moment(current).startOf('day'),
            moment(current),
          ]);
          break;
        case -1:
        case null:
          this.handleDateChange();
          break;
        default:
          this.handleDateChange([
            moment(current).subtract(value, 'days'),
            moment(current),
          ]);
          break;
      }
    }
    this.handleSearch();
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

  handleKeywordChange = (keyword) => {
    this.setState({ keyword }, () => {
      this.handleSearch();
    });
  };

  render() {
    const params = ['sensi', 'emotion', 'source', 'timeOrder', 'dateRange', 'startPublishedDay', 'endPublishedDay'];
    const current = Lodash.pick(this.state, params);
    const criteria = this.getCriteria();
    const { curProgramme } = this.props;
    const { pageSize, loading } = this.state;
    const data = this.state.data[criteria]?.data || [];
    const dataSize = this.state.data[criteria]?.dataSize || 0;

    return (
      <Layout className="programme-specific-wrap">
        <MultiFilter
          current={current}
          onSelect={this.handleSelect}
          onSearch={this.handleKeywordChange}
          onDateChange={this.handleDateChange}
        />
        <DataList
          data={data}
          dataSize={dataSize}
          pageSize={pageSize}
          loading={loading}
          fid={this.props.curProgramme?.fid}
          onPageChange={this.handlePageChange}
          onPageSizeChange={this.handlePageSizeChange}
        />
      </Layout>
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

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Specific);
