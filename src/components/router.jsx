import * as React from "react";
import { Switch, Route, Router } from "wouter";
import Login from "../pages/login/login";
import Register from "../pages/login/register";



export default () => (
    <Switch>
      <Route path="/" exact>
        <Login />
      </Route>
    
      <Route path="/register" exact>
        <Register />
      </Route>
    </Switch>
);
