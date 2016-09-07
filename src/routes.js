import React from "react"
import { Route } from "react-router"
// import Chat from "./components/chat/chat"
import Game from "./components/game/game"
import NewGame from "./components/game/newGame"
import Main from "./components/main"

const Routes = (<Route path="/" component={Main}>
    <Route path="games/new" component={NewGame}/>
    <Route path="games/:id" component={Game}/>
  </Route>)
export default Routes