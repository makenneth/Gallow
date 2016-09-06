import React from "react"
import { Route } from "react-router"
// import Chat from "./components/chat/chat"
import Game from "./components/game/game"
import Main from "./components/main"

const Routes = (<Route path="/" component={Main}>
    <Route path="games/new" component={Game}/>
  </Route>)
export default Routes