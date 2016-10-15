import React from "react";
import { Route, IndexRoute } from "react-router";
import {
  Game,
  NewGame,
  Main,
  Games } from "containers";

const Routes = (<Route path="/" component={Main}>
    <IndexRoute component={Games} />
    <Route path="games/new" component={NewGame}/>
    <Route path="games/:id" component={GameContainer}/>
  </Route>);

export default Routes;
