import React, { useState } from "react";
import BackButton from "../BackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteCase = ({ id, setIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeleteCase = () => {
    const token = localStorage.getItem("token");

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
        setIsOpen(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error deleting case:", error);
      });
  };

  return (
    <div className="flex flex-col items-center  p-4">
      {/* Ensure BackButton is visible */}
      <div className="w-full text-left mb-3"></div>
      <h1 className="text-2xl mb-3 text-center">Delete Case</h1>
      <div className="flex flex-col items-center border border-sky-400 rounded-lg w-[90%] max-w-md p-6">
        {loading ? (
          <div className="text-sm">Loading...</div>
        ) : (
          <>
            <h3 className="text-xl mb-3 text-center">
              Are you sure you want to delete this case?
            </h3>
            <button
              className="p-2 bg-red-600 text-white w-full rounded hover:bg-red-700 transition duration-200 text-sm"
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
