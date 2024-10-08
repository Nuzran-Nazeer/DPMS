import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { FaShareSquare , FaSearch } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import Popup from "../Popup";
import CreateCase from "./CreateCase";
import DeleteCase from "./DeleteCase";
import EditCase from "./EditCase";
import ViewCase from "./ViewCase";

const CaseManagement = () => {
  const [selectedCase, setSelectedCase] = useState();
  const [displayType, setDisplayType] = useState("");
  const [cases, setCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [officers, setOfficers] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filteredCases, setFilteredCases] = useState([]);
  const [role, setRole] = useState("");
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {}, [cases]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const decodedToken = jwtDecode(token);
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [role]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = filteredCases.filter((caseItem) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
          caseItem.caseNo.toString().includes(lowerCaseSearchTerm) ||
          (caseItem.title && caseItem.title.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (caseItem.description && caseItem.description.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (caseItem.age && caseItem.age.toString().includes(lowerCaseSearchTerm)) ||
          (caseItem.profession && caseItem.profession.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (caseItem.religion && caseItem.religion.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (caseItem.district && caseItem.district.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (caseItem.officerHandling && caseItem.officerHandling.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (caseItem.drugType && caseItem.drugType.toLowerCase().includes(lowerCaseSearchTerm))
        );
      });
      setFilteredCases(filtered);
      setFilterCategory("");
    } else {
      setFilteredCases(cases);
    }
  }, [searchTerm, cases]);

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
    setIsSearchVisible("");
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

          {(role === "Admin" || role === "PoliceOfficer") && (
            <MdOutlineAddBox
              className="text-sky-800 text-4xl ml-4"
              onClick={() => {
                setIsOpen(true);
                setDisplayType("create");
              }}
            />
          )}
        </div>
      </div>
      {isOpen && (
        <Popup>
          {displayType === "view" && (
            <ViewCase id={selectedCase} setIsOpen={setIsOpen} />
          )}
          {displayType === "edit" && (
            <EditCase id={selectedCase} setIsOpen={setIsOpen} />
          )}
          {displayType === "delete" && (
            <DeleteCase id={selectedCase} setIsOpen={setIsOpen} />
          )}
          {displayType === "create" && <CreateCase setIsOpen={setIsOpen} />}
        </Popup>
      )}

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
                  <div className="flex justify-center gap-x-4">
                    <BsInfoCircle
                      className="text-2xl text-green-800"
                      onClick={() => {
                        setIsOpen(true);
                        setSelectedCase(caseItem._id);
                        setDisplayType("view");
                      }}
                    />
                    {(role === "PoliceOfficer" || role === "Admin") && (
                      <AiOutlineEdit
                        className="text-2xl text-yellow-600"
                        onClick={() => {
                          setIsOpen(true);
                          setSelectedCase(caseItem._id);
                          setDisplayType("edit");
                        }}
                      />
                    )}
                    {role === "Admin" && (
                      <MdOutlineDelete
                        className="text-2xl text-red-600"
                        onClick={() => {
                          setIsOpen(true);
                          setSelectedCase(caseItem._id);
                          setDisplayType("delete");
                        }}
                      />
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
