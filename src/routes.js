import React from "react";
import { Route, IndexRoute } from "react-router";
import { Game, NewGame, Main, Games } from "containers";
import { isLoaded, loadAuth } from "redux/modules/auth";

export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const checkAuth = () => {
      const { auth: { user } } = store.getState();
      if (!user) {
        replace("/");
      }
      callback();
    };

    if (!isLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  return (<Route onEnter={requireAuth}>
    <Route path="/" component={Main}>
      <IndexRoute component={Games} />
      <Route path="games/new" component={NewGame} />
      <Route path="games/:id" component={Game} />
    </Route>
  </Route>);
};
