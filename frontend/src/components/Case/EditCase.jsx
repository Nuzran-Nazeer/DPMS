import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditCase = () => {
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
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
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchCaseData = async () => {
      try {
        const response = await axios.get(`http://localhost:8003/case/${id}`);
        setFormData(response.data); 
      } catch (error) {
        console.error('Error fetching case data:', error);
        setError('An error occurred while fetching the case data.');
      }
    };

    fetchCaseData();
  }, [id]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess('Case Updated successfully!');
    try {
      const response = await axios.put(`http://localhost:8003/case/${id}`, formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error updating case:', error);
      setError(error.response?.data?.message || 'An error occurred while updating the case.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border-2 border-sky-400 rounded-xl p-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Edit Case</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 border rounded">
         
          
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
            Update Case
          </button>
        </form>
        {success && <p className="mt-4 text-green-600">{success}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default EditCase;
