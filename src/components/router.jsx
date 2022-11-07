import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "../pages/login/login.jsx";
//import Register from "../pages/register/register.jsx";
import Dashboard from "../pages/Dashboard/Dashboard";
import Settings from "../pages/Settings/Settings";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart";
import Search from "../pages/Search/Search";

export default () => (
  <Routes>
    <Route path="/" element={<Login />} />

    {/* <Route path="/register" element={<Register />} /> */}
    <Route path="/Dashboard" element={<Dashboard />} />

    <Route path="/ShoppingCart" element={<ShoppingCart />} />

    <Route path="/Settings" element={<Settings />} />

    <Route path="/Search" element={<Search />} />
  </Routes>
);
