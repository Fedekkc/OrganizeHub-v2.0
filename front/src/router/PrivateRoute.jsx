import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated, isInOrg }) => {
    const location = useLocation();

    if (isAuthenticated) {
        if (isInOrg || location.pathname === "/organization" || location.pathname === "/organization/create") {
            return children;
        } else {
            return <Navigate to="/organization" />;
        }
    }
    return <Navigate to="/login" />;
}

export default PrivateRoute;