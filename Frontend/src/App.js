import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // Import Provider from 'react-redux'
import store from "./store";
import HomeDirect from "./HomeDirect";
import PatientDirect from "./PatientDirect";

import DoctorDirect from "./DoctorDirect";
import { createContext, useState } from "react";
import dayjs from "dayjs";
import "dayjs/plugin/weekOfYear";
import "dayjs/plugin/customParseFormat";
import "dayjs/plugin/localizedFormat";
import "dayjs/plugin/isBetween";

import Error from "./components/Error";
import Login from "./components/Authentication/Login";
import RegisterAs from "./components/Authentication/RegisterAs";

import RegisterAsPatient from "./components/Authentication/RegisterAsPatient";

// import upload_docs from "./components/Authentication/upload_docs";
import Prescriptions from "./components/patient/Prescription";

import ListOfPrescriptions from "./components/patient/ListOfPrescriptions";
import ViewFamilyMember from "./components/patient/viewfamilymember";
import NewFamilyMember from "./components/patient/newfamilymember";
import Appointments from "./components/patient/appointments";
import DoctorsList from "./components/patient/DoctorsList";
import Doctordetails from "./components/patient/Doctordetails";
import Admin from "./components/Adminstrator/Admin";
import PaHome from "./components/patient/Home";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  Routes,
} from "react-router-dom";

import MyProfile from "./components/doctor/MyProfile"; // Update the path to match your file structure
import DocHome from "./components/doctor/HomePage"; // Update the path to match your file structure
import MyAppointments from "./components/doctor/MyAppointments"; // Update the path to match your file structure
import PatientDetails from "./components/doctor/PatientView"; // Update the path to match your file structure
import PatientList from "./components/doctor/PatientsList";
import Start from "./components/Start.js";
import { Snackbar, Alert } from "@mui/material";
import RegisterAsDoctor from "./components/Authentication/RegisterAsDoctor";
import ProfileDirect from "./ProfileDirect";
import DocPatients from "./components/doctor/DocPatients";
import AddPack from "./components/Adminstrator/AddPack"
import PatientView from "./components/doctor/PatientView";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Start />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/RegisterAs" element={<RegisterAs />} />
      <Route path="/RegisterAsPatient" element={<RegisterAsPatient />} />
      <Route path="/RegisterAsDoctor" element={<RegisterAsDoctor />} />
      <Route path="/Home" element={<HomeDirect />} />
      <Route path="/Profile" element={<ProfileDirect />} />
      <Route path="/DocPatients" element={<DocPatients />} />
      <Route path="Appointments" element={<Appointments />} />
      <Route path="viewfamilymembers" element={<ViewFamilyMember />} />
      <Route
        path="viewfamilymembers/newfamilymembers"
        element={<NewFamilyMember />}
      />
      <Route path="ListOfPrescriptions" element={<ListOfPrescriptions />} />
      <Route
        path="ListOfPrescriptions/Prescriptions"
        element={<Prescriptions />}
      />
      <Route path="DoctorsList" element={<DoctorsList />} />
      <Route path="DoctorsList/Doctordetails" element={<Doctordetails />} />
      <Route path="AddHealthPackages" element={<AddPack />} />
      <Route path="/PatientsList" element={<PatientView />} />
    </Route>
  )
);

// Severitys:
// success
// error
// info
// warning
export const SnackbarContext = createContext();

const App = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  function displaySnackbar(message, severity) {
    setSnackbarOpen(true);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
  }

  return (
    <div>
      <SnackbarContext.Provider value={displaySnackbar}>
        <RouterProvider router={router} />
      </SnackbarContext.Provider>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={10000}
        onClose={() => {
          setSnackbarOpen(false);
        }}
      >
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </div>
  );
};

export default App;
