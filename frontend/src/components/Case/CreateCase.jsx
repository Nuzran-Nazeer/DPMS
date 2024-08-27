import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const CreateCase = () => {
  const [formData, setFormData] = useState({
    caseNo: "",
    title: "",
    description: "",
    age: "",
    profession: "",
    religion: "",
    district: "",
    officerHandling: "", // Make sure this is initialized
    drugType: "",
  });

  const [officers, setOfficers] = useState([]);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken); // Debugging: Log the decoded token

    if (decodedToken.role === "Admin") {
      setIsAdmin(true);

      axios
        .get("http://localhost:8003/police-officer", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Fetched Officers:", response.data.data); // Debugging: Log the officers data
          setOfficers(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching officers:", error);
          setError("An error occurred while fetching officers.");
        });
    } else if (decodedToken.role === "PoliceOfficer") {
      setFormData((prevData) => ({
        ...prevData,
        officerHandling: decodedToken.id, // Automatically set for Police Officers
      }));
    } else {
      navigate("/unauthorized");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      console.log("Form Data:", formData); // Debugging: Log the formData

      const submissionData = {
        ...formData,
      };

      const response = await axios.post(
        "http://localhost:8003/case/create-case",
        submissionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response.data); // Debugging: Log the response data
      setFormData({
        caseNo: "",
        title: "",
        description: "",
        age: "",
        profession: "",
        religion: "",
        district: "",
        officerHandling: "", // Reset after submission
        drugType: "",
      });
    } catch (error) {
      console.error("Error during case creation:", error); // Debugging: Log any errors
      if (error.response && error.response.status === 409) {
        setError("Case number already exists.");
      } else if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while creating the case.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="rounded-xl p-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Create New Case</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 border rounded"
        >
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
          {isAdmin && (
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
