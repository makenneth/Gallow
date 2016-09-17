import React, { Component } from "react"
import { toggleChat } from "../../actions/chatActions"
import { connect } from "react-redux"
const mapMessages = (messages = []) => {
  return messages.map((msg, i) => (
    <li key={msg.author + msg.body + i}><span>{msg.author}:&nbsp;</span>{msg.body}</li> 
  ))  
}

class Messages extends Component {
  constructor(props){
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.messages.length !== nextProps.messages.length){
      return true;
    } 

    return false;
  }
  render(){
    return (
        <div className="message-list">
          <div onClick={this.props.toggleChat}>&times;</div>
          <ul>
            { mapMessages(this.props.messages) }
          </ul>
        </div>
      )
  }
}

export default connect(null, { toggleChat})(Messages)