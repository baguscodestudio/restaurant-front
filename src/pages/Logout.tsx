import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ resetSession }: { resetSession: () => void }) => {
  useEffect(() => {
    resetSession();
  }, []);
  return null;
};

export default Logout;
