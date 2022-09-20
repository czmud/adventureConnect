import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './views/Main';
import Dashboard from './views/Dashboard';

import Register from './views/Register';
import Login from './views/Login';


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
