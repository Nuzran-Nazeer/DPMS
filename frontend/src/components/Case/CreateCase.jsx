import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const CreateCase = ({ setIsOpen }) => {
  const [formData, setFormData] = useState({
    caseNo: "",
    title: "",
    description: "",
    age: "",
    profession: "",
    religion: "",
    district: "",
    officerHandling: "",
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
        officerHandling: "",
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
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div className="justify-center items-center  px-4 py-1">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold my-2 text-center">Create Case</h1>
        <form onSubmit={handleSubmit} className="flex flex-col border border-sky-400 rounded-lg p-2 space-y-3">
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <input
            type="text"
            name="caseNo"
            value={formData.caseNo}
            onChange={handleChange}
            placeholder="Case No"
            className="p-2 border rounded w-full text-sm"
            required
          />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="p-2 border rounded w-full text-sm"
            required
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="p-2 border rounded w-full text-sm"
            required
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="p-2 border rounded w-full text-sm"
            required
          />
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            placeholder="Profession"
            className="p-2 border rounded w-full text-sm"
            required
          />
          <input
            type="text"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            placeholder="Religion"
            className="p-2 border rounded w-full text-sm"
            required
          />
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="District"
            className="p-2 border rounded w-full text-sm"
            required
          />
          {isAdmin && (
            <select
              name="officerHandling"
              value={formData.officerHandling}
              onChange={handleChange}
              className="p-2 border rounded w-full text-sm"
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
            className="p-2 border rounded w-full text-sm"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 w-full "
          >
            Create Case
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

export default CreateCase;
