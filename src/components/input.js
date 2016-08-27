import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { submitMessage } from "../actions/actions"
import { connect } from "react-redux"
class Input extends Component {
  constructor(props){
    super(props)
    this.state = {
      body: ""
    }
  }
  handleSubmit = () => {
    this.props.submitMessage(this.props.ws, this.props.author, this.state.body);
  }
  handleChange(e){
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
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({submitMessage}, dispatch);
}
export default connect(null, mapDispatchToProps)(Input);