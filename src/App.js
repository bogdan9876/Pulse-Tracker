import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Header from './components/Header/header';
import Home from './components/Home/home';
import ProtectedRoute from './utils/ProtectedRoute';
import Login from './components/Login/login';
import Register from './components/Register/register';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/register' && <Header />}
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<Login />} path="/login" exact />
        <Route element={<Register />} path="/register" />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;