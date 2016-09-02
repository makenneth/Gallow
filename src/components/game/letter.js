import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { userGuess } from "../../actions/gameActions"

const Letter = (props) => {
  let className = "letter-box" + (props.used ? " used" : "");
  return (
    <div onClick={() => props.userGuess(props.letter)} className={className}>
      <p>{ props.letter }</p>
    </div>
    )
}



const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ userGuess }, dispatch);
}

export default connect(null, mapDispatchToProps)(Letter);