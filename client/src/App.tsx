import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './views/main';
import Dashboard from './views/organizerDashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </div>
  );
}

export default App;
