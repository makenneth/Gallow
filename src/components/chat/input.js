import React, { Component } from "react"
import { connect } from "react-redux"
class Input extends Component {
  constructor(props){
    super(props)
    this.state = {
      body: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.messages.length !== nextProps.messages.length){
      this.setState({ body: "" })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.body !== nextState.body || 
      this.props.chat.author !== nextProps.chat.author ||
      this.props.chat.gameId !== nextProps.chat.gameId){
      return true;
    }

    return false;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const msg = Object.assign({}, this.props.chat);
    msg.body = this.state.body;
    debugger;
    this.props.ws.send(JSON.stringify({
      type: "NEW_MESSAGE",
      data: msg
    }));
  }

  handleChange = (e) => {
    this.setState({ body: e.target.value })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="msg-input-form">
        <input type="text" id="body" 
               onChange={this.handleChange} 
               value={this.state.body}  
               placeholder="Enter your message..."
               autoFocus/>
        <input type="submit" value="Submit"  />
      </form>
      )
  }
}

const mapStateToProps = ({ chat }) => {
  return { chat }
}
export default connect(mapStateToProps)(Input);