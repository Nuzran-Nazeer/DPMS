import React, { useEffect, useState } from "react";
import api from '../../config/api';
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../BackButton";

const ViewCase = ({ id, setIsOpen }) => {
  const [caseData, setCaseData] = useState({});
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const decodedToken = jwtDecode(token);
    const { role, userId } = decodedToken;
    setRole(role);

    const fetchCase = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/case/${id}`);
        setCaseData(response.data.data);
      } catch (error) {
        console.error("Error fetching case:", error);
        setError("An error occurred while fetching the case.");
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [id]);

  return (
    <div className="justify-center items-center px-4">
      <div>
        <h1 className="text-3xl font-bold my-2 text-center">Case Details</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 text-sm">
            <span className="font-semibold mr-2 text-gray-600">Case No.</span>
            <span>{caseData.caseNo}</span>
            <span className="font-semibold mr-2 text-gray-600">Title</span>
            <span>{caseData.title}</span>
            <span className="font-semibold mr-2 text-gray-600">
              Description
            </span>
            <span>{caseData.description}</span>
            <span className="font-semibold mr-2 text-gray-600">Age</span>
            <span>{caseData.age}</span>
            <span className="font-semibold mr-2 text-gray-600">Profession</span>
            <span>{caseData.profession}</span>
            <span className="font-semibold mr-2 text-gray-600">Religion</span>
            <span>{caseData.religion}</span>
            <span className="font-semibold mr-2 text-gray-600">District</span>
            <span>{caseData.district}</span>
            <span className="font-semibold mr-2 text-gray-600">
              Officer Handling
            </span>
            <span>{caseData.officerHandling}</span>
            <span className="font-semibold mr-2 text-gray-600">Drug Type</span>
            <span>{caseData.drugType}</span>
            <span className="font-semibold mr-2 text-gray-600">Status</span>
            <span>{caseData.status}</span>
            <span className="font-semibold mr-2 text-gray-600">
              Create Time
            </span>
            <span>{new Date(caseData.createdAt).toString()}</span>
          </div>
        )}
        <button
          onClick={() => {
            setIsOpen(false);
          }}
          className="bg-sky-500 mt-1 text-white px-4 py-1 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewCase;
