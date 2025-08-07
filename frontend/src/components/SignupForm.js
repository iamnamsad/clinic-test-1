import React, { useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const SignupForm = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (email && password) {
      onSignup(email, password);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 mt-5">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center mb-0">Clinic Portal</h2>
            </div>
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <i className="bi bi-hospital fs-1 text-primary"></i>
                <h3 className="mt-3">Create Account</h3>
                <p className="text-muted">Sign up to access clinic features</p>
              </div>

              {error && <div className="alert alert-error mb-4">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="name@clinic.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength="8"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength="8"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 mb-3"
                  disabled={!email || !password || !confirmPassword}
                >
                  <i className="bi bi-person-plus me-2"></i>
                  Sign Up
                </button>

                <div className="text-center text-muted my-3">
                  <hr className="w-100" />
                  <span className="px-2 bg-white position-relative">
                    Already have an account?
                  </span>
                </div>

                <a href="/login" className="btn btn-outline-primary w-100">
                  Sign In
                </a>
              </form>
            </div>
            <div className="card-footer text-center text-muted small">
<p className="mb-0">©ClinicApp</p>            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;