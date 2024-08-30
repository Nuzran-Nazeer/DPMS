import React, { useState, useEffect } from "react";
import axios from "axios";

const EditReport = ({ id, setIsOpen }) => {
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
    const token = localStorage.getItem("token");
    const fetchReportData = async () => {
      try {
        const response = await axios.get(`http://localhost:8003/report/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div className="justify-center items-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold my-2 text-center">Edit Report</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col border border-sky-400 rounded-lg p-2"
        >
          <label className="text-sm mr-2 text-gray-500">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <label className="text-sm mr-2 text-gray-500">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="mb-2 p-2 border rounded w-full"
            rows="4"
            required
          />
          <label className="text-sm mr-2 text-gray-500">Drug Type</label>
          <input
            type="text"
            name="drugType"
            value={formData.drugType}
            onChange={handleChange}
            placeholder="Drug Type"
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <label className="text-sm mr-2 text-gray-500">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <label className="text-sm mr-2 text-gray-500">
            Individuals Involved
          </label>
          <input
            type="text"
            name="individualsInvolved"
            value={formData.individualsInvolved}
            onChange={handleChange}
            placeholder="Individuals Involved"
            className="mb-2 p-2 border rounded w-full"
            rows="3"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-200 w-full "
          >
            Update Report
          </button>
        </form>
      </div>
      <button
        onClick={() => {
          setIsOpen(false);
        }}
        className="bg-sky-500 mt-2 text-white px-4 py-1 rounded-md"
      >
        Close
      </button>
    </div>
  );
};

export default EditReport;
