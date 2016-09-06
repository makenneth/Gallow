import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { fetchUsers } from "../../actions/gameActions"
class NewGame extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: ""
    }
  }
  handleChange = (e) => {
    this.setState({ name: e.target.value })
    this.props.fetchUsers(e.target.value)
  }
  render(){
    return (
    <div>
      New Game
      <input type="text" 
             placeholder="Enter the user name"
             onChange={this.handleChange} 
             value={this.state.name}
             />
      { 
        this.props.usersQuery.map( (user) => {
          return <li key={user.id}>{ user.username }</li>;
        }) 
      }
    </div>
    )
  }
}

const mapStateToProps = ({ usersQuery }) => {
  return { usersQuery }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUsers }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(NewGame)


