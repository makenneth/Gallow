import React, { Component } from "react"

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
          <ul>
            { mapMessages(this.props.messages) }
          </ul>
        </div>
      )
  }
}

export default Messages