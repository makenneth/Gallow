import React, { Component } from "react"
import { connect } from "react-redux"
import Messages from "./messages"
import Input from "./input"
import { addNewMessage } from "../../actions/chatActions"


class Chat extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return <div>
      <Messages messages={this.props.messages} />
      <Input ws={this.props.ws} 
             author={this.props.user.username}/>
    </div>
  }
}


const mapStateToProps = ({messages}) => {
  return { messages }
}

export default connect(mapStateToProps, { addNewMessage })(Chat);