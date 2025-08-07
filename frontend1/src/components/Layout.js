 
import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Layout = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div className="layout">
      <nav className="navbar">
        <Link to="/">Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/doctors">Doctors</Link>
            <Link to="/appointments">Appointments</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;