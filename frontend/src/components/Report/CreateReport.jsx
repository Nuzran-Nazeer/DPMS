import React, { useState } from 'react';
import axios from 'axios';

const CreateReport = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    drugType: '',
    incidentDate: '',
    location: '',
    evidence: '',
    individualsInvolved: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('http://localhost:8003/report/create-report', formData);
      setSuccess('Report submitted successfully!');
      setFormData({
        title: '',
        description: '',
        drugType: '',
        incidentDate: '',
        location: '',
        evidence: '',
        individualsInvolved: '',
      });
    } catch (err) {
      setError('Failed to submit report: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border-2 border-sky-400 rounded-xl p-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Submit a Report</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 border rounded">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="mb-4 p-2 border rounded w-full"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="mb-4 p-2 border rounded w-full"
            rows="4"
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
          <input
            type="date"
            name="incidentDate"
            value={formData.incidentDate}
            onChange={handleChange}
            className="mb-4 p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="mb-4 p-2 border rounded w-full"
            required
          />
          <input
            type="file"
            name="evidence"
            onChange={handleChange}
            className="mb-4 p-2 border rounded w-full"
          />
          <textarea
            name="individualsInvolved"
            value={formData.individualsInvolved}
            onChange={handleChange}
            placeholder="Individuals Involved"
            className="mb-4 p-2 border rounded w-full"
            rows="3"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 w-full"
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateReport;
