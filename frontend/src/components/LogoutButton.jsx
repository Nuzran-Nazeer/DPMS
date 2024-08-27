import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition">
      <FaSignOutAlt />
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
