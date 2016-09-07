import React, { Component } from "react"
import NavBar from "./navBar"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getCurrentUser, logOut } from "../actions/userActions"
class Main extends Component {
  constructor(props, context){
    super(props);
    this.state = {
      loading: false
    }
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  componentWillMount() {
    this.setState({ loading: true })
    this.props.getCurrentUser().catch(err => {
      window.location.replace("/login")
    });
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.user || nextProps.user) {
      this.setState({ loading: false })
    }
  }
  toggleLoading = () => {
    this.setState({ loading: !this.state.loading })
  }

  logOut = () => {
    this.setState({ loading: true })
    this.props.logOut().then(() => {
      window.location.replace("/")
    }).catch(() => {
      window.location.replace("/")
    })
  }
  loadingScreen() {
    if (this.state.loading) {
      return <div className="overlay">
        <div className="loader"></div>
      </div>
    }
  }
  render() {
    return (
      <div>
        <h2>Gallows</h2>
        <NavBar user={this.props.user} logOut={this.logOut}/>
        { this.props.children }
        { this.loadingScreen() }
      </div>
      )
  }
}
const mapStateToProps = ({ user }) => {
  return { user }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getCurrentUser, logOut }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)
