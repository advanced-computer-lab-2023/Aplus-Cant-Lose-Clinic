import React from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const PaDirect = () => {
  const { role } = useSelector((state) => state.user);
  return <div>{(role==="doctor" )&& <Outlet />}</div>;
};

export default PaDirect;
