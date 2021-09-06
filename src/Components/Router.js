import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "routes/Home";
import Summoner from "routes/Summoner";
import Error from "routes/Error";

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/summoner">
        <Error message="잘못된 접근입니다" />
      </Route>
      <Route path="/summoner/:id" component={Summoner} />
      <Route path="/hi"></Route>
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default AppRouter;
