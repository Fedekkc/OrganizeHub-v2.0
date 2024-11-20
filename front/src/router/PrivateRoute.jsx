import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/Context';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { isAuthenticated, isInOrg } = useAuth(); // Obtén los valores del contexto
    const { checkUserStatus } = useAuth();
    useEffect(() => {
        checkUserStatus();
        console.log('PrivateRoute');
    }, []);

    if (isAuthenticated) {
        if (isInOrg() || location.pathname === "/organization" || location.pathname === "/organization/create" || location.pathname.startsWith("/invitation/url/")) {
            return children; // Permite el acceso a la ruta
        } else {
            return <Navigate to="/organization" />; // Redirige a la página de organización
        }
    }
    return <Navigate to="/login" />; // Redirige al login si no está autenticado
}

export default PrivateRoute;
