import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendNewMessage } from 'redux/modules/messages';

@connect(({ chat, messages }) => ({ chat, messages }), { sendNewMessage })

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      sending: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.sending && nextProps.messages.length > this.props.messages.length) {
      this.setState({ body: '', sending: false });
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

  componentDidUpdate(prevProps) {
    if (!prevProps.chatOpen && this.props.chatOpen) {
      setTimeout(() => {
        document.querySelector('#msg-input').focus();
      }, 500);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const msg = Object.assign({}, this.props.chat);
    msg.body = this.state.body;
    this.props.sendNewMessage(msg);

    this.setState({ sending: true });
    //  after 5 secs say failed to send?
  }

  handleChange = (e) => {
    this.setState({ body: e.target.value });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="msg-input-form">
        <input
          type="text"
          id="msg-input"
          onChange={this.handleChange}
          value={this.state.body}
          placeholder="Enter your message..."
        />
        <input type="submit" value="Submit" />
      </form>
      );
  }
}
