import * as React from "react";
import Title from "../../components/Title";
import moment from "moment";

var date = moment().format("MMM DD,YYYY");

export default function Chart() {
  return (
    <React.Fragment>
      <Title>Welcome Jacquelyn!</Title>
      <p> {date}</p>
    </React.Fragment>
  );
}