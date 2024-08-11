import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditUser = () => {
    const [userData, setUserData] = useState({});
    const [responseMessage, setResponseMessage] = useState('');
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
                setResponseMessage('Error fetching user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8003/admin/user/${id}`, userData);
            setResponseMessage('User updated successfully');
        } catch (error) {
            setResponseMessage('Error updating user');
            console.log(error);
        }
    };

    const renderRoleSpecificFields = () => {
        switch (userData.role) {
            case 'Admin':
                return (
                    <>
                        <label className="text-xl mr-4 text-gray-500">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={userData.first_name || ''}
                            onChange={handleInputChange}
                            className="mb-4 p-2 border rounded"
                        />
                        <label className="text-xl mr-4 text-gray-500">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={userData.last_name || ''}
                            onChange={handleInputChange}
                            className="mb-4 p-2 border rounded"
                        />
                        <label className="text-xl mr-4 text-gray-500">Police ID</label>
                        <input
                            type="text"
                            name="policeID"
                            value={userData.policeID || ''}
                            onChange={handleInputChange}
                            className="mb-4 p-2 border rounded"
                        />
                        <label className="text-xl mr-4 text-gray-500">Rank</label>
                        <input
                            type="text"
                            name="rank"
                            value={userData.rank || ''}
                            onChange={handleInputChange}
                            className="mb-4 p-2 border rounded"
                        />
                    </>
                );
            case 'Police Officer':
                return (
                    <>
                        <label className="text-xl mr-4 text-gray-500">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={userData.first_name || ''}
                            onChange={handleInputChange}
                            className="mb-4 p-2 border rounded"
                        />
                        <label className="text-xl mr-4 text-gray-500">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={userData.last_name || ''}
                            onChange={handleInputChange}
                            className="mb-4 p-2 border rounded"
                        />
                        <label className="text-xl mr-4 text-gray-500">Police ID</label>
                        <input
                            type="text"
                            name="policeID"
                            value={userData.policeID || ''}
                            onChange={handleInputChange}
                            className="mb-4 p-2 border rounded"
                        />
                        <label className="text-xl mr-4 text-gray-500">Rank</label>
                        <input
                            type="text"
                            name="rank"
                            value={userData.rank || ''}
                            onChange={handleInputChange}
                            className="mb-4 p-2 border rounded"
                        />
                        <label className="text-xl mr-4 text-gray-500">Station</label>
                        <input
                            type="text"
                            name="station"
                            value={userData.station || ''}
                            onChange={handleInputChange}
                            className="mb-4 p-2 border rounded"
                        />
                        
                    </>
                );
            case 'Drug Prevention Authority':
            case 'Rehab Centre':
                return (
                    <>
                        <label className="text-xl mr-4 text-gray-500">Authority Name</label>
                        <input
                            type="text"
                            name="authorityName"
                            value={userData.authorityName || ''}
                            onChange={handleInputChange}
                            className="mb-4 p-2 border rounded"
                        />
                        <label className="text-xl mr-4 text-gray-500">Registration Number</label>
                        <input
                            type="text"
                            name="registrationNumber"
                            value={userData.registrationNumber || ''}
                            onChange={handleInputChange}
                            className="mb-4 p-2 border rounded"
                        />
                        <label className="text-xl mr-4 text-gray-500">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={userData.address || ''}
                            onChange={handleInputChange}
                            className="mb-4 p-2 border rounded"
                        />
                    </>
                );
            case 'Court':
                return (
                    <>
                        <label className="text-xl mr-4 text-gray-500">Court Name</label>
                        <input
                            type="text"
                            name="courtName"
                            value={userData.courtName || ''}
                            onChange={handleInputChange}
                            className="mb-4 p-2 border rounded"
                        />
                        <label className="text-xl mr-4 text-gray-500">Court ID</label>
                        <input
                            type="text"
                            name="courtID"
                            value={userData.courtID || ''}
                            onChange={handleInputChange}
                            className="mb-4 p-2 border rounded"
                        />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="w-full max-w-lg">
                <h1 className="text-4xl font-bold my-4 text-center">Edit User</h1>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <form className="flex flex-col border-2 border-sky-400 rounded-xl p-4" onSubmit={handleUpdateUser}>
                        
                        {/* Role Specific Fields */}

                        {renderRoleSpecificFields()}
                        
                        {/* Common Fields */}
                        
                        <label className="text-xl mr-4 text-gray-500">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email || ''}
                            onChange={handleInputChange}
                            className="mb-4 p-2 border rounded"
                        />
                        <label className="text-xl mr-4 text-gray-500">Contact Number</label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={userData.contactNumber || ''}
                            onChange={handleInputChange}
                            className="mb-4 p-2 border rounded"
                        />

                        

                        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                            Update User
                        </button>

                        {responseMessage && <p className="mt-4 text-green-600">{responseMessage}</p>}
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditUser;
