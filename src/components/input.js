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
    const data = {"author": this.props.author, "body": this.state.body};
    this.props.ws.send(JSON.stringify(data));
    this.setState({body: ""})
  }
  handleChange = (e) => {
    this.setState({ body: e.target.value })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="body">Body</label>
        <input type="text" id="body" 
               onChange={this.handleChange} 
               value={this.state.body} />
        <input type="submit" value="Submit" />
      </form>
      )
  }
}
export default Input;