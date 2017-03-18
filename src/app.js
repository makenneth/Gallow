import 'babel-polyfill';
import 'sass/app.scss';
import 'font-awesome/css/font-awesome.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import store from './redux/store';
import getRoutes from './routes';
import startSocket from './redux/socketMiddleware';

if (process.env.NODE_ENV !== 'production') {
  window.React = React;
}

document.addEventListener('DOMContentLoaded', () => {
  startSocket(store);

  if (process.env.__DEVTOOLS__ && !window.devToolsExtension) {
    const DevTools = require('./containers/DevTools/DevTools');
    render(<Provider store={store}>
      <div>
        <Router
          history={browserHistory}
          render={props => <ReduxAsyncConnect {...props} />}
        >
          {getRoutes(store)}
        </Router>
        <DevTools />
      </div>
    </Provider>, document.getElementById('root'));
  } else {
    render(<Provider store={store}>
      <Router
        history={browserHistory}
        render={props => <ReduxAsyncConnect {...props} />}
      >
        {getRoutes(store)}
      </Router>
    </Provider>, document.getElementById('root'));
  }
});
