import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyProfile from './MyProfile'; // Update the path to match your file structure
import HomePage from './HomePage'; // Update the path to match your file structure
import MyAppointments from './MyAppointments'; // Update the path to match your file structure
import PatientDetails from './PatientView'; // Update the path to match your file structure

function App() {
  return (
        <div>

        {/* Define your routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/HomePage/myprofile" element={<MyProfile />} />
          <Route path="/HomePage/myappointments" element={<MyAppointments />} />
          <Route path="/myappointments/patientdetails" element={<PatientDetails />} />
        </Routes>
      </div>
    
  );
}

export default App;
