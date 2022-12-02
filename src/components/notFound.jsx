import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function notFound() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);

  return <div>notFound</div>;
}
