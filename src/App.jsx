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
  if (!sid) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login setSid={setSid} />} />

          <Route path="/register" element={<Register />} />

          <Route path="/forgetPassword" element={<ForgetPassword />} />

          <Route path="/resetPassword" element={<ResetPassword />} />
        </Routes>
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
