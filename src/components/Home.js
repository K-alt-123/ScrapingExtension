import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api';

function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="home">
      <h1>Welcome Home!</h1>
      <button onClick={handleLogout} className="button is-primary is-rounded">
        Log out
      </button>
    </div>
  );
}

export default Home;