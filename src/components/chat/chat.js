import React, { Component } from "react"
import { connect } from "react-redux"
import Messages from "./messages"
import Input from "./input"

class Chat extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return <div className={"chat-screen" + (this.props.chatScreen ? " chat-open" : "")}>
      <Messages messages={this.props.messages} />
      <Input ws={this.props.ws} 
             messages={this.props.messages}
             chatOpen={this.props.chatScreen}/>
    </div>
  }
}


const mapStateToProps = ({messages, chatScreen }) => {
  return { messages, chatScreen }
}

export default connect(mapStateToProps)(Chat);