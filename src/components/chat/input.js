import React, { Component } from "react";
import { connect } from "react-redux";

@connect(({ chat }) => ({ chat }))

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.chatOpen === false && nextProps.chatOpen === true) {
      document.getElementById("body").focus();
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.body !== nextState.body ||
      this.props.chat.author !== nextProps.chat.author ||
      this.props.chat.gameId !== nextProps.chat.gameId) {
      return true;
    }

    return false;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const msg = Object.assign({}, this.props.chat);
    msg.body = this.state.body;
    this.props.ws.send(JSON.stringify({
      type: "NEW_MESSAGE",
      data: msg
    }));
    this.setState({ body: "" });
  }

  handleChange = (e) => {
    this.setState({ body: e.target.value });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="msg-input-form">
        <input
          type="text"
          id="body"
          onChange={this.handleChange}
          value={this.state.body}
          placeholder="Enter your message..."
        />
        <input type="submit" value="Submit" />
      </form>
      );
  }
}
