import React, { Component } from "react"
import NavBar from "./navBar"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getCurrentUser } from "../actions/userActions"
class Main extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    this.props.getCurrentUser().then(data => {
      debugger;
    }).catch(err => {
      debugger;
    });
  }
  render() {
    console.log(this.props.user)
    return (
      <div>
        <h2>Gallows</h2>
        <NavBar user={this.props.user}/>
        { 
          React.Children.map(this.props.children, (child) => {
            React.cloneElement(child, {
              user: this.props.user
            })
          }) 
        }
      </div>
      )
  }
}
const mapStateToProps = ({ user }) => {
  return { user }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getCurrentUser }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)
