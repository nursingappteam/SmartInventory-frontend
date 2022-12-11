import React, { useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageRouter from "./components/router.jsx";
import LoggedOutRouter from "./components/loggedOutRouter.jsx";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword.jsx";
import ResetPassword from "./pages/resetPassword/ResetPassword.jsx";
import UserContext from "./components/UserContext.jsx";

//import useSid from "./components/useSid.jsx";
import { useCookies } from "react-cookie";

function App() {
  const [user_id, set_user_id] = useState("");
  const [user_email, set_user_email] = useState("");
  const [user_name, set_user_name] = useState("");
  const [user_type_id, set_user_type_id] = useState("");
  const [cart_count, set_cart_count] = useState(0);

  const userData = {
    user_id,
    set_user_id,
    user_email,
    set_user_email,
    user_name,
    set_user_name,
    user_type_id,
    set_user_type_id,
    cart_count,
    set_cart_count,
  };

  const [cookies, setCookies, removeCookies] = useCookies([
    "inventory_session_id",
  ]);

  // test if session has proper token
  if (document.cookie.indexOf("inventory_session_id=")) {
    return (
      <Router>
        <LoggedOutRouter setCookies={setCookies} />
      </Router>
    );
  }
  return (
    <UserContext.Provider value={userData}>
      <Router>
        <PageRouter />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
