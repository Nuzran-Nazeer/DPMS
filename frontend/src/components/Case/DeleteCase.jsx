import React, { useState } from "react";
import BackButton from "../BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const DeleteCase = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteCase = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect if no token found
      return;
    }

    const decodedToken = jwtDecode(token);
    if (decodedToken.role !== "Admin") {
      navigate("/unauthorized"); // Redirect if not Admin
      return;
    }
    setLoading(true);
    axios
      .delete(`http://localhost:8003/case/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setLoading(false);
        console.log("Case deleted successfully");
        navigate("/admin");
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error deleting case:", error);
      });
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      {/* Ensure BackButton is visible */}
      <div className="w-full text-left mb-4">
        <BackButton />
      </div>
      <h1 className="text-3xl mb-4 text-center">Delete Case</h1>
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <h3 className="text-2xl mb-4 text-center">Are you sure you want to delete this case?</h3>
            <button
              className="p-4 bg-red-600 text-white w-full rounded hover:bg-red-700 transition duration-200"
              onClick={handleDeleteCase}
            >
              Yes, Delete it
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteCase;
