import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditReport = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    drugType: "",
    location: "",
    evidence: "",
    individualsInvolved: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get(`http://localhost:8003/report/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching report data:", error);
        setError("An error occurred while fetching the case data.");
      }
    };

    fetchReportData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess("Report Updated successfully!");
    try {
      const response = await axios.put(
        `http://localhost:8003/report/${id}`,
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error updating report:", error);
      setError(
        error.response?.data?.message ||
          "An error occurred while updating the report."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border-2 border-sky-400 rounded-xl p-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Edit Report</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 border rounded"
        >
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
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="mb-4 p-2 border rounded w-full"
            required
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
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 w-full"
          >
            Update Report
          </button>
        </form>
        {success && <p className="mt-4 text-green-600">{success}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default EditReport;
