import React from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const PatientDirect = () => {
  const { role } = useSelector((state) => state.user);
  return <div>{(role==="pataient" )&& <Outlet />}</div>;
};

export default PatientDirect;
