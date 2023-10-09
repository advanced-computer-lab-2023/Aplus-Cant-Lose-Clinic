import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // Import Provider from 'react-redux'
import store from "./store";
import HomeDirect from "./HomeDirect";
import PatientDirect from "./PatientDirect";
import AdminDirect from "./AdminDirect";
import DoctorDirect from "./DoctorDirect";
import Start from "./components/start";
import dayjs from "dayjs";
import "dayjs/plugin/weekOfYear";
import "dayjs/plugin/customParseFormat";
import "dayjs/plugin/localizedFormat";
import "dayjs/plugin/isBetween";

import Error from "./components/Error";
import Login from "./components/Authentication/Login";
import RegisterAs from "./components/Authentication/RegisterAs";

import RegisterAsPatient from "./components/Authentication/RegisterAsPatient";
import RegisterAsPharmacist from "./components/Authentication/RegisterAsPharmacist";
import upload_docs from "./components/Authentication/upload_docs";
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
} from "react-router-dom";

import MyProfile from "./components/doctor/MyProfile"; // Update the path to match your file structure
import DocHome from "./components/doctor/HomePage"; // Update the path to match your file structure
import MyAppointments from "./components/doctor/MyAppointments"; // Update the path to match your file structure
import PatientDetails from "./components/doctor/PatientView"; // Update the path to match your file structure
import PatientList from "./components/doctor/PatientsList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Start />}>
      <Route path="Login" element={<Login />} />
      <Route path="RegisterAs" element={<RegisterAs />}>
        <Route path="Patient" element={<RegisterAsPatient />} />
        <Route path="Pharmacist" element={<RegisterAsPharmacist />} />
      </Route>

      <Route element={<DoctorDirect />}>
        <Route path="Home" element={<DocHome />} />
        <Route path="HomePage/myprofile" element={<MyProfile />} />
        <Route path="HomePage/myappointments" element={<MyAppointments />} />
        <Route
          path="myappointments/patientdetails"
          element={<PatientDetails />}
        />
        <Route path="PatientList" element={<PatientList />} />
        <Route path="PatientList/patientdetails" element={<PatientDetails />} />
      </Route>

      <Route element={<AdminDirect />}>
        <Route path="Home" end element={<Admin />} />
      </Route>
      <Route element={<PatientDirect />}>
        <Route path="Home" end element={<PaHome />} />
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
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
