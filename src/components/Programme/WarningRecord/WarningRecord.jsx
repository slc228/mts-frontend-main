import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Button, Carousel, Modal } from 'antd';
import { Divider } from 'antd/es';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class WarningRecord extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div
        className="warningRecord"
      >
        aaa
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  curProgramme: state.curProgramme,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(WarningRecord);
