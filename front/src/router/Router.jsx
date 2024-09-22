import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import Attendance from '../pages/attendance/Attendance';
import Documentation from '../pages/documentation/Documentation';
import Passwords from '../pages/passwords/Passwords';
import Teams from '../pages/teams/Teams';
import PrivateRoute from './PrivateRoute';
import Tasks from '../pages/tareas/Tasks';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';

const AppRouter = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Home />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                
                {/* Rutas privadas */}
                <Route 
                    path="/tasks" 
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Tasks />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/attendance" 
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Attendance />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/teams" 
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Teams />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/documentation" 
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Documentation />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/passwords" 
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Passwords />
                        </PrivateRoute>
                    } 
                />
            </Routes>
        </Router>
    );
};

export default AppRouter;
