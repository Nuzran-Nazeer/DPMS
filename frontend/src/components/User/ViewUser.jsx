import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewUser = () => {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8003/admin/user/${id}`);
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
            case 'Court':
                return user.courtName;
            case 'Drug Prevention Authority':
            case 'Rehab Centre':
                return user.authorityName;
            case 'Admin':
            case 'Police Officer':
                return `${user.first_name} ${user.last_name}`;
            default:
                return 'Unknown Name';
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div>
                <h1 className="text-3xl my-4 text-center">User Details</h1>
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
                        {userData.role === 'Admin' && (
                            <>
                                <span className="text-xl mr-4 text-gray-500">Police ID</span>
                                <span>{userData.policeID}</span>
                                <span className="text-xl mr-4 text-gray-500">Rank</span>
                                <span>{userData.rank}</span>
                            </>
                        )}

                        {userData.role === 'Police Officer' && (
                            <>
                                <span className="text-xl mr-4 text-gray-500">Police ID</span>
                                <span>{userData.policeID}</span>
                                <span className="text-xl mr-4 text-gray-500">Rank</span>
                                <span>{userData.rank}</span>
                                <span className="text-xl mr-4 text-gray-500">Station</span>
                                <span>{userData.station}</span>
                            </>
                        )}

                        {userData.role === 'Drug Prevention Authority' && (
                            <>
                                <span className="text-xl mr-4 text-gray-500">Authority Name</span>
                                <span>{userData.authorityName}</span>
                                <span className="text-xl mr-4 text-gray-500">Registration Number</span>
                                <span>{userData.registrationNumber}</span>
                                <span className="text-xl mr-4 text-gray-500">Address</span>
                                <span>{userData.address}</span>
                            </>
                        )}

                        {userData.role === 'Court' && (
                            <>
                                <span className="text-xl mr-4 text-gray-500">Court Name</span>
                                <span>{userData.courtName}</span>
                                <span className="text-xl mr-4 text-gray-500">Court ID</span>
                                <span>{userData.courtID}</span>
                            </>
                        )}

                        {userData.role === 'Rehab Centre' && (
                            <>
                                <span className="text-xl mr-4 text-gray-500">Authority Name</span>
                                <span>{userData.authorityName}</span>
                                <span className="text-xl mr-4 text-gray-500">Registration Number</span>
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
        </div>
    );
};

export default ViewUser;
