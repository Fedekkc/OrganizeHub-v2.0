import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const AppContext = createContext();

// Proveedor del contexto
export const AppProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Verificar si el usuario ya está autenticado al cargar la aplicación
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthToken(token);
            setIsAuthenticated(true);
        }
    }, []);

    // Función para iniciar sesión
    const login = (token) => {
        localStorage.setItem('authToken', token);
        setAuthToken(token);
        setIsAuthenticated(true);
    };



    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setIsAuthenticated(false);
    };

    // Función para verificar si el usuario está autenticado
    const isLoggedIn = () => !!authToken;

    return (
        <AppContext.Provider value={{ authToken, isAuthenticated, login, logout, isLoggedIn }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook para usar el contexto
export const useAuth = () => {
    const context = React.useContext(AppContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AppProvider');
    }
    return context;
};
