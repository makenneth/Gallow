import React, { Component } from "react"
import NavBar from "./navBar"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getCurrentUser, logOut } from "../actions/userActions"
import { fetchedGameData, moveMade } from "../actions/gameActions"
import { addNewMessage, fetchedMessages } from "../actions/chatActions"

const url = "ws://localhost:8080/chat"
const ws = new WebSocket(url);

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
      debugger;
      window.location.replace("/login")
    });

    ws.onmessage = this.handleNewMessage;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.setState({ loading: false })
      ws.send(JSON.stringify({
        type: "USER_CONNECTED",
        data: nextProps.user.username
      }))
    }
  }
  handleNewMessage = (res) => {
    let message = JSON.parse(res.data); //does data need to be parsed?
    debugger;
    switch (message.type) {
      case "GAME_CONNECTED":
        this.props.fetchedGameData(message.data)
        break;
      case "MOVE_MADE":
        this.props.moveMade(message.data);
        break;
      case "NEW_MESSAGE":
        this.props.addNewMessage(message.data);
        break;
      case "FETCHED_MESSAGES":
        this.props.fetchedMessages(message.data);
        break;
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
        { 
          React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
              user: this.props.user,
              ws: ws
            })
          }) 
        }
        { this.loadingScreen() }
      </div>
      )
  }
}
const mapStateToProps = ({ user }) => {
  return { user }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getCurrentUser, logOut, fetchedGameData, moveMade, addNewMessage }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)
