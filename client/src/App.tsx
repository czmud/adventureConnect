import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './views/main';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}/>
      </Routes>
    </div>
  );
}

export default App;
