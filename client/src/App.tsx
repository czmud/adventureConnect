import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './views/Main';
import Dashboard from './views/Dashboard';
import Register from './views/Register';
import Login from './views/Login';
import CreateEvent from './views/CreateEvent';
import UpdateEvent from './views/UpdateEvent';
import EventPage from './views/EventPage';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/event/new" element={<CreateEvent />} />
				<Route path="/event/update/:id" element={<UpdateEvent />} />
				<Route path="/event/display/:id" element={<EventPage />} />
			</Routes>
		</div>
	);
}

export default App;
