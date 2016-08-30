import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Messages from "./messages"
import GetUsername from "../getUsername"
import Input from "./input"
import { addNewMessage, addNewUser, removeUser, setUsers } from "../../actions/actions"

const url = "ws://localhost:8080/chat"
const ws = new WebSocket(url);
class Chat extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      bool: false
    }
  }
  componentWillMount() {
    ws.onopen = () => {
      this.setState({ loading: false })
    }
    ws.onmessage = this.handleNewMessage;
  }
  getUsername(){
    if (!this.props.currentUser.username){
      return <GetUsername ws={ws}/>
    } else {
      return ""
    }
  }
  handleNewMessage = (res) => {
    let message = JSON.parse(res.data);
    switch (message.Type) {
      case "CURRENT_USERS":
        this.props.setUsers(message.Data);
        break;
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
    return <div>
      <div>{`${this.props.users.length} user` + `${this.props.users.length === 1 ? " is" : "s are"} online.`}</div>
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
  return bindActionCreators({addNewMessage, addNewUser, removeUser, setUsers}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat);