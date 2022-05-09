import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import User from "./typings/User";

const ProtectedRoutes = ({
  useAuth,
  loading,
  access,
}: {
  useAuth: () => void;
  access: boolean;
  loading: boolean;
}) => {
  useEffect(() => {
    useAuth();
  }, []);
  // const location = useLocation();

  if (loading) {
    return <div className="m-auto text-2xl font-bold">Loading ....</div>;
  } else {
    return access ? <Outlet /> : <Navigate to="/" />;
  }
};

export default ProtectedRoutes;
