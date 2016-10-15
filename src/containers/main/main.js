import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "./navBar";
import * as userActions from "redux/modules/user";
import { clearError, setError } from "redux/modules/error";
import { stopLoading } from "redux/modules/loading";
import { fetchedGameData, updatedGame } from "redux/modules/game";
import { createdGame } from "redux/modules/games";
import * as chatActions from "redux/modules/messages";

const url = process.env.WS_URL + "/ws";
const ws = new WebSocket(url);

@connect(
  ({ user, error, loading }) => ({ user, error, loading }),
  ({
    ...chatActions,
    ...userActions,
    fetchedGameData,
    updatedGame,
    createdGame,
    clearError,
    setError,
    stopLoading
  })
)
export default class Main extends Component {
  constructor(props, context){
    super(props);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    if (!this.props.user.id){
      this.props.getCurrentUser();
    }

    ws.onmessage = this.handleNewMessage;
    ws.onclose = () => this.props.setError("Connection lost, please try again later...")
  }

  catchError = () => {
    if (!this.props.user) {
      window.location.replace("/login");
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
      }));
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
      default:
        break;
    }
  }

  logOut = () => {
    this.setState({ loading: true });
    this.props.logOut().then(() => {
      window.location.replace("/");
    }).catch(() => {
      window.location.replace("/");
    });
  }
  loadingScreen() {
    if (this.props.loading) {
      return (<div className="overlay">
        <div className="loader"></div>
      </div>);
    }
  }
  flashError() {
    if (this.props.error.message) {
      return (<div className="flash-error">
        { this.props.error.message }
      </div>);
    }
  }
  children() {
    if (this.props.user) {
      return React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, {
          user: this.props.user,
          ws: ws
        });
      });
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
    );
  }
}
