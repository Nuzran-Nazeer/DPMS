import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewCase = () => {
    const [caseData, setCaseData] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchCase = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8003/case/${id}`);
                setCaseData(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCase();
    }, [id]);

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div>
                <h1 className="text-3xl my-4 text-center">Case Details</h1>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
                        <span className="text-xl mr-4 text-gray-500">Case No.</span>
                        <span>{caseData.caseNo}</span>
                        <span className="text-xl mr-4 text-gray-500">Title</span>
                        <span>{caseData.title}</span>
                        <span className="text-xl mr-4 text-gray-500">Description</span>
                        <span>{caseData.description}</span>
                        <span className="text-xl mr-4 text-gray-500">Age</span>
                        <span>{caseData.age}</span>
                        <span className="text-xl mr-4 text-gray-500">Profession</span>
                        <span>{caseData.profession}</span>
                        <span className="text-xl mr-4 text-gray-500">Religion</span>
                        <span>{caseData.religion}</span>
                        <span className="text-xl mr-4 text-gray-500">District</span>
                        <span>{caseData.district}</span>
                        <span className="text-xl mr-4 text-gray-500">Officer Handling</span>
                        <span>{caseData.officerHandling}</span>
                        <span className="text-xl mr-4 text-gray-500">Drug Type</span>
                        <span>{caseData.drugType}</span>
                        <span className="text-xl mr-4 text-gray-500">Status</span>
                        <span>{caseData.status}</span>
                        <span className="text-xl mr-4 text-gray-500">Create Time</span>
                        <span>{new Date(caseData.createdAt).toString()}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewCase;
