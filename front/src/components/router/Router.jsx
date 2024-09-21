import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../home/Home';
import Attendance from '../attendance/Attendance';
import Documentation from '../documentation/Documentation';
import Passwords from '../passwords/Passwords';
import Teams from '../teams/Teams';
import Tasks from '../tareas/Tasks';



const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/documentation" element={<Documentation />} />
                <Route path="/passwords" element={<Passwords />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;