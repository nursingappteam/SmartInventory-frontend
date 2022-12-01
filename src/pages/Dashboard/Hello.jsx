import * as React from "react";
import moment from "moment";

var date = moment().format("MMM DD,YYYY");
const API_KEY = import.meta.env.VITE_API_KEY;

export default function Chart() {
  return (
    <React.Fragment>
      <h1 style={{ fontFamily: "verdana" }}>Welcome Jacquelyn!</h1>
      <p> </p>
      <p> </p>
      <p> </p>
      <p style={{ fontFamily: "verdana", fontSize: 35 }}> {date}</p>
    </React.Fragment>
  );
}
