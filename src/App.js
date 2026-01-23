// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import GlobalStyles from './styles/GlobalStyles';
import HomePage from './pages/HomePage';

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<div style={{padding: '100px 20px', textAlign: 'center'}}><h1>Admin Dashboard</h1><p>Coming soon...</p></div>} />
          <Route path="/impressum" element={<div style={{padding: '100px 20px'}}><h1>Impressum</h1></div>} />
          <Route path="/datenschutz" element={<div style={{padding: '100px 20px'}}><h1>Datenschutz</h1></div>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
