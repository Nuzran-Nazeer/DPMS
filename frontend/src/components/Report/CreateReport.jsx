import React, { useState } from "react";
import axios from "axios";

const CreateReport = ({ setIsOpen }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    drugType: "",
    incidentDate: "",
    location: "",
    evidence: "",
    individualsInvolved: "",
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
      const response = await axios.post(
        "http://localhost:8003/report/create-report",
        formData
      );
      setSuccess("Report submitted successfully!");
      setFormData({
        title: "",
        description: "",
        drugType: "",
        incidentDate: "",
        location: "",
        evidence: "",
        individualsInvolved: "",
      });
    } catch (err) {
      setError("Failed to submit report: " + err.message);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="justify-center items-center px-4">
      <div className=" w-full max-w-md">
        <h1 className="text-3xl font-bold my-2 text-center">Submit a Report</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col border border-sky-400 rounded-lg p-2"
        >
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500 mb-2">{success}</p>}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="mb-2 p-2 border rounded w-full"
            rows="4"
            required
          />
          <input
            type="text"
            name="drugType"
            value={formData.drugType}
            onChange={handleChange}
            placeholder="Drug Type"
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <input
            type="date"
            name="incidentDate"
            value={formData.incidentDate}
            onChange={handleChange}
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="mb-2 p-2 border rounded w-full"
            required
          />
          <input
            type="text"
            name="evidence"
            onChange={handleChange}
            className="mb-2 p-2 border rounded w-full"
            placeholder="Evidence"
          />
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
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 w-full"
          >
            {loading ? "Submitting..." : "Submit Report"}
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

export default CreateReport;
