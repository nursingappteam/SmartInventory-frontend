import React, { createContext, useState } from "react";

// default to blank
const UserContext = createContext({
  user_id: "",
  set_user_id: () => {},
  user_email: "",
  set_user_email: () => {},
  user_name: "",
  set_user_name: () => {},
  user_type_id: "",
  set_user_type_id: () => {},
  cart_count: 0,
  set_cart_count: () => {},
});

export default UserContext;
