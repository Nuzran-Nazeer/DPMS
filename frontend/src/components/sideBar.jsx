import React from 'react';
import { FaUsers, FaGavel, FaFileAlt } from 'react-icons/fa'; 

const Sidebar = ({ userRole, setActiveSection }) => {
  const getMenuItems = () => {
    switch (userRole) {
      case 'Admin':
        return [
          { label: 'Case Management', icon: <FaGavel />, section: 'caseManagement' },
          { label: 'User Management', icon: <FaUsers />, section: 'userManagement' },
          { label: 'Report Management', icon: <FaFileAlt />, section: 'reportManagement' },
        ];
      case 'PoliceOfficer':
        return [
          { label: 'Case Management', icon: <FaGavel />, section: 'caseManagement' },
          { label: 'Report Management', icon: <FaFileAlt />, section: 'reportManagement' },
        ];
      case 'DrugPreventionAuthority':
        return [
          { label: 'Case Management', icon: <FaGavel />, section: 'caseManagement' },
          { label: 'Report Management', icon: <FaFileAlt />, section: 'reportManagement' },
        ];
      case 'Court':
        return [
          { label: 'Case Management', icon: <FaGavel />, section: 'caseManagement' },
          { label: 'Report Management', icon: <FaFileAlt />, section: 'reportManagement' },
        ];
      case 'RehabCentre':
        return [
          { label: 'Case Management', icon: <FaGavel />, section: 'caseManagement' },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed top-16 left-0 z-10 flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        {userRole} Dashboard
      </div>
      <ul className="flex-grow mt-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => setActiveSection(item.section)}
              className="w-full text-left px-6 py-2 flex items-center space-x-2 hover:bg-gray-700 transition duration-200"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
