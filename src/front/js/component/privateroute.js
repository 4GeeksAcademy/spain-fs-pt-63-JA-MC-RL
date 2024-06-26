// PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ path, element: Element, isLoggedIn, ...rest }) => {
    return (
        <Route
            {...rest}
            path={path}
            element={isLoggedIn ? <Element /> : <Navigate to="/login" replace />}
        />
    );
};

export default PrivateRoute;
