import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../BackButton';
import Spinner from '../Spinner';

const ShowReport = () => {
    const [reportData, setReportData] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchReport = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8003/report/${id}`);
                setReportData(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]); 

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Report Details</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                    <span className='text-xl mr-4 text-gray-500'>Id</span>
                    <span>{reportData._id}</span>
                    <span className='text-xl mr-4 text-gray-500'>Title</span>
                    <span>{reportData.title}</span>
                    <span className='text-xl mr-4 text-gray-500'>Description</span>
                    <span>{reportData.description}</span>
                    <span className='text-xl mr-4 text-gray-500'>Drug Type</span>
                    <span>{reportData.drugType}</span>
                    <span className='text-xl mr-4 text-gray-500'>Incident Date</span>
                    <span>{new Date(reportData.incidentDate).toString()}</span>
                    <span className='text-xl mr-4 text-gray-500'>Location</span>
                    <span>{reportData.location}</span>
                    <span className='text-xl mr-4 text-gray-500'>Evidence</span>
                    <span>{reportData.evidence}</span>
                    <span className='text-xl mr-4 text-gray-500'>Individuals Involved</span>
                    <span>{reportData.individualsInvolved}</span>
                    <span className='text-xl mr-4 text-gray-500'>Create Time</span>
                    <span>{new Date(reportData.createdAt).toString()}</span>
                </div>
            )}
        </div>
    );
};

export default ShowReport;
