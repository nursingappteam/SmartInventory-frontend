import React, { useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageRouter from "./components/router.jsx";
import LoggedOutRouter from "./components/loggedOutRouter.jsx";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword.jsx";
import ResetPassword from "./pages/resetPassword/ResetPassword.jsx";

//import useSid from "./components/useSid.jsx";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookies, removeCookies] = useCookies([
    "inventory_session_id",
  ]);
  // test if session has proper token
  if (document.cookie.indexOf("inventory_session_id=")) {
    return (
      <Router>
        <LoggedOutRouter setCookies={setCookies} />
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
