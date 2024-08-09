import React, { useState } from 'react';
import Sidebar from '../components/sideBar';
import ReportManagement from '../components/ReportManagement';
// import UserManagement from '../components/UserManagement';
import CaseManagement from '../components/Case/CaseManagement';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('caseManagement');

  const renderSection = () => {
    switch (activeSection) {
      case 'caseManagement':
        return <CaseManagement/>;
      case 'userManagement':
        return <UserManagement />;
      case 'reportManagement':
        return <ReportManagement />;
      default:
        return <CaseManagement />;
    }
  };

  return (
    <div className="flex">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="flex-1 p-6 bg-gray-100">
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminDashboard;
