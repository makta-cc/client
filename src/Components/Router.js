import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "routes/Home";
import Summoner from "routes/Summoner";

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/summoner" component={Summoner} />
      <Route path="/hi"></Route>
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default AppRouter;
