import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "../pages/login/login.jsx";
import Register from "../pages/register/register.jsx";
import ForgetPassword from "../pages/forgetPassword/ForgetPassword.jsx";
import ResetPassword from "../pages/resetPassword/ResetPassword.jsx";

export default ({ setSid }) => (
  <Routes>
    <Route path="/" element={<Login />} />

    <Route path="/register" element={<Register />} />

    <Route path="/forgetPassword" element={<ForgetPassword />} />

    <Route path="/resetPassword" element={<ResetPassword />} />
  </Routes>
);
