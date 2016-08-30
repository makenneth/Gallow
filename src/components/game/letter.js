import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { userGuess } from "../../actions/gameActions"

const Letter = (props) => {
  return (
    <div onClick={props.userGuess} className={"letter-box" + props.used ? " used" : ""}>
      { props.letter }
    </div>
    )
}



const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ userGuess }, dispatch);
}

export default connect(null, mapDispatchToProps)(Letter);