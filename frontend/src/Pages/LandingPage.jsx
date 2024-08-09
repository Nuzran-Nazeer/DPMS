import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-5xl font-bold mb-4 text-center">Drug Prevention & Management System (DPMS)</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
        Welcome to the Drug Prevention & Management System (DPMS). Our mission is to streamline the management of drug-related cases, enabling 
        efficient tracking, reporting, and collaboration between relevant authorities. DPMS plays a crucial role in combating drug-related issues by providing a comprehensive platform for case management and information sharing.
      </p>
      <div>
        <Link to="/register">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-4 hover:bg-blue-700 transition duration-200">
            Register
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
