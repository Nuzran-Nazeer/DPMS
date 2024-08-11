import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleDeleteUser = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:8003/admin/user/${id}`)
      .then(() => {
        setLoading(false);
        console.log('User deleted successfully');
      })
      .catch((error) => {
        setLoading(false);
        console.log('Error deleting user:', error);
      });
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl my-4'>Delete User</h1>
      {loading && 'Loading....'}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this user?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteUser}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;
