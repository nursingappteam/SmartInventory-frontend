import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import Settings from "../pages/Settings/Settings.jsx";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart.jsx";
import Search from "../pages/Search/Search.jsx";
import NotFound from "./notFound.jsx";

export default () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />

    <Route path="/shoppingCart" element={<ShoppingCart />} />

    <Route path="/settings" element={<Settings />} />

    <Route path="/search" element={<Search />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);
