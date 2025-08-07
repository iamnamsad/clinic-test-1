import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Layout = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold">ClinicApp</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav ms-auto">
              <Link to="/" className="nav-link">Home</Link>
              {isAuthenticated ? (
                <>
                  <Link to="/doctors" className="nav-link">Doctors</Link>
                  <Link to="/appointments" className="nav-link">Appointments</Link>
                  <button onClick={logout} className="btn btn-outline-danger ms-2">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-primary ms-2">Login</Link>
                  <Link to="/signup" className="btn btn-outline-primary ms-2">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main className="container flex-grow-1 py-4">
        <Outlet />
      </main>
      
      <footer className="bg-dark text-white py-4 mt-4">
        <div className="container text-center">
          <p className="mb-0">©ClinicApp</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;