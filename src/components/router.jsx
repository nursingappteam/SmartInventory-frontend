import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import Settings from "../pages/Settings/Settings.jsx";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart.jsx";
import Search from "../pages/Search/Search.jsx";
import ForgetPassword from "../pages/forgetPassword/ForgetPassword.jsx";
import ResetPassword from "../pages/resetPassword/ResetPassword.jsx";

export default () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />

    <Route path="/ShoppingCart" element={<ShoppingCart />} />

    <Route path="/Settings" element={<Settings />} />

    <Route path="/Search" element={<Search />} />
  </Routes>
);
