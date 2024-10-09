import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const AppContext = createContext();

// Proveedor del contexto
export const AppProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [organization, setOrganization] = useState(false); // Estado para la organización
    const [events, setEvents] = useState([]); // Estado para los eventos

    // Verificar si el usuario ya está autenticado al cargar la aplicación
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthToken(token);
            setIsAuthenticated(true);
            const organization = localStorage.getItem('organization');
            if (organization) {
                setOrganization(organization);
            }
            else {
                setOrganization(null);
            }
        }
        else {
            setIsAuthenticated(false);
        }

        

    }, []);



    // Función para iniciar sesión
    const login = (user) => {
        localStorage.setItem('authToken', user.token);
        setAuthToken(user.token);
        setIsAuthenticated(true);
        if (user.organization) {
            setOrganization(user.organization);
            localStorage.setItem('organization', user.organization);
        }
        
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setIsAuthenticated(false);
    };

    const isInOrg = () => !!organization;

    // Función para verificar si el usuario está autenticado
    const isLoggedIn = () => !!authToken;


    // Función para agregar un evento
    const addEvent = (newEvent) => {
        setEvents((prevEvents) => [...prevEvents, newEvent]);
    };

    // Función para actualizar un evento
    const updateEvent = (updatedEvent) => {
        setEvents((prevEvents) => 
            prevEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event)
        );
    };

    // Función para eliminar un evento
    const deleteEvent = (eventId) => {
        setEvents((prevEvents) => prevEvents.filter(event => event.id !== eventId));
    };

    return (
        <AppContext.Provider value={{
            authToken, 
            isAuthenticated, 
            login, 
            logout, 
            isLoggedIn,
            events, // Comparte los eventos
            addEvent, // Comparte la función para agregar eventos
            updateEvent, // Comparte la función para actualizar eventos
            deleteEvent // Comparte la función para eliminar eventos
        }}>
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
