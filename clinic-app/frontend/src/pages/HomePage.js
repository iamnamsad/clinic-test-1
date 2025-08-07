 
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="home-page">
      <h1>Welcome to the Clinic App</h1>
      {isAuthenticated ? (
        <div>
          <p>You can now view doctors and book appointments.</p>
          <Link to="/doctors">View Doctors</Link>
        </div>
      ) : (
        <div>
          <p>Please login to access the clinic features.</p>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;