import React from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const DoctorDirect = () => {
  const { role } = useSelector((state) => state.user);

  return (
    <div>
      return <div>{role === "doctor" && <Outlet />}</div>;
    </div>
  );
};

export default DoctorDirect;
