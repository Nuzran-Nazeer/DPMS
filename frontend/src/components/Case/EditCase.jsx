import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../NavBar";
import BackButton from "../BackButton";

const EditCase = ({ id, setIsOpen }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    age: "",
    profession: "",
    religion: "",
    district: "",
    officerHandling: "",
    drugType: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [officers, setOfficers] = useState([]); // State to hold list of officers

  useEffect(() => {
    const token = localStorage.getItem("token");

    const decodedToken = jwtDecode(token);
    setUserRole(decodedToken.role);

    const fetchCaseData = async () => {
      try {
        const response = await axios.get(`http://localhost:8003/case/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching case data:", error);
        setError("An error occurred while fetching the case data.");
      }
    };

    const fetchOfficers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8003/police-officer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response; // Destructure response to get the `data` property
        if (Array.isArray(data.data)) {
          setOfficers(data.data); // Set the officers array
        } else {
          console.error("Expected an array of officers, but got:", data.data);
          setError("Invalid data format received for officers.");
        }
      } catch (error) {
        console.error("Error fetching officers:", error);
        setError("An error occurred while fetching the officers.");
      }
    };

    fetchCaseData();
    fetchOfficers();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `http://localhost:8003/case/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Case updated successfully!");
    } catch (error) {
      console.error("Error updating case:", error);
      setError(
        error.response?.data?.message ||
          "An error occurred while updating the case."
      );
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div className="justify-center items-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold my-2 text-center">Edit Case</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col border border-sky-400 rounded-lg p-2 space-y-3"
        >
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="mb-3 p-2 border rounded-sm w-full text-sm"
            required
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="mb-3 p-2 border rounded-sm w-full text-sm"
            required
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="mb-3 p-2 border rounded-sm w-full text-sm"
            required
          />
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            placeholder="Profession"
            className="mb-3 p-2 border rounded-sm w-full text-sm"
            required
          />
          <input
            type="text"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            placeholder="Religion"
            className="mb-3 p-2 border rounded-sm w-full text-sm"
            required
          />
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="District"
            className="mb-3 p-2 border rounded-sm w-full text-sm"
            required
          />
          <input
            type="text"
            name="drugType"
            value={formData.drugType}
            onChange={handleChange}
            placeholder="Drug Type"
            className="mb-3 p-2 border rounded-sm w-full text-sm"
            required
          />
          {userRole === "Admin" && (
            <select
              name="officerHandling"
              value={formData.officerHandling}
              onChange={handleChange}
              className="mb-3 p-2 border rounded-sm w-full text-sm"
              required
            >
              <option value="">Select Officer</option>
              {officers.map((officer) => (
                <option key={officer._id} value={officer._id}>
                  {officer.first_name} {officer.last_name}
                </option>
              ))}
            </select>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-200 w-full "
          >
            Update Case
          </button>
        </form>
        {success && <p className="mt-3 text-green-600 text-sm">{success}</p>}
        {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}
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

export default EditCase;
