import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { fetchUsers, createGame } from "../actions/gameActions"

class NewGame extends Component {
  constructor(props, context){
    super(props);
    this.state = {
      name: "",
      selectedOpponent: null,
      selected: false
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
  handleClear = (e) => {
    this.setState({ 
      name: "",
      selectedOpponent: null
    })
  }
  handleSelect = (e) => {
    let user = JSON.parse(e.target.dataset.user);
    this.setState({ 
      name: user.nickname,
      selectedOpponent: user,
      selected: true
    })
  }
  handleChange = (e) => {
    let __timer;
    this.setState({ 
      name: e.target.value,
      selected: false  
    })
    clearTimeout(__timer);
    __timer = setTimeout(() => {
        this.props.fetchUsers(this.state.name)
    }, 700)
  }
  render(){
    return (<div className="new-game-container">
      <h1>New Game</h1>
      <div>
        <div className="user-input">
          <input type="text" 
                 placeholder="Enter the user name"
                 onChange={this.handleChange} 
                 value={this.state.name}
                 />
          <div onClick={this.handleClear}>&times;</div>
       </div>
        <ul onClick={this.handleSelect} style={{
          display: this.props.usersQuery.length && !this.state.selected ? "block" : "none" 
        }}>
          { 
            function(){
              let users = [],
                usersQuery = this.props.usersQuery;
              for (let i = 0; i < usersQuery.length; i++){
                let user = usersQuery[i]
                if (user.id === 1 || user.id === this.props.user.id) continue;
                users.push(<li data-user={JSON.stringify(user)} key={user.id}>{ user.nickname }</li>);
              }
              return users;
            }.call(this)
          }
        </ul>
      </div>

      <input type="submit" 
             value="Start Game" 
             onClick={this.startGame}
             disabled={!this.state.selectedOpponent}/>
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


