import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
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
