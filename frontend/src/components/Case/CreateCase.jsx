import React, { useState } from 'react';
import axios from 'axios';

const CreateCase = () => {
  const [formData, setFormData] = useState({
    caseNo: '',
    title: '',
    description: '',
    age: '',
    profession: '',
    religion: '',
    district: '',
    officerHandling: '',
    drugType: '',
  });
  
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    try {
      const response = await axios.post('http://localhost:8003/case/create-case', formData);
      console.log(response.data);
      setFormData({
        caseNo: '',
        title: '',
        description: '',
        age: '',
        profession: '',
        religion: '',
        district: '',
        officerHandling: '',
        drugType: '',
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('Case number already exists.');
      } else if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      } else {
        console.error('Error creating case:', error);
        setError('An error occurred while creating the case.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border-2 border-sky-400 rounded-xl p-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Create New Case</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 border rounded">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <input
            type="text"
            name="caseNo"
            value={formData.caseNo}
            onChange={handleChange}
            placeholder="Case No"
            className="mb-4 p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="mb-4 p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="mb-4 p-2 border rounded w-full"
            required
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="mb-4 p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            placeholder="Profession"
            className="mb-4 p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            placeholder="Religion"
            className="mb-4 p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="District"
            className="mb-4 p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            name="officerHandling"
            value={formData.officerHandling}
            onChange={handleChange}
            placeholder="Officer Handling"
            className="mb-4 p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            name="drugType"
            value={formData.drugType}
            onChange={handleChange}
            placeholder="Drug Type"
            className="mb-4 p-2 border rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 w-full"
          >
            Create Case
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default CreateCase;
