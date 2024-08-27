import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../NavBar";
import BackButton from "../BackButton";

const EditCase = () => {
  const { id } = useParams();
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
    if (!token) {
      navigate("/login"); // Redirect if no token found
      return;
    }

    const decodedToken = jwtDecode(token);
    setUserRole(decodedToken.role);

    if (decodedToken.role !== "Admin" && decodedToken.role !== "PoliceOfficer") {
      navigate("/unauthorized"); // Redirect if not Admin or Police Officer
      return;
    }

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
        const response = await axios.get("http://localhost:8003/police-officer", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="rounded-xl p-4">
        <BackButton />
        <h1 className="text-4xl font-bold mb-4 text-center">Edit Case</h1>
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
            name="drugType"
            value={formData.drugType}
            onChange={handleChange}
            placeholder="Drug Type"
            className="mb-4 p-2 border rounded w-full"
            required
          />
          {userRole === "Admin" && (
            <select
              name="officerHandling"
              value={formData.officerHandling}
              onChange={handleChange}
              className="mb-4 p-2 border rounded w-full"
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
