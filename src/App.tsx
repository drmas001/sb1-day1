import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import MainDashboard from './components/MainDashboard';
import AdminDashboard from './components/AdminDashboard';
import NewPatientAdmission from './components/NewPatientAdmission';
import PatientDischarge from './components/PatientDischarge';
import PatientDetails from './components/PatientDetails';
import DailyReportsManagement from './components/DailyReportsManagement';
import SpecialtiesManagement from './components/SpecialtiesManagement';
import Sidebar from './components/Sidebar';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        {user && <Sidebar />}
        <div className="flex-1">
          <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route
              path="/"
              element={
                user ? (
                  user.isAdmin ? (
                    <AdminDashboard />
                  ) : (
                    <MainDashboard />
                  )
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="/new-admission" element={<NewPatientAdmission />} />
            <Route path="/discharge" element={<PatientDischarge />} />
            <Route path="/patient/:mrn" element={<PatientDetails />} />
            <Route path="/daily-reports" element={<DailyReportsManagement />} />
            <Route path="/specialties" element={<SpecialtiesManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;