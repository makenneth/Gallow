import React, { Component } from 'react';
import { connect } from 'react-redux';
import Messages from './messages';
import { toggleChat } from 'redux/modules/chat_screen';
import Input from './input';

@connect(({ messages, chatScreen }) => ({ messages, chatScreen }), { toggleChat })
export default class Chat extends Component {
  componentDidMount() {
    window.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClick);
  }

  handleClick = (ev) => {
    if (this.props.chatScreen) {
      if (!document.querySelector('.chat-screen').contains(ev.target)) {
        this.props.toggleChat();
      }
    }
  }

  render() {
    return (<div className={`chat-screen${(this.props.chatScreen ? ' chat-open' : ' chat-close')}`}>
      <Messages
        messages={this.props.messages}
        toggleChat={this.props.toggleChat}
      />
      <Input
        messages={this.props.messages}
        chatOpen={this.props.chatScreen}
      />
    </div>);
  }
}
