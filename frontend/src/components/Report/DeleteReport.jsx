import React, { useState } from "react";
import axios from "axios";

const DeleteReport = ({ id, setIsOpen }) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteReport = () => {
    const token = localStorage.getItem("token");

    setLoading(true);
    axios
      .delete(`http://localhost:8003/report/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setLoading(false);
        console.log("Report deleted successfully");
        setIsOpen(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error deleting report:", error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold my-2 text-center">Delete Report</h1>
      {loading && "Loading...."}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl p my-1 x-auto">
        <h3 className="py-1">Are you sure you want to delete this report?</h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-1/2"
          onClick={handleDeleteReport}
        >
          Yes, Delete it
        </button>
      </div>
      <button
        onClick={() => {
          setIsOpen(false);
        }}
        className="bg-sky-500 mt-2 text-white px-4 py-2 rounded-md"
      >
        Close
      </button>
    </div>
  );
};

export default DeleteReport;
