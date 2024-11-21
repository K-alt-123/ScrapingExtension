import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setErrors(['Passwords do not match']);
      return;
    }
    try {
      const response = await signup(email, password, passwordConfirmation);
      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setErrors(data.errors || ['Signup failed']);
      }
    } catch (error) {
      console.error('Error signing up:', error);
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
                  <h2 className="title has-text-centered has-text-primary">Sign Up</h2>
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
                          autoComplete="new-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-lock"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Confirm Password</label>
                      <div className="control has-icons-left">
                        <input
                          className="input is-fullwidth is-rounded"
                          type="password"
                          placeholder="Confirm Password"
                          autoComplete="new-password"
                          value={passwordConfirmation}
                          onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                        <span className="icon is-small is-left">
                          <i className="fas fa-lock"></i>
                        </span>
                      </div>
                    </div>
                    <div className="actions">
                      <button type="submit" className="button is-primary is-fullwidth is-rounded">Sign up</button>
                    </div>
                  </form>
                  <div className="links has-text-centered mt-4">
                    <Link to="/login">Already have an account? Log In</Link>
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

export default Signup;