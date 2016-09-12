import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchGames } from "../actions/gameActions"

class Games extends Component {
  constructor(props, context) {
    super(props);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  componentDidMount() {
    try {
      this.props.fetchGames(this.props.user.id)
    } catch (e) {
      console.log("waiting for user...")
    }
  }

  componentWillReceiveProps(nextProps) {
     if ((!this.props.user && nextProps.user) || 
          (this.props.user && nextProps.user.id !== this.props.user)){
        this.props.fetchGames(nextProps.user.id)
     }
  }
  handleClick = (e) => {
    this.context.router.push(`/games/${e.target.dataset.id}`)
  }
  render() {
    return (
      <div>
        <h1>Previous Game</h1>
        <ul onClick={this.handleClick}>
          { 
            this.props.games.map( game => {
              return <li key={game.id} data-id={game.id}>
                Self:&nbsp;{game.userId1}<br />
                Opponent:&nbsp;{game.userId2}
              </li>
            })
          }
        </ul>
      </div>
      )
  }
}

const mapStateToProps = ({ games }) => {
  return { games }
}
export default connect(mapStateToProps, { fetchGames })(Games);