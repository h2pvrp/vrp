import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

import StaticticsMap from "./StaticticsMap";
import StaticticsTable from "./StatisticsTable";

class Statictics extends Component {
  state = {};
  render() {
    return (
      <Row>
        <Col sm={8}>
          <StaticticsMap />
        </Col>
        <Col sm={4}>
          <StaticticsTable />
        </Col>
      </Row>
    );
  }
}

export default Statictics;
