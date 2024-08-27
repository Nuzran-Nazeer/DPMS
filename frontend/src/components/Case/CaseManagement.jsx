import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { FaShareSquare } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

const CaseManagement = () => {
  const [cases, setCases] = useState([]);
  const [officers, setOfficers] = useState([]); // New state to store officer data
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filteredCases, setFilteredCases] = useState([]);
  const [role, setRole] = useState("");
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("fetching", cases);
  }, [cases]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const decodedToken = jwtDecode(token);
    console.log("token", decodedToken);
    const { role, id } = decodedToken;
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
      console.log(role, "roll");
      setLoading(true);
      const baseUrl = "http://localhost:8003/case";
      let endpoint;
      switch (role) {
        case "PoliceOfficer":
          endpoint = `${baseUrl}/policehandler/${id}`;
          break;
        case "Court":
        case "RehabCentre":
          endpoint = `${baseUrl}/sharedcase/${role}`;
          break;
        default:
          endpoint = `${baseUrl}`;
          break;
      }

      const retrieveCases = () => {
        axios
          .get(`${endpoint}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setCases(res.data.data);
          });
      };

      try {
        const [officersResponse] = await Promise.all([
          axios.get("http://localhost:8003/police-officer", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const officerData = officersResponse.data.data;
        setOfficers(officerData);
        retrieveCases();
      } catch (error) {
        console.error("Error fetching cases or users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [role]);

  useEffect(() => {
    if (filterCategory && filterValue) {
      const filtered = cases.filter((caseItem) => {
        if (filterCategory === "officerHandling") {
          return getOfficerNameById(caseItem.officerHandling) === filterValue;
        } else {
          return caseItem[filterCategory] === filterValue;
        }
      });
      setFilteredCases(filtered);
    } else {
      setFilteredCases(cases);
    }
  }, [filterCategory, filterValue, cases]);

  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
    setFilterValue("");
  };

  const handleShareClick = (caseId) => {
    setSelectedCaseId(caseId);
    setShowDropdown(!showDropdown);
  };

  const handleDropdownItemClick = (role) => {
    handleShare(role);
    setShowDropdown(false);
  };

  const handleShare = async (role) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `http://localhost:8003/case/share/${selectedCaseId}`,
        { sharedWith: role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    } finally {
      setShowDropdown(false);
    }
  };

  const getOfficerNameById = (id) => {
    const officer = officers.find((officer) => officer._id === id);
    return officer
      ? `${officer.first_name} ${officer.last_name}`
      : "Unknown Officer";
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Case List</h1>
        {(role === "Admin" || role === "PoliceOfficer") && (
          <Link to="/case/create">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        )}
      </div>

      {role !== "PoliceOfficer" && (
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
            <option value="officerHandling">Officer Handling</option>
            <option value="drugType">Drug Type</option>
            <option value="age">Age</option>
            <option value="religion">Religion</option>
            <option value="profession">Profession</option>
            <option value="district">District</option>
            <option value="status">Status</option>
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
                  cases.map((caseItem) =>
                    filterCategory === "officerHandling"
                      ? getOfficerNameById(caseItem.officerHandling)
                      : caseItem[filterCategory]
                  )
                ),
              ].map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {loading ? (
        <div>Loading....</div>
      ) : filteredCases.length === 0 && role === "PoliceOfficer" ? (
        <div>No cases available for you.</div>
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-slate-600 rounded-md">Case No.</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md">
                Description
              </th>
              <th className="border border-slate-600 rounded-md">
                Officer Handling
              </th>
              <th className="border border-slate-600 rounded-md">Drug Type</th>
              <th className="border border-slate-600 rounded-md">Status</th>
              <th className="border border-slate-600 rounded-md">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((caseItem) => (
              <tr key={caseItem._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {caseItem.caseNo}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {caseItem.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {caseItem.description}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {getOfficerNameById(caseItem.officerHandling)}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {caseItem.drugType}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {caseItem.status}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="relative flex justify-center gap-x-4">
                    <Link to={`/case/caseDetails/${caseItem._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    {(role === "PoliceOfficer" || role === "Admin") && (
                      <Link to={`/case/edit/${caseItem._id}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-600" />
                      </Link>
                    )}
                    {role === "Admin" && (
                      <Link to={`/case/delete/${caseItem._id}`}>
                        <MdOutlineDelete className="text-2xl text-red-600" />
                      </Link>
                    )}
                    {(role === "PoliceOfficer" || role === "Admin") && (
                      <FaShareSquare
                        className="text-2xl text-blue-600 cursor-pointer"
                        onClick={() => handleShareClick(caseItem._id)}
                      />
                    )}

                    {showDropdown && selectedCaseId === caseItem._id && (
                      <div className="absolute right-0 mt-8 w-48 bg-white border rounded shadow-md z-10">
                        <ul>
                          <li
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleDropdownItemClick("Court")}
                          >
                            Share with Court
                          </li>
                          <li
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() =>
                              handleDropdownItemClick("RehabCentre")
                            }
                          >
                            Share with Rehab Centre
                          </li>
                        </ul>
                      </div>
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

export default CaseManagement;
