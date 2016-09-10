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
    //this should include the opponent's username
    const data = {
      type: "NEW_MESSAGE",
      data: {
        game_id: this.props.params.id,
        user_id: this.props.user.id,
        author: this.props.user.username, 
        body: this.state.body, 
        username1: this.props.user.username
      }
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
               value={this.state.body}  
               placeholder="Enter your message..."
               autoFocus/>
        <input type="submit" value="Submit"  />
      </form>
      )
  }
}
export default Input;