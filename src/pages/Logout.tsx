import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ resetSession }: { resetSession: () => void }) => {
  let navigate = useNavigate();
  useEffect(() => {
    resetSession();
    navigate("/");
  }, []);
  return null;
};

export default Logout;
