import React from "react";
import Post from "./Posts";

import { Navbar, Container } from 'react-bootstrap'
import MapViev from './MapViev';

const App = () => (
  <Container className="main">
    <div>
        <MapViev/>
    </div>
    <div>
        <h2>API posts</h2>
        <Post />
    </div>
  </Container>
);

export default App;
