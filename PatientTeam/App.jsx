import React from "react";
import { Routes, Route } from 'react-router-dom';
import Prescriptions from './Prescription';
import Homepage from './Patients(HomePage)';
import ListOfPrescriptions from './ListOfPrescriptions';
import ViewFamilyMember from './viewfamilymember';
import NewFamilyMember from './newfamilymember';
import Appointments from './appointments';
import DoctorsList from './DoctorsList';
import Doctordetails from './Doctordetails';
const App = () => {
    return (
        <>
    <Routes>
      <Route path='/'  element={<Homepage />} />
      <Route path='/Homepage'  element={<Homepage />} />
      <Route path='/Homepage/Appointments' element={<Appointments />} />
      <Route path='/Homepage/viewfamilymembers' element={<ViewFamilyMember />} />
      <Route path='/Homepage/ListOfPrescriptions' element={<ListOfPrescriptions />} />
      <Route path='/Homepage/ListOfPrescriptions/Prescriptions' element={<Prescriptions />} />
      <Route path='/Homepage/viewfamilymembers/newfamilymembers' element={<NewFamilyMember />} />
      <Route path='/Homepage/DoctorsList' element={<DoctorsList />} />
      <Route path='/Homepage/DoctorsList/Doctordetails' element={<Doctordetails />} />

    </Routes>
        </>
    );
};

export default App;