 
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DoctorsPage from './pages/DoctorsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="doctors" element={
          <PrivateRoute>
            <DoctorsPage />
          </PrivateRoute>
        } />
        <Route path="appointments" element={
          <PrivateRoute>
            <AppointmentsPage />
          </PrivateRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;