import { createStore, applyMiddleware, compose } from 'redux';
import middleware from './middleware';
import { socketMiddleware } from './socketMiddleware';

let createStoreWithMiddleware;

if (process.env.__DEVTOOLS__) {
  const { persistState } = require('redux-devtools');
  const DevTools = require('../containers/DevTools/DevTools');
  createStoreWithMiddleware = compose(
    applyMiddleware(middleware, socketMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger');
  const logger = createLogger();
  createStoreWithMiddleware = applyMiddleware(middleware, logger, socketMiddleware)(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(middleware, socketMiddleware)(createStore);
}

const reducer = require('./modules/reducer');

const store = createStoreWithMiddleware(reducer);
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./modules/reducer', () => {
    store.replaceReducer(require('./modules/reducer'));
  });
}
export default store;
