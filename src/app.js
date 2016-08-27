import React from "react"
import { render } from "react-dom"
import { Router, Route,  browserHistory } from "react-router"
import { Provider } from "react-redux"
import Chat from "./components/chat"
import store from "./store"
document.addEventListener("DOMContentLoaded", () => {
  render(<Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Chat} />
      </Router>
    </Provider>, document.getElementById("root"))
})