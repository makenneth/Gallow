import React from "react"
import { Route } from "react-router"
// import Chat from "./components/chat/chat"
import Game from "./components/game/game"
import Main from "./components/main"
import LogInForm from "./users/logInForm"
import SignUpForm from "./users/signUpForm"


const Routes = (<Route path="/" component={Main}>
    <Route path="login" component={LogInForm} />
    <Route path="signup" component={SignUpForm} />
  </Route>)
export default Routes