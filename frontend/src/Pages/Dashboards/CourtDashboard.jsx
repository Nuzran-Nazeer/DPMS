import React, { useState } from 'react';
import Sidebar from '../../components/sideBar';
import Navbar from '../../components/NavBar';
import CaseManagement from '../../components/Case/CaseManagement';
import ReportManagement from '../../components/Report/ReportManagement';
import Footer from '../../components/Footer';
import { jwtDecode } from 'jwt-decode';

const CourtDashboard = () => {
  const [activeSection, setActiveSection] = useState('');

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;

  const renderSection = () => {
    switch (activeSection) {
      case 'caseManagement':
        return <CaseManagement />;
      case 'reportManagement':
        return <ReportManagement />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full mt-16">
            <h1 className="text-5xl font-extrabold mb-8">Court Dashboard</h1>
            <p className="text-2xl text-gray-700 mb-6">Select a section from the sidebar to manage:</p>
            <ul className="text-lg space-y-4 text-gray-600">
              <li className="hover:text-gray-800 transition">- Manage Cases: View and update shared case records.</li>
              <li className="hover:text-gray-800 transition">- View Reports: Access and review all shared reports.</li>
            </ul>
          </div>
        );
    }
  };

  return (
    <div className="relative h-screen bg-gray-100">
      <Sidebar userRole={userRole} setActiveSection={setActiveSection} />
      <div className="ml-64 pt-16">
        <Navbar userRole="Court" />
        <div className="p-8">
          {renderSection()}
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default CourtDashboard;
