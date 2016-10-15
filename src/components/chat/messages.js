import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleChat } from "redux/modules/chat";

@connect(
  () => ({}),
  { toggleChat }
)

export default class Messages extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.messages.length !== nextProps.messages.length) {
      return true;
    }

    return false;
  }
  mapMessages() {
    return this.props.messages.map((msg, i) => (
      <li key={msg.author + msg.body + i}><span>{msg.author}:&nbsp;</span>{msg.body}</li>
    ));
  }
  render() {
    return (
      <div className="message-list">
        <div onClick={this.props.toggleChat}>&times;</div>
        <ul>
          { this.mapMessages() }
        </ul>
      </div>
    );
  }
}
