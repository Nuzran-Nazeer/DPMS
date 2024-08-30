import React, { useEffect, useState } from "react";
import axios from "axios";

const EditUser = ({ id, setIsOpen }) => {
  const [userData, setUserData] = useState({});
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8003/admin/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data.data);
      } catch (error) {
        console.log(error);
        setResponseMessage("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8003/admin/user/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponseMessage("User updated successfully");
    } catch (error) {
      setResponseMessage("Error updating user");
      console.log(error);
    } finally {
      setIsOpen(false);
    }
  };

  const renderRoleSpecificFields = () => {
    switch (userData.role) {
      case "Admin":
      case "Police Officer":
        return (
          <>
            <label className="text-sm mr-2 text-gray-500">First Name</label>
            <input
              type="text"
              name="first_name"
              value={userData.first_name || ""}
              onChange={handleInputChange}
              className="mb-3 p-1 border rounded text-sm"
            />
            <label className="text-sm mr-2 text-gray-500">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={userData.last_name || ""}
              onChange={handleInputChange}
              className="mb-3 p-1 border rounded text-sm"
            />
            <label className="text-sm mr-2 text-gray-500">Police ID</label>
            <input
              type="text"
              name="policeID"
              value={userData.policeID || ""}
              onChange={handleInputChange}
              className="mb-3 p-1 border rounded text-sm"
            />
            <label className="text-sm mr-2 text-gray-500">Rank</label>
            <input
              type="text"
              name="rank"
              value={userData.rank || ""}
              onChange={handleInputChange}
              className="mb-3 p-1 border rounded text-sm"
            />
            {userData.role === "Police Officer" && (
              <>
                <label className="text-sm mr-2 text-gray-500">Station</label>
                <input
                  type="text"
                  name="station"
                  value={userData.station || ""}
                  onChange={handleInputChange}
                  className="mb-3 p-1 border rounded text-sm"
                />
              </>
            )}
          </>
        );
      case "Drug Prevention Authority":
      case "Rehab Centre":
        return (
          <>
            <label className="text-sm mr-2 text-gray-500">Authority Name</label>
            <input
              type="text"
              name="authorityName"
              value={userData.authorityName || ""}
              onChange={handleInputChange}
              className="mb-3 p-1 border rounded text-sm"
            />
            <label className="text-sm mr-2 text-gray-500">
              Registration Number
            </label>
            <input
              type="text"
              name="registrationNumber"
              value={userData.registrationNumber || ""}
              onChange={handleInputChange}
              className="mb-3 p-1 border rounded text-sm"
            />
            <label className="text-sm mr-2 text-gray-500">Address</label>
            <input
              type="text"
              name="address"
              value={userData.address || ""}
              onChange={handleInputChange}
              className="mb-3 p-1 border rounded text-sm"
            />
          </>
        );
      case "Court":
        return (
          <>
            <label className="text-sm mr-2 text-gray-500">Court Name</label>
            <input
              type="text"
              name="courtName"
              value={userData.courtName || ""}
              onChange={handleInputChange}
              className="mb-3 p-1 border rounded text-sm"
            />
            <label className="text-sm mr-2 text-gray-500">Court ID</label>
            <input
              type="text"
              name="courtID"
              value={userData.courtID || ""}
              onChange={handleInputChange}
              className="mb-3 p-1 border rounded text-sm"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="justify-center items-center px-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold my-2 text-center">Edit User</h1>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <form
              className="flex flex-col border border-sky-400 rounded-lg p-2"
              onSubmit={handleUpdateUser}
            >
              {/* Role Specific Fields */}

              {renderRoleSpecificFields()}

              {/* Common Fields */}

              <label className="text-sm mr-2 text-gray-500">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email || ""}
                onChange={handleInputChange}
                className="mb-3 p-1 border rounded text-sm"
              />
              <label className="text-sm mr-2 text-gray-500">
                Contact Number
              </label>
              <input
                type="text"
                name="contactNumber"
                value={userData.contactNumber || ""}
                onChange={handleInputChange}
                className="mb-3 p-1 border rounded text-sm"
              />

              <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-200 w-full"
              >
                Update User
              </button>

              {responseMessage && (
                <p className="mt-2 text-green-600 text-sm">{responseMessage}</p>
              )}
            </form>
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
    </>
  );
};

export default EditUser;
