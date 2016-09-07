import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { fetchUsers, createGame } from "../../actions/gameActions"

class NewGame extends Component {
  constructor(props, context){
    super(props);
    this.state = {
      name: "",
      selectedPlayer: null
    }
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  startGame = () => {
    if (!this.state.selectedPlayer){
      alert("You have to select a player first!")
    } else {
      this.props.createGame(this.props.currentUser.id, selectedPlayer)
        .then((res) => {
          this.context.router.push(`/games/res.data.id`)
        });
    }
  }
  handleChange = (e) => {
    let __timer;
    this.setState({ name: e.target.value })
    clearTimeout(__timer);
    __timer = setTimeout(() => {
        this.props.fetchUsers(this.state.name)
    }, 900)
  }
  render(){
    return (
    <div>
      New Game
      <div type="select-player">
        <input type="text" 
               placeholder="Enter the user name"
               onChange={this.handleChange} 
               value={this.state.name}
               />
        <ul>
          { 
            this.props.usersQuery.map( (user) => {
              return <li key={user.id}>{ user.username }</li>;
            }) 
          }
        </ul>
      </div>

      <input type="submit" value="Start Game" onClick={this.startGame}/>
    </div>
    )
  }
}

const mapStateToProps = ({ usersQuery }) => {
  return { usersQuery }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUsers, createGame }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(NewGame)


