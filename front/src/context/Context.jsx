import React, { createContext, useState } from 'react';

// Create a Context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
    const [state, setState] = useState({
        // Add your state properties here
        user: null,
        isAuthenticated: false,
    });

    const login = (user) => {
        setState({ ...state, user, isAuthenticated: true });
    };

    const logout = () => {
        setState({ ...state, user: null, isAuthenticated: false });
    };

    return (
        <AppContext.Provider value={{ state, login, logout }}>
            {children}
        </AppContext.Provider>
    );
};