import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './views/main';
import Dashboard from './views/organizerDashboard';

import Register from './views/register';
import Login from './views/login';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>

      </Routes>
    </div>
  );
}

export default App;
