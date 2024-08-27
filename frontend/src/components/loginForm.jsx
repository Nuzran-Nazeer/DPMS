import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8003/auth/login', formData);

      // Store the token in localStorage
      const { token } = response.data;
      localStorage.setItem('token', token);

      // Decode the token to get user role
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;

      // Redirect based on the user role
      switch (userRole) {
        case 'PoliceOfficer':
          navigate('/police');
          break;
        case 'DrugPreventionAuthority':
          navigate('/dpa');
          break;
        case 'Court':
          navigate('/court');
          break;
        case 'RehabCentre':
          navigate('/rehabcentre');
          break;
        case 'Admin':
          navigate('/admin');
          break;
        default:
          navigate('/login');
          break;
      }
    } catch (error) {
      setError('Invalid email or password');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 border rounded">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="mb-4 p-2 border rounded w-full"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="mb-4 p-2 border rounded w-full"
          required
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
