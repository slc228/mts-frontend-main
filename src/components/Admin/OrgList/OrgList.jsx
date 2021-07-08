import React from 'react';
import { Table } from "antd";

class OrgList extends React.Component {
  render() {
    return (
      <Table
        pagination={false}
      />
    );
  }
};

export default OrgList;