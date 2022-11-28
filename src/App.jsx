import React, { useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import PageRouter from "./components/router.jsx";
import useAccessToken from "./components/useAccessToken.jsx";

function App() {
  const { accessToken, setAccessToken } = useAccessToken();

  // test if session has proper token
  // move to login screen if not TODO: add reset password pages
  if (accessToken == 1) {
    return <Register setAccessToken={setAccessToken} />;
  } else if (accessToken == 2) {
    //return <Register setAccessToken={setAccessToken} />;
  } else if (!accessToken || accessToken == 0) {
    return <Login setAccessToken={setAccessToken} />;
  }

  return (
    <Router>
      <PageRouter />
    </Router>
  );
}

export default App;
