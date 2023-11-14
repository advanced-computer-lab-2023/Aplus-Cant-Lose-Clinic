import React from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Error from "./components/Error";

const PatientDirect = () => {
  const { role } = useSelector((state) => state.user);
  return <div>{role !== "patient" && <Error />}</div>;
};

export default PatientDirect;
