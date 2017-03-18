import React, { Component } from 'react';

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
        <ul>
          { this.mapMessages() }
        </ul>
      </div>
    );
  }
}
