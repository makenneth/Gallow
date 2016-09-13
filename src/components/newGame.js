import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { fetchUsers, createGame } from "../actions/gameActions"

class NewGame extends Component {
  constructor(props, context){
    super(props);
    this.state = {
      name: "",
      selectedOpponent: null
    }
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  startGame = () => {
    if (!this.state.selectedOpponent){
      alert("You have to select a player first!")
    } else {
      this.props.createGame(this.props.user,
        this.state.selectedOpponent)
        .then(res => {
          debugger;
          this.context.router.push(`/games/${res.payload.data.id}`)
        }).catch(err => {
          debugger;
          console.log(err)
        }); 
    }
  }
  handleSelect = (e) => {
    this.setState({ selectedOpponent: JSON.parse(e.target.dataset.user) })
  }
  handleChange = (e) => {
    let __timer;
    this.setState({ name: e.target.value })
    clearTimeout(__timer);
    __timer = setTimeout(() => {
        this.props.fetchUsers(this.state.name)
    }, 700)
  }
  render(){
    return (
    <div>
      New Game
      <div type="select-opponent">
        <input type="text" 
               placeholder="Enter the user name"
               onChange={this.handleChange} 
               value={this.state.name}
               />
        <ul onClick={this.handleSelect}>
          { 
            this.props.usersQuery.map( (user) => {
              return <li data-user={JSON.stringify(user)} key={user.id}>{ user.nickname }</li>;
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


