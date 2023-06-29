import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoutes = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return <>{isLoggedIn ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedRoutes;
