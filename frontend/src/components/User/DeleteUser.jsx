import React, { useState } from "react";
import axios from "axios";
import config from "../../config";


// const [errorMessage, setErrorMessage] = useState("");

const DeleteUser = ({ id, setIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      await axios
        .delete(`${config.API_URL}/auth/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      setLoading(false);
      console.log("User deleted successfully");
      setSuccessMessage("User deleted successfully")
      setTimeout(() => {
        setIsOpen(false); // Close modal
        setSuccessMessage(''); // Clear success message
      }, 5000);
    } catch (error) {
      setLoading(false);
      console.log("Error deleting user:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold my-2 text-center">Delete User</h1>
      {loading && "Loading...."}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl p my-1 x-auto">
        <h3 className="py-1">Are you sure you want to delete this user?</h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-1/2"
          onClick={handleDeleteUser}
        >
          Yes, Delete it
        </button>
              {successMessage && (
                <p className="mt-2 text-green-600 text-sm">{successMessage}</p>
              )}
              
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

export default DeleteUser;
