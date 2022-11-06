import React from "react";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PageRouter from "./components/router.jsx";

function App() {
  return (
    <Router>
      <PageRouter />
    </Router>
  );
}

export default App;
