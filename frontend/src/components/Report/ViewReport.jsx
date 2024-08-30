import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../BackButton";
import { Link, useNavigate } from "react-router-dom";

// const ShowReport = () => {
//   const [reportData, setReportData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login"); // Redirect if no token found
//       return;
//     }

    
//     const fetchReport = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`http://localhost:8003/report/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setReportData(response.data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, [id]);

//   return (
//     <div className="justify-center items-center px-4">
      
//       <h1 className="text-3xl font-bold my-2 text-center">Report Details</h1>
//       {loading ? (
//         "Loading...."
//       ) : (
//         <div className="flex flex-col border-2 mx-auto border-sky-400 rounded-xl w-fit p-4">
//           <span className="text-xl mr-4 text-gray-500">Id</span>
//           <span>{reportData._id}</span>
//           <span className="text-xl mr-4 text-gray-500">Title</span>
//           <span>{reportData.title}</span>
//           <span className="text-xl mr-4 text-gray-500">Description</span>
//           <span>{reportData.description}</span>
//           <span className="text-xl mr-4 text-gray-500">Drug Type</span>
//           <span>{reportData.drugType}</span>
//           <span className="text-xl mr-4 text-gray-500">Incident Date</span>
//           <span>{new Date(reportData.incidentDate).toString()}</span>
//           <span className="text-xl mr-4 text-gray-500">Location</span>
//           <span>{reportData.location}</span>
//           <span className="text-xl mr-4 text-gray-500">Evidence</span>
//           <span>{reportData.evidence}</span>
//           <span className="text-xl mr-4 text-gray-500">
//             Individuals Involved
//           </span>
//           <span>{reportData.individualsInvolved}</span>
//           <span className="text-xl mr-4 text-gray-500">Create Time</span>
//           <span>{new Date(reportData.createdAt).toString()}</span>
//         </div>
//       )}
      
      
//     </div>
//   );
// };


const ShowReport = () => {
    return (
      <>
        <span className="text-xl mb-1">Report Details</span>
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
                <span className="text-gray-500 font-semibold">Drug Type:</span>
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
      </>
    );
  };
export default ShowReport;