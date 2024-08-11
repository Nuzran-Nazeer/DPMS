import React, { useState } from 'react';
import axios from 'axios'

const RegistrationForm = () => {
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    courtName: '',
    courtID: '',
    contactNumber: '',
    email: '',
    password: '',
    authorityName: '',
    registrationNumber: '',
    address: '',
    first_name: '',
    last_name: '',
    policeID: '',
    rank: '',
    station: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let roleSpecificData = {};
    if (role === 'Admin') {
      roleSpecificData = {
          first_name: formData.first_name,
          last_name: formData.last_name,
          policeID: formData.policeID,
          rank: formData.rank,
          contactNumber: formData.contactNumber,
          email: formData.email,
          password: formData.password,
      };
  } else if (role === 'PoliceOfficer') {
      roleSpecificData = {
          first_name: formData.first_name,
          last_name: formData.last_name,
          policeID: formData.policeID,
          rank: formData.rank,
          station: formData.station,
          contactNumber: formData.contactNumber,
          email: formData.email,
          password: formData.password,
      };
    } else if (role === 'DrugPreventionAuthority') {
      roleSpecificData = {
        authorityName: formData.authorityName,
        registrationNumber: formData.registrationNumber,
        address: formData.address,
        contactNumber: formData.contactNumber,
        email: formData.email,
        password: formData.password,
      };
    } else if (role === 'Court') {
      roleSpecificData = {
        courtName: formData.courtName,
        courtID: formData.courtID,
        contactNumber: formData.contactNumber,
        email: formData.email,
        password: formData.password,
      };
    } else if (role === 'RehabCentre') {
      roleSpecificData = {
        authorityName: formData.authorityName,
        registrationNumber: formData.registrationNumber,
        address: formData.address,
        contactNumber: formData.contactNumber,
        email: formData.email,
        password: formData.password,
      };
    } else {
      console.error('Role is not defined or invalid');
      return;
    }

    roleSpecificData.role = role;

    // Send formData to the backend based on role
    try {
      const response = await axios.post(`http://localhost:8003/auth/register`, roleSpecificData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setResponseMessage(response.data.message || 'Registration successful!');
    } catch (error) {
      console.log("Error during registration:", error.response?.data?.message || error.message);
      setResponseMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Register</h1>
      <select name="role" value={role} onChange={handleRoleChange} className="mb-4 p-2 border rounded">
        <option value="">Select Role</option>
        <option value="Admin">Admin</option>
        <option value="PoliceOfficer">Police Officer</option>
        <option value="DrugPreventionAuthority">Drug Prevention Authority</option>
        <option value="Court">Court</option>
        <option value="RehabCentre">Rehab Centre</option>
      </select>

      {role && (
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 border rounded">
           {role === 'Admin' && (
            <>
              <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" className="mb-4 p-2 border rounded w-full"/>
              <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" className="mb-4 p-2 border rounded w-full"/>
              <input type="text" name="policeID" value={formData.policeID} onChange={handleChange} placeholder="Police ID" className="mb-4 p-2 border rounded w-full"/>
              <input type="text" name="rank" value={formData.rank} onChange={handleChange} placeholder="Rank" className="mb-4 p-2 border rounded w-full"/>
            </>
          )}
           {role === 'PoliceOfficer' && (
            <>
              <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" className="mb-4 p-2 border rounded w-full"/>
              <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" className="mb-4 p-2 border rounded w-full"/>
              <input type="text" name="policeID" value={formData.policeID} onChange={handleChange} placeholder="Police ID" className="mb-4 p-2 border rounded w-full"/>
              <input type="text" name="rank" value={formData.rank} onChange={handleChange} placeholder="Rank" className="mb-4 p-2 border rounded w-full"/>
              <input type="text" name="station" value={formData.station} onChange={handleChange} placeholder="Station" className="mb-4 p-2 border rounded w-full"/>
            </>
          )}

          {role === 'DrugPreventionAuthority' && (
            <>
              <input type="text" name="authorityName" value={formData.authorityName} onChange={handleChange} placeholder="Authority Name" className="mb-4 p-2 border rounded w-full"/>
              <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} placeholder="Registration Number" className="mb-4 p-2 border rounded w-full"/>
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="mb-4 p-2 border rounded w-full"/>
            </>
          )}

          {role === 'Court' && (
            <>
              <input type="text" name="courtName" value={formData.courtName} onChange={handleChange} placeholder="Court Name" className="mb-4 p-2 border rounded w-full"/>
              <input type="text" name="courtID" value={formData.courtID} onChange={handleChange} placeholder="Court ID" className="mb-4 p-2 border rounded w-full"/>
            </>
          )}

         

          {role === 'RehabCentre' && (
            <>
              <input type="text" name="authorityName" value={formData.authorityName} onChange={handleChange} placeholder="Authority Name" className="mb-4 p-2 border rounded w-full"/>
              <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} placeholder="Registration Number" className="mb-4 p-2 border rounded w-full"/>
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="mb-4 p-2 border rounded w-full"/>
            </>
          )}

          <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Contact Number" className="mb-4 p-2 border rounded w-full"/>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="mb-4 p-2 border rounded w-full"/>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="mb-4 p-2 border rounded w-full"/>
          
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 w-full">
            Register
          </button>
        </form>
      )}
      {responseMessage && (
        <div className="mt-4 p-4 border rounded bg-green-100 text-green-800">
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
