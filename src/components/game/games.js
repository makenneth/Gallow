import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchGames } from "../../actions/gameActions"

class Games extends Component {
  constructor(props, context) {
    super(props);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <div>Here is where the games would go</div>
      )
  }
}

const mapStateToProps = ({ games }) => {
  return { games }
}
export default connect(mapStateToProps, { fetchGames })(Games);