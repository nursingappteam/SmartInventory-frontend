import { useState } from "react";

export default function useAccessToken() {
  const getAccessToken = () => {
    const tokenString = sessionStorage.getItem("accessToken");
    const userAccessToken = JSON.parse(tokenString);
    return userAccessToken?.accessToken;
  };

  const [accessToken, setAccessToken] = useState(getAccessToken());

  const saveAccessToken = (userAccessToken) => {
    sessionStorage.setItem("accessToken", JSON.stringify(userAccessToken));
    setAccessToken(userAccessToken.accessToken);
  };

  return {
    setAccessToken: saveAccessToken,
    accessToken,
  };
}
