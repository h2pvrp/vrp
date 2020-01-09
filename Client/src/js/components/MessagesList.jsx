import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { messages: state.messages };
};

const ConnectedMessagesList = ({ messages }) => (
  // TODO: figure out a way to gen ids
  <ul>
    {messages.map(el => (
      <li key={JSON.stringify(el)}>{JSON.stringify(el)}</li>
    ))}
  </ul>
);

const MessagesList = connect(mapStateToProps)(ConnectedMessagesList);

export default MessagesList;
