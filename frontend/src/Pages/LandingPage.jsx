import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt } from 'react-icons/fa';
import Footer from '../components/Footer'; // Update the path according to your file structure
import logo from '../assets/DPMS.png'; // Update the path according to your file structure

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#e0e0e0] px-4"> {/* Updated background color */}
      <img src={logo} alt="DPMS Logo" className="w-32 h-32 mb-6" />
      <h1 className="text-5xl font-bold mb-4 text-center text-gray-800">Drug Prevention & Management System (DPMS)</h1> {/* Adjusted text color */}
      <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
        Welcome to the Drug Prevention & Management System (DPMS). Our mission is to streamline the management of drug-related cases, enabling 
        efficient tracking, reporting, and collaboration between relevant authorities. DPMS plays a crucial role in combating drug-related issues by providing a comprehensive platform for case management and information sharing.
      </p>
      <div className="flex justify-center space-x-4 mb-8">
        <Link to="/register">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
            Register
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200">
            Login
          </button>
        </Link>
      </div>
      <div className="flex justify-center items-center space-x-2 text-gray-600 mb-8">
        <FaFileAlt className="text-2xl" />
        <Link to="/report/create" className="text-lg underline hover:text-gray-800 transition duration-200">
          File an Anonymous Report
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
