import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./modules/reducer";
import middleware from "./middleware";
import { socketMiddleware } from "./socketMiddleware";

let createStoreWithMiddleware;

if (process.env.__DEVTOOLS__) {
  const { persistState } = require("redux-devtools");
  const DevTools = require("../containers/DevTools/DevTools");
  createStoreWithMiddleware = compose(
    applyMiddleware(middleware, socketMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(middleware, socketMiddleware)(createStore);
}

const store = createStoreWithMiddleware(reducer);

export default store;
