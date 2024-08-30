import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../BackButton";
import { jwtDecode } from "jwt-decode";
import Navbar from "../NavBar";

const ViewUser = ({ id, setIsOpen }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
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
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const getUserName = (user) => {
    switch (user.role) {
      case "Court":
        return user.courtName;
      case "Drug Prevention Authority":
      case "Rehab Centre":
        return user.authorityName;
      case "Admin":
      case "Police Officer":
        return `${user.first_name} ${user.last_name}`;
      default:
        return "Unknown Name";
    }
  };

  return (
    <>
      <div className="justify-center items-center px-4">
        <div>
          <h1 className="text-3xl font-bold my-2 text-center">User Details</h1>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
              <span className="text-xl mr-4 text-gray-500">Name</span>
              <span>{getUserName(userData)}</span>
              <span className="text-xl mr-4 text-gray-500">Email</span>
              <span>{userData.email}</span>
              <span className="text-xl mr-4 text-gray-500">Contact Number</span>
              <span>{userData.contactNumber}</span>
              <span className="text-xl mr-4 text-gray-500">Role</span>
              <span>{userData.role}</span>

              {/* Conditional Rendering based on Role */}
              {userData.role === "Admin" && (
                <>
                  <span className="text-xl mr-4 text-gray-500">Police ID</span>
                  <span>{userData.policeID}</span>
                  <span className="text-xl mr-4 text-gray-500">Rank</span>
                  <span>{userData.rank}</span>
                </>
              )}

              {userData.role === "Police Officer" && (
                <>
                  <span className="text-xl mr-4 text-gray-500">Police ID</span>
                  <span>{userData.policeID}</span>
                  <span className="text-xl mr-4 text-gray-500">Rank</span>
                  <span>{userData.rank}</span>
                  <span className="text-xl mr-4 text-gray-500">Station</span>
                  <span>{userData.station}</span>
                </>
              )}

              {userData.role === "Drug Prevention Authority" && (
                <>
                  <span className="text-xl mr-4 text-gray-500">
                    Authority Name
                  </span>
                  <span>{userData.authorityName}</span>
                  <span className="text-xl mr-4 text-gray-500">
                    Registration Number
                  </span>
                  <span>{userData.registrationNumber}</span>
                  <span className="text-xl mr-4 text-gray-500">Address</span>
                  <span>{userData.address}</span>
                </>
              )}

              {userData.role === "Court" && (
                <>
                  <span className="text-xl mr-4 text-gray-500">Court Name</span>
                  <span>{userData.courtName}</span>
                  <span className="text-xl mr-4 text-gray-500">Court ID</span>
                  <span>{userData.courtID}</span>
                </>
              )}

              {userData.role === "Rehab Centre" && (
                <>
                  <span className="text-xl mr-4 text-gray-500">
                    Authority Name
                  </span>
                  <span>{userData.authorityName}</span>
                  <span className="text-xl mr-4 text-gray-500">
                    Registration Number
                  </span>
                  <span>{userData.registrationNumber}</span>
                  <span className="text-xl mr-4 text-gray-500">Address</span>
                  <span>{userData.address}</span>
                </>
              )}

              <span className="text-xl mr-4 text-gray-500">Created At</span>
              <span>{new Date(userData.createdAt).toString()}</span>
            </div>
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

export default ViewUser;
