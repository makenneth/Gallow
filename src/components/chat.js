import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Messages from "./messages"
import GetUsername from "./getUsername"
import Input from "./input"
import { addNewMessage } from "../actions/actions"

const url = "ws://localhost:8080/chat"
const ws = new WebSocket(url);
class Chat extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
  }
  componentWillMount() {
    ws.onopen = () => {
      this.setState({ loading: false })
    }
    ws.onmessage = this.handleNewMessage;
  }
  getUsername(){
    if (!this.props.currrentUser.username){
      return <GetUsername />
    } else {
      return ""
    }
  }
  handleNewMessage = (res) => {
    let message = JSON.parse(res.data);
    switch (message.Type) {
      case "NEW_MESSAGE":
        this.props.addNewMessage(message.Data);
        break;
      case "NEW_USER":
        this.props.addNewUser(message.Data);
        break;
      case "REMOVE_USER":
        this.props.removeUser(message.Data);
        break;
    }
  }
  loading() {
    if (this.state.loading){
      return <div className="loader"><img src="/images/loading_logofinal_by_zegerdon-d60eb1v.gif"/></div>;
    }
  }
  render(){
    console.log(this.props.currrentUser)
    return <div>
      { this.getUsername() }
      <Messages messages={this.props.messages} />
      <Input ws={ws} author={this.props.currentUser.username}/>
      { this.loading() }
    </div>
  }
}


const mapStateToProps = ({messages, currentUser, users}) => {
  return {
    messages, currentUser, users
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addNewMessage}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat);