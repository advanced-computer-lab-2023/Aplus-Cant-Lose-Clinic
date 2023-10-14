import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Admin from "./components/Adminstrator/Admin";

import PaHomePage from "./components/patient/Home";
import { Outlet } from "react-router-dom";
import DocHome from "./components/doctor/DocHome";
import Navbar from "./components/Navbar";
const HomeDirect = () => {
  const { role } = useSelector((state) => state.user);
  console.log(role)
  return (
    <div>
      <Navbar />
      {role === "admin" && <Admin />}
      {role === "doctor" && <DocHome />}
      {role === "patient" && <PaHomePage />}
    </div>
  );
};

export default HomeDirect;
