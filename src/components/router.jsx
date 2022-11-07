import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "../pages/login/login.jsx";
import Register from "../pages/register/register.jsx";

export default () => (
  <Routes>
    <Route path="/" element={<Login />} />

    <Route path="/register" element={<Register />} />
  </Routes>
);
