import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [organization, setOrganization] = useState(null);
    const [events, setEvents] = useState([]);
    const [userId, setUserId] = useState(null);

    const checkUserStatus = async () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthToken(token);
            try {
                const response = await axios.post('http://localhost:5000/users/validate-token', {}, {
                    headers: { Authorization: `Bearer ${token}` },
                }).catch((err) => {
                    console.log(err);
                });
                if (response.status === 201) {
                    setIsAuthenticated(true);
                    setUserId(response.data.user.userId);
                    if(response.data.user.organization !== null) {
                        setOrganization(true);
                        console.log(response.data.user.organization);
                        localStorage.setItem('organization', response.data.user.organization.organizationId);
                    }

                }

                
            } catch (error) {
                setIsAuthenticated(false);
                setOrganization(null);
                setAuthToken(null);
                setUserId(null);
                localStorage.removeItem('authToken');
            }
        } else {
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkUserStatus();
    }, []);

    const login = (user) => {
        localStorage.setItem('authToken', user.token);
        setAuthToken(user.token);
        setIsAuthenticated(true);
        if (user.organization) {
            setOrganization(user.organization);
            localStorage.setItem('organization', user.organization);
        }
    };

    const addEvent = (event) => {
        setEvents((prevEvents) => [...prevEvents, event]);
    }
    const updateEvent = (event) => {
        setEvents((prevEvents) => {
            const index = prevEvents.findIndex((e) => e.id === event.id);
            if (index === -1) return prevEvents;
            const newEvents = [...prevEvents];
            newEvents[index] = event;
            return newEvents;
        });
    }

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setIsAuthenticated(false);
        setOrganization(null);
    };

    const isInOrg = () => !!organization;

    const isLoggedIn = () => !!authToken;


    return (
        <AppContext.Provider value={{
            authToken, 
            organization,
            addEvent,
            updateEvent,
            setAuthToken,
            userId,
            setOrganization,
            setIsAuthenticated,
            isAuthenticated, 
            checkUserStatus,
            login, 
            logout, 
            isLoggedIn,
            isInOrg,
            events, 
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
