import React from "react"
import { Route, IndexRoute } from "react-router"
import GameContainer from "./components/gameContainer"
import NewGame from "./components/newGame"
import Main from "./components/main"
import Games from "./components/games"

const Routes = (<Route path="/" component={Main}>
    <IndexRoute component={Games} />
    <Route path="games/new" component={NewGame}/>
    <Route path="games/:id" component={GameContainer}/>
  </Route>)
export default Routes