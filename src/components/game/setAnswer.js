import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { setAnswer } from "../../actions/gameActions"

class SetAnswer extends Component {
  constructor(props){
    super(props);
    this.state = {
      answer: ""
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
   if (nextState.answer !== this.state.answer){
    return true;
   } 

   return false;
  }

  setAnswer = (e) => {
    e.preventDefault();
    this.props.setAnswer(this.state.answer);
  }

  render() {
    return <form onSubmit={this.setAnswer}>
          <input type="text" 
            placeholder="Enter the word to guess"
            value={this.state.answer}
            onChange={ (e) => this.setState({ answer: e.target.value }) }
            />
          <input type="submit" value="Submit"/>
        </form>
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setAnswer }, dispatch);
}

export default connect(null, mapDispatchToProps)(SetAnswer);