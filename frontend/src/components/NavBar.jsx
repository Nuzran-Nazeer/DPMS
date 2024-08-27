import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import logo from '../assets/DPMS.png';

const Navbar = ({ userRole }) => {
  console.log('userRole:', userRole);
  const location = useLocation();

  // Adjusting the condition to check for each role specifically
  const isDashboardPage =
    (userRole === 'Admin' && location.pathname.includes('/admin')) ||
    (userRole === 'PoliceOfficer' && location.pathname.includes('/police')) ||
    (userRole === 'DrugPreventionAuthority' && location.pathname.includes('/dpa')) ||
    (userRole === 'Court' && location.pathname.includes('/court')) ||
    (userRole === 'RehabCentre' && location.pathname.includes('/rehabcentre'));

  const getLinkClass = (path) => {
    return location.pathname === path ? 'text-blue-500 font-semibold' : 'text-gray-700';
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex items-center justify-between z-20">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="DPMS Logo" className="w-12 h-12" />
        <ul className="flex space-x-4">
          {userRole === 'Admin' && (
            <li>
              <Link to="/admin" className={`${getLinkClass('/admin')} hover:text-gray-900 transition`}>
                Admin Dashboard
              </Link>
            </li>
          )}
          {userRole === 'PoliceOfficer' && (
            <li>
              <Link to="/police" className={`${getLinkClass('/police')} hover:text-gray-900 transition`}>
                Police Officer Dashboard
              </Link>
            </li>
          )}
          {userRole === 'DrugPreventionAuthority' && (
            <li>
              <Link to="/dpa" className={`${getLinkClass('/dpa')} hover:text-gray-900 transition`}>
                DPA Dashboard
              </Link>
            </li>
          )}
          {userRole === 'Court' && (
            <li>
              <Link to="/court" className={`${getLinkClass('/court')} hover:text-gray-900 transition`}>
                Court Dashboard
              </Link>
            </li>
          )}
          {userRole === 'RehabCentre' && (
            <li>
              <Link to="/rehabcentre" className={`${getLinkClass('/rehabcentre')} hover:text-gray-900 transition`}>
                Rehab Centre Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>
      {isDashboardPage && <LogoutButton />}
    </nav>
  );
};

export default Navbar;
