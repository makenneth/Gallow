import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { Router, Route,  browserHistory, RouterContext } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store";
import routes from "./routes";

if (process.env.NODE_ENV !== "production") {
  window.React = React;
}

document.addEventListener("DOMContentLoaded", () => {
  if (process.env.__DEVTOOLS__ && !window.devToolsExtension) {
    const DevTools = require("./containers/DevTools/DevTools");
    render(<Provider store={store}>
        <div>
          <Router
            history={browserHistory}
            render={props => <RouterContext {...props}/>}
          >
            { routes }
          </Router>
          <DevTools />
        </div>
      </Provider>, document.getElementById("root"));
  } else {
    render(<Provider store={store}>
      <Router
        history={browserHistory}
        routes={routes}
        render={props => <RouterContext {...props}/>}
      />
    </Provider>, document.getElementById("root"));
  }
});