import React, { useState } from 'react';
import BackButton from '../BackButton';
import Spinner from '../Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteCase = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteCase = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:8003/case/${id}`)
      .then(() => {
        setLoading(false);
        console.log('Case deleted successfully');
        navigate('/admin');
      })
      .catch((error) => {
        setLoading(false);
        console.log('Error deleting case:', error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Case</h1>
      {loading && <Spinner />}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this case?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteCase}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteCase;
