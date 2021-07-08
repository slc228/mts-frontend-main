import React from "react";
import {Table, Button, Input} from "antd";
import {actions} from "../../../redux/actions";
import {connect} from "react-redux";
import './Origin.scss';
import AutofitWrap from "../../common/AutofitWrap/AutofitWrap";
import getProgrammeOrigins from "../../../services/request/programme/getProgrammeOrigins";
import delProgrammeOrigins from "../../../services/request/programme/delProgrammeOrigin";
import addProgrammeOrigin from "../../../services/request/programme/addProgrammeOrigin";

class Origin extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '站点',
        key: 'url',
        dataIndex: 'url',
        render: (text) => (<a href={text}>{text}</a>),
      },
      {
        title: '名称',
        key: 'name',
        dataIndex: 'name',
        width: 150,
      },
      {
        title: '选项',
        render: (text, record, index) => (
          <Button
            type="primary"
            danger
            onClick={e => this.delOrigin(record.id)}
          >
            删除
          </Button>
        ),
        width: 100,
      },
    ];
    this.state = {
      loading: false,
      data: [],
      newAddr: '',
      newName: ''
    };
  };

  componentDidMount() {
    this.getOrigins();
  }

  getOrigins = async () => {
    this.setState({ loading: true })
    const data = await getProgrammeOrigins();
    this.setState({ data, loading: false });
  };

  delOrigin = async (id) => {
    const result = await delProgrammeOrigins(id);
    if (result.delUrl) alert('删除成功！');
    else alert('删除失败！');
    this.getOrigins();
  };

  handleNewAddrChange = (e) => {
    this.setState({ newAddr: e.target.value })
  };

  handleNewNameChange = (e) => {
    this.setState({ newName: e.target.value })
  };

  shouldComponentUpdate(prevProps, prevState, snapshot) {
    if (prevProps.curProgramme?.fid !== this.props.curProgramme?.fid) {
      this.getOrigins();
      return false;
    }
    return true;
  }

  handleNewOrigin = async () => {
    const { newAddr, newName } = this.state;
    const { userName } = this.props;
    const result = await addProgrammeOrigin(newName, newAddr, userName);
    if (result.saveUrl === 1) alert('添加成功！');
    else alert('添加失败！');
    this.getOrigins();
  };

  render() {
    const { data, loading, newAddr, newName } = this.state;
    const { columns } = this;
    const { curProgramme } = this.props;
    return (
      <AutofitWrap
        minHeight={550}
        padding={200}
        className="origin-wrap"
      >
        <div className="origin-form">
          <div className="origin-new">
            <Input
              placeholder="请输入站点地址"
              className="origin-addr"
              onChange={this.handleNewAddrChange}
              value={newAddr}
            />
            <Input
              placeholder="请输入站点名称"
              className="origin-name"
              value={newName}
              onChange={this.handleNewNameChange}
            />
            <Button
              type="primary"
              onClick={this.handleNewOrigin}
            >
              添加站点
            </Button>
          </div>
          <Table
            loading={loading}
            className="origin-table"
            columns={this.columns}
            dataSource={data}
            pagination={false}
            size="small"
          />
        </div>
      </AutofitWrap>
    );
  }
}

const mapStateToProps = (state) => ({
  curProgramme: state.curProgramme,
  userName: state.userName,
});
const mapDispatchToProps = {
  onProgrammeChange: actions.onProgrammeChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Origin);