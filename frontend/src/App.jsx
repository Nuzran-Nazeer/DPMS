import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage.jsx'
import Register from './Pages/Register.jsx'
import Login from './Pages/Login.jsx'
import CaseManagement from './components/Case/CaseManagement.jsx'
import ViewCase from './components/Case/ViewCase.jsx'
import CreateCase from './components/Case/CreateCase.jsx'
import EditCase from './components/Case/EditCase.jsx'
import DeleteCase from './components/Case/DeleteCase.jsx'
import ReportManagement from './components/Report/ReportManagement.jsx'
import ShowReport from './components/Report/ViewReport.jsx'
import CreateReport from './components/Report/CreateReport.jsx'
import EditReport from './components/Report/EditReport.jsx'
import DeleteReport from './components/Report/DeleteReport.jsx'
import UserManagement from './components/User/UserManagement.jsx'
import CreateUser from './components/User/CreateUser.jsx'
import ViewUser from './components/User/ViewUser.jsx'
import EditUser from './components/User/EditUser.jsx'
import DeleteUser from './components/User/DeleteUser.jsx'
import AdminDashboard from './Pages/Dashboards/AdminDashboard.jsx'
import PoliceOfficerDashboard from './Pages/Dashboards/PoliceOfficerDashboard.jsx'
import DPAuthorityDashboard from './Pages/Dashboards/DPAuthorityDashboard.jsx'
import CourtDashboard from './Pages/Dashboards/CourtDashboard.jsx'
import RehabCentreDashboard from './Pages/Dashboards/RehabCentreDashboard.jsx'
import Unauthorized from './components/Unauthorized.jsx'

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        {/* Users' Dashboard */}
        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route path='/police' element={<PoliceOfficerDashboard/>}/>
        <Route path='/dpa' element={<DPAuthorityDashboard/>}/>
        <Route path='/court' element={<CourtDashboard/>}/>
        <Route path='/rehabcentre' element={<RehabCentreDashboard/>}/>
        {/* Case Routes */}
        <Route path='/case' element={<CaseManagement/>}/>
        <Route path='/case/create' element={<CreateCase/>}/>
        <Route path='/case/caseDetails/:id' element={<ViewCase/>}/>
        <Route path='/case/edit/:id' element={<EditCase/>}/>
        <Route path='/case/delete/:id' element={<DeleteCase/>}/>
        {/* Report Routes */}
        <Route path='/report' element={<ReportManagement/>}/>
        <Route path='/report/create' element={<CreateReport/>}/>
        <Route path='/report/reportDetails/:id' element={<ShowReport/>}/>
        <Route path='/report/edit/:id' element={<EditReport/>}/>
        <Route path='/report/delete/:id' element={<DeleteReport/>}/>
        {/* Admin Auth Routes */}
        <Route path='/admin/user' element={<UserManagement/>}/>
        <Route path='/admin/user/create' element={<CreateUser/>}/>
        <Route path='/admin/user/userDetails/:id' element={<ViewUser/>}/>
        <Route path='/admin/user/edit/:id' element={<EditUser/>}/>
        <Route path='/admin/user/delete/:id' element={<DeleteUser/>}/>
        <Route path='/unauthorized' element={<Unauthorized/>}/>
        
      </Routes>
    </div>
  )
}

export default App;
