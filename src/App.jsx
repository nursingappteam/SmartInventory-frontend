import React, { useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageRouter from "./components/router.jsx";
import LoggedOutRouter from "./components/loggedOutRouter.jsx";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword.jsx";
import ResetPassword from "./pages/resetPassword/ResetPassword.jsx";

import useSid from "./components/useSid.jsx";

function App() {
  const { sid, setSid } = useSid();
  // test if session has proper token
  // move to login screen if not TODO: add reset password pages

  /* if (sid == 1) {
    return <Register setSid={setSid} />;
  } else if (!sid || sid == 0) {
    return <Login setSid={setSid} />;
  } else if (sid == 2) {
    return <ForgetPassword/>
  } */
  if (!sid) {
    return (
      <Router>
        <LoggedOutRouter setSid={setSid} />
      </Router>
    );
  }

  return (
    <Router>
      <PageRouter />
    </Router>
  );
}

export default App;
