import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete, MdOutlineAddBox } from "react-icons/md";
import { jwtDecode } from "jwt-decode";


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("All");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

    // Fetch users if authorized
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8003/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data.data);
        setFilteredUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  useEffect(() => {
    const filter =
      selectedRole === "All"
        ? users
        : users.filter((user) => user.role === selectedRole);
    setFilteredUsers(filter);
  }, [selectedRole, users]);

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
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <Link to="/admin/user/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>

      <div className="mb-4">
        <label htmlFor="roleFilter" className="mr-2">
          Filter by Role:
        </label>
        <select
          id="roleFilter"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Admin">Admin</option>
          <option value="Police Officer">Police Officer</option>
          <option value="Drug Prevention Authority">
            Drug Prevention Authority
          </option>
          <option value="Court">Court</option>
          <option value="Rehab Centre">Rehab Centre</option>
        </select>
      </div>

      {loading ? (
        <div>Loading....</div>
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-slate-600 rounded-md">Name</th>
              <th className="border border-slate-600 rounded-md">Email</th>
              <th className="border border-slate-600 rounded-md">Contact Number</th>
              <th className="border border-slate-600 rounded-md">Role</th>
              <th className="border border-slate-600 rounded-md">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {getUserName(user)}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {user.email}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {user.contactNumber}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {user.role}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/admin/user/userDetails/${user._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/admin/user/edit/${user._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/admin/user/delete/${user._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;
