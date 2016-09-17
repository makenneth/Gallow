import React, { Component } from "react"
import NavBar from "./navBar"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getCurrentUser, logOut, clearError, setError, stopLoading } from "../actions/userActions"
import { fetchedGameData, updatedGame, createdGame } from "../actions/gameActions"
import { addNewMessage, fetchedMessages } from "../actions/chatActions"
const url = process.env.WS_URL + "/ws"
const ws = new WebSocket(url);

class Main extends Component {
  constructor(props, context){
    super(props);
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  componentWillMount() {
    if (!this.props.user.id){
      this.props.getCurrentUser().catch(this.catchError);
    }

    ws.onmessage = this.handleNewMessage;
    ws.onclose = () => this.props.setError("Connection lost, please try again later...")
  }
  catchError = () => {
    if (!this.props.user){
      window.location.replace("/login")
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.user.id && nextProps.user.id) {
      this.props.stopLoading();
      ws.send(JSON.stringify({
        type: "USER_CONNECTED",
        data: {
          username: nextProps.user.username,
          nickname: nextProps.user.nickname
        }
      }))
    }
  }
  handleNewMessage = (res) => {
    let message = JSON.parse(res.data); 
    switch (message.type) {
      case "GAME_CONNECTED":
        this.props.fetchedGameData(message.data)
        break;
      case "MOVE_MADE":
      case "GAME_FINISHED":
        this.props.updatedGame(message.data);
        break;
      case "NEW_MESSAGE":
        this.props.addNewMessage(message.data);
        break;
      case "FETCHED_MESSAGES":
        this.props.fetchedMessages(message.data);
        break;
      case "CREATED_GAME":
        this.props.createdGame(message.data)
        break;
    }
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
    if (this.props.loading) {
      return <div className="overlay">
        <div className="loader"></div>
      </div>
    }
  }
  flashError() {
    if (this.props.error.message){
      return <div className="flash-error">
          { this.props.error.message }
        </div>
    }
  }
  children() {
    if (this.props.user){
      return  React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
              user: this.props.user,
              ws: ws
            })
          }) 
    }
  }
  render() {
    return (
      <div>
        <NavBar user={this.props.user} logOut={this.logOut}/>
        { this.flashError() }
        { this.children() }
        { this.loadingScreen() }
      </div>
      )
  }
}
const mapStateToProps = ({ user, error, loading }) => {
  return { user, error, loading }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ 
    getCurrentUser, 
    logOut, 
    fetchedGameData, 
    updatedGame, 
    addNewMessage, 
    fetchedMessages, 
    createdGame,
    clearError,
    setError,
    stopLoading }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)
