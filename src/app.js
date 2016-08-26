import React from "react"
import { render } from "react-dom"
import { Router,  browserHistory } from "react-router"
import { Provider } from "react-redux"
import Chat from "./chat"
import store from "./store"
document.addEventListener("DOMContentLoaded", () => {
  render(<Provider store={store}>
      <Router routes={routes} history={browserHistory}>
        <Route path="/" component={Chat} />
      </Router>
    </Provider>)
})