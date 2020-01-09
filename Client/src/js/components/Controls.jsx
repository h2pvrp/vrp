import React, { Component } from "react";
import { connect } from "react-redux";

import { connect as wsConnect, send as wsSend } from '@giantmachines/redux-websocket';

import { WEBSOCKET_PREFIX } from "../constants/action-types";

function mapDispatchToProps(dispatch) {
  return {
    connect: () => dispatch(wsConnect('ws://localhost:5000/ws', WEBSOCKET_PREFIX)),
    send: (message) => dispatch(wsSend(message, WEBSOCKET_PREFIX)),
  };
}

class ConnectedControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick() {
    this.props.connect();
  }

  handleSubmit(event) {
    event.preventDefault();
    // TODO: bind to state
    const inp = document.querySelector('#input-message');
    const message = inp.value;
    inp.value = "";

    this.props.send(message);
  }

  render() {

    return (
      <div>
        <button onClick={this.handleClick}>Connect to server</button>
        <form onSubmit={this.handleSubmit}>
          <input type="text" id="input-message"/>
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

const Controls = connect(
  null,
  mapDispatchToProps
)(ConnectedControls);

export default Controls;
