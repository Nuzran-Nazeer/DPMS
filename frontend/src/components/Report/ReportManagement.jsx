import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit, AiOutlineSearch } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { FaShareSquare, FaSearch } from "react-icons/fa";
import Popup from "../Popup";
import EditReport from "./EditReport";
import DeleteReport from "./DeleteReport";
import CreateReport from "./CreateReport";

import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { jwtDecode } from "jwt-decode";

const ReportManagement = () => {
  const [selectedReport, setSelectedReport] = useState();
  const [displayType, setDisplayType] = useState("");
  const [reports, setReports] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [reportData, setReportData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
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

  useEffect(() => {
    if (isOpen && displayType === "view" && selectedReport) {
      const fetchReport = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:8003/report/${selectedReport}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setReportData(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchReport();
    }
  }, [isOpen, displayType, selectedReport, token]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = filteredReports.filter((report) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const reportDateField = report.incidentDate
          ? new Date(report.incidentDate).toISOString().split("T")[0]
          : "";
        return (
          report.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          report.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          report.drugType.toLowerCase().includes(lowerCaseSearchTerm) ||
          reportDateField.toLowerCase().includes(lowerCaseSearchTerm) ||
          report.location.toLowerCase().includes(lowerCaseSearchTerm) ||
          report.evidence.toLowerCase().includes(lowerCaseSearchTerm) ||
          report.individualsInvolved.toLowerCase().includes(lowerCaseSearchTerm)
        );
      });
      setFilteredReports(filtered);
      setFilterCategory("");
    } else {
      setFilteredReports(reports);
      setFilterCategory("");
    }
  }, [searchTerm, reports]);

  useEffect(() => {
    if (filterCategory && filterValue) {
      const filtered = reports.filter((reportItem) => {
        return reportItem[filterCategory] === filterValue;
      });
      setFilteredReports(filtered);
    } else {
      setFilteredReports(reports);
    }
  }, [filterCategory, filterValue, reports]);

  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
    setFilterValue("");
    setIsSearchVisible("");
  };

  const ViewReport = () => {
    return (
      <>
        <div className="justify-center items-center px-4">
          <h1 className="text-3xl font-bold my-2 text-center">
            Report Details
          </h1>
          {loading ? (
            "Loading...."
          ) : (
            <div className="border-2 mx-auto border-sky-400 rounded-xl w-fit p-6">
              <div className="space-y-2">
                <div className="flex flex-col">
                  <span className="text-gray-500 font-semibold">Title:</span>
                  <span>{reportData.title}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-500 font-semibold">
                    Description:
                  </span>
                  <span>{reportData.description}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-500 font-semibold">
                    Drug Type:
                  </span>
                  <span>{reportData.drugType}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-500 font-semibold">
                    Incident Date:
                  </span>
                  <span>
                    {new Date(reportData.incidentDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-500 font-semibold">Location:</span>
                  <span>{reportData.location}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-500 font-semibold">Evidence:</span>
                  <span>{reportData.evidence}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-500 font-semibold">
                    Individuals Involved:
                  </span>
                  <span>{reportData.individualsInvolved}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-500 font-semibold">
                    Create Time:
                  </span>
                  <span>{new Date(reportData.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
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

  const handleShare = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:8003/report/share/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.message === "Case shared successfully") {
        alert("Case shared successfully!");
      } else {
        alert("Error sharing the case.");
      }
    } catch (error) {
      console.error("Error sharing case:", error);
      alert("Error sharing the case.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Report List</h1>
        <div className="flex items-center relative">
          <FaSearch
            className="text-2xl text-sky-800 border rounded-r cursor-pointer"
            onClick={() => {
              if (isSearchVisible) {
                setSearchTerm("");
              }
              setIsSearchVisible(!isSearchVisible); 
            }}
          />
          {isSearchVisible && (
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="ml-2 p-2 border rounded transition-all duration-300"
            />
          )}

          <MdOutlineAddBox
            className="text-sky-800 text-4xl ml-4"
            onClick={() => {
              setIsOpen(true);
              setDisplayType("create");
            }}
          />
        </div>
      </div>
      {isOpen && (
        <Popup>
          {displayType === "view" && <ViewReport />}
          {displayType === "edit" && (
            <EditReport id={selectedReport} setIsOpen={setIsOpen} />
          )}
          {displayType === "delete" && (
            <DeleteReport id={selectedReport} setIsOpen={setIsOpen} />
          )}
          {displayType === "create" && <CreateReport setIsOpen={setIsOpen} />}
        </Popup>
      )}
      <div className="mb-4">
        <label htmlFor="filterCategory" className="mr-2">
          Filter by:
        </label>
        <select
          id="filterCategory"
          value={filterCategory}
          onChange={handleCategoryChange}
          className="p-2 border rounded"
        >
          <option value="">Select a Category</option>
          <option value="drugType">Drug Type</option>
          <option value="location">Location</option>
          <option value="individualsInvolved">Individuals Involved</option>
          <option value="incidentDate">Incident Date</option>
        </select>
        {filterCategory && (
          <select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="ml-4 p-2 border rounded"
          >
            <option value="">Select {filterCategory}</option>
            {[
              ...new Set(
                reports.map((reportItem) => reportItem[filterCategory])
              ),
            ].map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
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
              <th className="border border-slate-600 rounded-md">Location</th>
              <th className="border border-slate-600 rounded-md">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((reportItem, index) => (
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
                  {reportItem.location}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <BsInfoCircle
                      className="text-2xl text-green-800"
                      onClick={() => {
                        setIsOpen(true);
                        setSelectedReport(reportItem._id);
                        setDisplayType("view");
                      }}
                    />

                    {role === "Admin" && (
                      <>
                        <AiOutlineEdit
                          className="text-2xl text-yellow-600"
                          onClick={() => {
                            setIsOpen(true);
                            setSelectedReport(reportItem._id);
                            setDisplayType("edit");
                          }}
                        />

                        <MdOutlineDelete
                          className="text-2xl text-red-600"
                          onClick={() => {
                            setIsOpen(true);
                            setSelectedReport(reportItem._id);
                            setDisplayType("delete");
                          }}
                        />
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
