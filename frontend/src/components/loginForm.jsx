import React, { useState } from 'react'; /* Import necessary hooks from React */
import axios from 'axios'; /* Import axios for HTTP requests */
import { useNavigate } from 'react-router-dom'; /* Import useNavigate for navigation */
import { jwtDecode } from 'jwt-decode'; /* Import jwtDecode for decoding JWT tokens */
import config from "../config";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '', /* State for storing email input */
    password: '', /* State for storing password input */
  });
  const [error, setError] = useState(null); /* State for storing error messages */
  const [success, setSuccess] = useState(null); /* State for storing error messages */
  const navigate = useNavigate(); /* Hook to programmatically navigate to different routes */

  /* Function to handle changes in input fields */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); /* Update form data state based on input field changes */
  };

  /* Function to handle form submission */
  const handleSubmit = async (e) => {
    e.preventDefault(); /* Prevent default form submission behavior */
    try {
      const response = await axios.post(`${config.API_URL}/auth/login`, formData); /* Send login request to server */

      /* Store the token in localStorage */
      const { token } = response.data;
      localStorage.setItem('token', token); /* Save JWT token in local storage */

      /* Decode the token to get user role */
      const decodedToken = jwtDecode(token); /* Decode the JWT to extract user information */
      const userRole = decodedToken.role; /* Extract user role from decoded token */

      /* Redirect based on the user role */
      switch (userRole) {
        case 'PoliceOfficer':
          navigate('/police'); /* Redirect Police Officer to their dashboard */
          break;
        case 'DrugPreventionAuthority':
          navigate('/dpa'); /* Redirect Drug Prevention Authority to their dashboard */
          break;
        case 'Court':
          navigate('/court'); /* Redirect Court to their dashboard */
          break;
        case 'RehabCentre':
          navigate('/rehabcentre'); /* Redirect Rehabilitation Centre to their dashboard */
          break;
        case 'Admin':
          setTimeout(() => {
          navigate('/admin');
        }, 1000); /* Redirect Admin to their dashboard */  
        
          break;
        default:
          navigate('/login'); /* Redirect to login page for any unrecognized role */ 
          break;
          
        }
        setSuccess('Login Successful'); /* Set error message for invalid credentials */
    } catch (error) {
      setError('Invalid email or password'); /* Set error message for invalid credentials */
      console.error('Error logging in:', error); /* Log the error for debugging purposes */ 
    }
  };

  /* Render the login form */
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Login</h1> {/* Display the login title */}
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
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message if any */}
        {success && <p className="text-green-500 mb-4">{success}</p>} {/* Display success message */}
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
