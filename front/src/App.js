import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Tasks from './pages/tareas/Tasks';
import Documentation from './pages/documentation/Documentation';
import AppRouter from './router/Router';
import styled, { createGlobalStyle } from 'styled-components';
import { AppProvider } from './context/Context';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #31322F;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #31322F;
`;

function App() {
 window.onload = () => {
    localStorage.removeItem('authToken');
 }
        

  return (
    <AppProvider>
      <Navbar />
      <GlobalStyle />
      <AppRouter />
    </AppProvider>
  );
}

export default App;