import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import Popup from "../Popup";

import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { jwtDecode } from "jwt-decode";

const ReportManagement = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const decodedToken = jwtDecode(token);
    const { role, userId } = decodedToken;
    setRole(role);

    if (
      role !== "Admin" &&
      role !== "PoliceOfficer" &&
      role !== "DrugPreventionAuthority" &&
      role !== "Court" &&
      role !== "RehabCentre"
    ) {
      navigate("/unauthorized");
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      const baseUrl = "http://localhost:8003/report";
      const endpoint =
        role === "Court" ? `${baseUrl}/fetchShared` : `${baseUrl}`;
      try {
        await axios
          .get(endpoint, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setReports(res.data.data);
          });
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShare = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `http://localhost:8003/report/share/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Case shared successfully!");
      } else {
        alert("Error sharing the case.");
      }
    } catch (error) {
      console.error("Error sharing case:", error);
      alert("Error sharing the case.");
    } finally {
      setShowDropdown(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Report List</h1>
        <Link to="/report/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-slate-600 rounded-md">No.</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md">
                Description
              </th>
              <th className="border border-slate-600 rounded-md">Drug Type</th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((reportItem, index) => (
              <tr key={reportItem._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {reportItem.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {reportItem.description}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {reportItem.drugType}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/report/reportDetails/${reportItem._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    {role === "Admin" && (
                      <>
                        <Link to={`/report/edit/${reportItem._id}`}>
                          <AiOutlineEdit className="text-2xl text-yellow-600" />
                        </Link>
                        <Link to={`/report/delete/${reportItem._id}`}>
                          <MdOutlineDelete className="text-2xl text-red-600" />
                        </Link>
                      </>
                    )}
                    {(role === "PoliceOfficer" || role === "Admin") && (
                      <FaShareSquare
                        className="text-2xl text-blue-600 cursor-pointer"
                        onClick={() => handleShare(reportItem._id)}
                      />
                    )}
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

export default ReportManagement;
