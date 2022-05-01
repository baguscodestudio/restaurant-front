import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

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

  if (loading) {
    return <div className="m-auto text-2xl font-bold">Loading ....</div>;
  } else {
    return access ? <Outlet /> : <Navigate to="/" />;
  }
};

export default ProtectedRoutes;
