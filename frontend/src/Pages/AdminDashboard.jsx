import React, { useState } from 'react';
import Sidebar from '../components/sideBar';
import ReportManagement from '../components/Report/ReportManagement';
import UserManagement from '../components/User/UserManagement';
import CaseManagement from '../components/Case/CaseManagement';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('');

  const renderSection = () => {
    switch (activeSection) {
      case 'caseManagement':
        return <CaseManagement />;
      case 'userManagement':
        return <UserManagement />;
      case 'reportManagement':
        return <ReportManagement />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-5xl font-extrabold mb-8">Admin Dashboard</h1>
            <p className="text-2xl text-gray-700 mb-6">Select a section from the sidebar to manage:</p>
            <ul className="text-lg space-y-4 text-gray-600">
              <li className="hover:text-gray-800 transition">- Manage Cases: Create, edit, view, or delete case records.</li>
              <li className="hover:text-gray-800 transition">- Manage Users: View and manage user accounts and permissions.</li>
              <li className="hover:text-gray-800 transition">- Manage Reports: Generate and manage system reports.</li>
            </ul>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="flex-1 p-8 bg-gray-100">
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminDashboard;
