import React from "react"
import { render } from "react-dom"
import { Router, Route,  browserHistory, RouterContext } from "react-router"
import { Provider } from "react-redux"
import store from "./store"
import routes from "./routes"

document.addEventListener("DOMContentLoaded", () => {
  render(<Provider store={store}>
      <Router history={browserHistory} 
              routes={routes} 
              render={props => <RouterContext {...props}/>} />
    </Provider>, document.getElementById("root"))
})