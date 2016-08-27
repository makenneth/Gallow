import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Messages from "./messages"
import Input from "./input"
import { addNewMessage } from "../actions/actions"

const url = "ws://localhost:8080/chat"
const ws = new WebSocket(url);
class Chat extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      author: null
    }
  }
  componentWillMount() {
    ws.onopen = () => {
      this.setState({ loading: false })
    }
    ws.onmessage = this.handleNewMessage;
  }
  componentDidMount() {
   let author = prompt("Please enter your name..")
   this.setState({ author });
  }
  handleNewMessage = (res) => {
    debugger;
    this.props.addNewMessage(res.data);
  }
  loading() {
    if (this.state.loading){
      return <div className="loader"><img src="/images/loading_logofinal_by_zegerdon-d60eb1v.gif"/></div>;
    }
  }
  render(){
    return <div>
      <Messages messages={this.props.messages} />
      <Input ws={ws} author={this.state.author}/>
      { this.loading() }
    </div>
  }
}


const mapStateToProps = ({messages}) => {
  return {
    messages
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addNewMessage}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat);