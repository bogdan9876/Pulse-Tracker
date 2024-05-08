import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home/home';
import ProtectedRoute from './utils/ProtectedRoute';
import Login from './components/Login/login';
import Register from './components/Register/register';
import CustomScrollbar from './components/CustomScrollbar/CustomScrollbar.js';

function App() {
  return (
    <Router>
    <CustomScrollbar>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </CustomScrollbar>
    </Router>
  );
}

export default App;
