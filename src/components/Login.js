import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally, validate the token with a backend call
      // If valid, redirect to home
      navigate('/home');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        setErrors(data.errors || ['Login failed']);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrors(['An error occurred. Please try again.']);
    }
  };

  return (
    <div className="auth-background">
      <div className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-one-third">
              <div className="card">
                <div className="card-content">
                  <h2 className="title has-text-centered has-text-primary">Log In</h2>
                  {errors.length > 0 && (
                    <div className="notification is-danger mt-4">
                      <ul>
                        {errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="field">
                      <label className="label">Email</label>
                      <div className="control has-icons-left">
                        <input
                          className="input is-fullwidth is-rounded"
                          type="email"
                          placeholder="Email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-envelope"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Password</label>
                      <div className="control has-icons-left">
                        <input
                          className="input is-fullwidth is-rounded"
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-lock"></i>
                        </span>
                      </div>
                    </div>
                    <div className="actions">
                      <button type="submit" className="button is-primary is-fullwidth is-rounded">Log in</button>
                    </div>
                  </form>
                  <div className="links has-text-centered mt-4">
                    <Link to="/signup">Don't have an account? Sign Up</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;