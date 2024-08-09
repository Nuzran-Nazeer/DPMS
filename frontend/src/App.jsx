import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage.jsx'
import Register from './Pages/Register.jsx'
import Login from './Pages/Login.jsx'
import AdminDashboard from './Pages/AdminDashboard.jsx'
import ReportForm from './components/Report/reportForm.jsx'
import CaseManagement from './components/Case/CaseManagement.jsx'
import ShowCase from './components/Case/ShowCase.jsx'
import ShowReport from './components/Report/ShowReport.jsx'
import ReportManagement from './components/ReportManagement.jsx'

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route path='/case' element={<CaseManagement/>}/>
        <Route path='/case/caseDetails/:id' element={<ShowCase/>}/>
        <Route path='/report' element={<ReportManagement/>}/>
        <Route path='/report/create' element={<ReportForm/>}/>
        <Route path='/report/reportDetails/:id' element={<ShowReport/>}/>
      </Routes>
    </div>
  )
}

export default App;
