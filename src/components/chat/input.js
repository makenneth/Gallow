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
      inputFocused: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.sending && nextProps.messages.length > this.props.messages.length) {
      this.setState({ body: '', sending: false });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState ||
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

  toggleInputFocus = () => {
    this.setState({ inputFocused: !this.state.inputFocused });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="msg-input-form">
        <div className={`input-field ${this.state.inputFocused && 'focus'}`}>
          <input
            type="text"
            id="msg-input"
            onChange={this.handleChange}
            value={this.state.body}
            onFocus={this.toggleInputFocus}
            onBlur={this.toggleInputFocus}
            placeholder="Enter your message..."
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
      );
  }
}
