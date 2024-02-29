import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AdHomePage from "./components/Adminstrator/Admin";
import PhHomePage from "./components/pharmacist/Home";
import PaHomePage from "./components/patient/Home";
import { Outlet } from "react-router-dom";
const HomeDirect = () => {
  const { role } = useSelector((state) => state.user);
  return (
    <>
    <Outlet>
      {role === "Admin" && <AdHomePage />}
      {role === "pharmacist" && <PhHomePage />}
      {role === "patient" && <PaHomePage />}</Outlet>
    </>
  );
};

export default HomeDirect;
