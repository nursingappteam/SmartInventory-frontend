import { useState } from "react";

export default function useSid() {
  const getSid = () => {
    const tokenString = localStorage.getItem("sid");
    const userSid = JSON.parse(tokenString);
    return userSid;
  };

  const [sid, setSid] = useState(getSid());

  const saveSid = (userSid) => {
    localStorage.setItem("sid", JSON.stringify(userSid));
    setSid(userSid.sid);
  };

  return {
    setSid: saveSid,
    sid,
  };
}
