import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Tasks from './pages/tareas/Tasks';
import Documentation from './pages/documentation/Documentation';
import AppRouter from './router/Router';
import styled, { createGlobalStyle } from 'styled-components';
import { AppProvider } from './context/Context';
import { useAuth } from './context/Context';

const GlobalStyle = createGlobalStyle`


  html, body, #root {
    width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  body {
    background-color: #31322F;
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
  const { authToken, setAuthToken, setOrganization, checkUserStatus } = useAuth();


  return (
    <AppProvider>
      <Navbar />
      <GlobalStyle />
      <AppRouter />
    </AppProvider>
  );
}

export default App;