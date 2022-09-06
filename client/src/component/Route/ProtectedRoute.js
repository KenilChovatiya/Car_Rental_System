import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAlert } from "react-alert";

const ProtectedRoute = ({ children }) => {
    const alert = useAlert();

    const { loading, isAuthenticated } = useSelector((state) => state.user);

    if (loading) return null;

    !isAuthenticated && alert.error("You have not loggedin!, Please Login..");  

    return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;