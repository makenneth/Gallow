import React, { Component } from "react"
class Input extends Component {
  constructor(props){
    super(props)
    this.state = {
      body: ""
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      type: "NEW_MESSAGE",
      data: {"author": this.props.author, "body": this.state.body}
    };
    this.props.ws.send(JSON.stringify(data));
    this.setState({body: ""})
  }

  handleChange = (e) => {
    this.setState({ body: e.target.value })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="msg-input-form">
        <input type="text" id="body" 
               onChange={this.handleChange} 
               value={this.state.body} disabled={!this.props.author} 
               placeholder="Enter your message..."
               autoFocus/>
        <input type="submit" value="Submit" disabled={!this.props.author} />
      </form>
      )
  }
}
export default Input;