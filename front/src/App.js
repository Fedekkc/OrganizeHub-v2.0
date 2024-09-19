import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Tasks from './components/tareas/tasks';
import Documentation from './components/documentation/Documentation';



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/tasks" element={ <Tasks/> } />
        <Route path="/attendance" element={<h1>Attendance</h1>} />
        <Route path="/documentation" element={<Documentation/>} />
        <Route path="/teams" element={<h1>Teams</h1>} />
        <Route path="/passwords" element={<h1>Passwords</h1>} />
        <Route path="/logout" element={<h1>Logout</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;