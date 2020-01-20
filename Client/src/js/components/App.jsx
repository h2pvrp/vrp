import React from "react";

import { Navbar, Container, Row, Col } from 'react-bootstrap'
import MapViev from './MapViev';
import ResultsStats from './ResultsStats';

const App = () => (
  <Container className="main">
    <div>
        <MapViev/>
        <Row>
          <Col sm>
            <h2>Results</h2>
            <ResultsStats/>
          </Col>
        </Row>
    </div>
  </Container>
);

export default App;
