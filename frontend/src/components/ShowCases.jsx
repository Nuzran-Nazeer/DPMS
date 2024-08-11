import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Spinner from './Spinner';

const CaseManagement = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterCategory, setFilterCategory] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [filteredCases, setFilteredCases] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8003/case');
                setCases(response.data.data);
                setFilteredCases(response.data.data); // Initially set to all cases
            } catch (error) {
                console.error('Error fetching cases:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (filterCategory && filterValue) {
            const filtered = cases.filter(caseItem => caseItem[filterCategory] === filterValue);
            setFilteredCases(filtered);
        } else {
            setFilteredCases(cases);
        }
    }, [filterCategory, filterValue, cases]);

    const handleCategoryChange = (e) => {
        setFilterCategory(e.target.value);
        setFilterValue(''); // Reset the filter value when category changes
    };

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Case List</h1>
                <Link to='/case/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>

            <div className="mb-4">
                <label htmlFor="filterCategory" className="mr-2">Filter by:</label>
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
                        {[...new Set(cases.map(caseItem => caseItem[filterCategory]))].map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>Case No.</th>
                            <th className='border border-slate-600 rounded-md'>Title</th>
                            <th className='border border-slate-600 rounded-md'>Description</th>
                            <th className='border border-slate-600 rounded-md'>Officer Handling</th>
                            <th className='border border-slate-600 rounded-md'>Drug Type</th>
                            <th className='border border-slate-600 rounded-md'>Status</th>
                            <th className='border border-slate-600 rounded-md'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCases.map((caseItem, index) => (
                            <tr key={caseItem._id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {caseItem.caseNo}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {caseItem.title}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {caseItem.description}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {caseItem.officerHandling}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {caseItem.drugType}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {caseItem.status}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/case/caseDetails/${caseItem._id}`}>
                                            <BsInfoCircle className='text-2xl text-green-800' />
                                        </Link>
                                        <Link to={`/cases/edit/${caseItem._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-600' />
                                        </Link>
                                        <Link to={`/cases/delete/${caseItem._id}`}>
                                            <MdOutlineDelete className='text-2xl text-red-600' />
                                        </Link>
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
