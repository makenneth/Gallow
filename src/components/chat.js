import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Messages from "./messages"
import Input from "./input"
class Chat extends Component {
  render(){
    return <div>
      <Messages messages={this.props.messages}/>
      <Input />
    </div>
  }
}


const mapStateToProps = ({messages}) => {
  return {
    messages
  }
}


const mapDispatchToProps = (dispatch) => {
}
export default connect(mapStateToPRops)(Chat);