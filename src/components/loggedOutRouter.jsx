import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "../pages/login/login.jsx";
import Register from "../pages/register/register.jsx";
import ForgetPassword from "../pages/forgetPassword/ForgetPassword.jsx";
import ResetPassword from "../pages/resetPassword/ResetPassword.jsx";
import NotFound from "./notFound.jsx";

export default ({ setCookies }) => (
  <Routes>
    <Route path="/" element={<Login setCookies={setCookies} />} />

    <Route path="/register" element={<Register />} />

    <Route path="/forgetPassword" element={<ForgetPassword />} />

    <Route path="/resetPassword" element={<ResetPassword />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);
