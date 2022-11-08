import React from "react";

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
