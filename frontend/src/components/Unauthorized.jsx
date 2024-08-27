import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

const Unauthorized = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 text-gray-800">
            <h1 className="text-4xl font-bold mb-4">403 - Unauthorized</h1>
            <p className="text-lg mb-6">You do not have permission to view this page.</p>
            <BackButton/>
        </div>
    );
};

export default Unauthorized;
