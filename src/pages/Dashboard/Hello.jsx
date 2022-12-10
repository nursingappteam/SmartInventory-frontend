import * as React from "react";
import moment from "moment";
import UserContext from "../../components/UserContext";
import { useContext } from "react";

var date = moment().format("MMM DD,YYYY");
const API_KEY = import.meta.env.VITE_API_KEY;

export default function Chart() {
  const { user_name } = useContext(UserContext);
  return (
    <React.Fragment>
      <h1 style={{ fontFamily: "verdana" }}>Welcome {user_name}!</h1>
      <p> </p>
      <p> </p>
      <p> </p>
      <p style={{ fontFamily: "verdana", fontSize: 35 }}> {date}</p>
    </React.Fragment>
  );
}
