import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [organization, setOrganization] = useState(null);
    const [events, setEvents] = useState([]);
    const [userId, setUserId] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [organizationId, setOrganizationId] = useState(null);

    const checkUserStatus = async () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthToken(token);
            try {
                const response = await axios.post('http://localhost:5000/users/validate-token', {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.status === 200 || response.status === 201) {
                    setIsAuthenticated(true);
                    setUserId(response.data.user.userId);
                    setAvatar(response.data.user.avatar);
                    setUserEmail(response.data.user.email);

                    if (response.data.user.organization !== null) {
                        setOrganization(response.data.user.organization);
                        localStorage.setItem('organization', response.data.user.organization.organizationId);
                        setOrganizationId(response.data.user.organization.organizationId);
                        setIsAdmin(response.data.user.role === 'admin');
                    }
                }
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setOrganization(null);
                setAuthToken(null);
                setUserId(null);
                localStorage.removeItem('authToken');
            }
        } else {
            setIsAuthenticated(false);
        }
        setLoading(false);  
    };


    const login = (user) => {
        localStorage.setItem('authToken', user.token);
        setAuthToken(user.token);
        setIsAuthenticated(true);
        setUserEmail(user.email);
        setUserId(user.userId);
        setAvatar(user.avatar);
        if (user.role === 'admin') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
        if (user.organization) {
            setOrganization(user.organization);
            localStorage.setItem('organization', user.organization.organizationId);
            setOrganizationId(user.organization.organizationId);
        }
    };

    const addEvent = (event) => {
        setEvents((prevEvents) => [...prevEvents, event]);
    };

    const updateEvent = (event) => {
        setEvents((prevEvents) => {
            const index = prevEvents.findIndex((e) => e.id === event.id);
            if (index === -1) return prevEvents;
            const newEvents = [...prevEvents];
            newEvents[index] = event;
            return newEvents;
        });
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setIsAuthenticated(false);
        setOrganization(null);
        setAvatar(null);
        axios.post('http://localhost:5000/users/logout', {}, {
            headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });

        localStorage.removeItem('organization');
    };

    const isInOrg = () => !!organization;

    const isLoggedIn = () => !!authToken;

    return (
        <AppContext.Provider value={{
            authToken,
            organization,
            organizationId,
            setOrganizationId,
            addEvent,
            updateEvent,
            isAdmin,
            avatar,
            setAuthToken,
            userId,
            userEmail,
            setOrganization,
            setIsAdmin,
            setIsAuthenticated,
            isAuthenticated,
            checkUserStatus,
            login,
            loading,
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
