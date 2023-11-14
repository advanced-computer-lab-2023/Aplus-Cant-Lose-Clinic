import React from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Error from "./components/Error";

const DoctorDirect = () => {
  const { role } = useSelector((state) => state.user);

  return (
    <div>
      {role === "doctor" ? (
        <Outlet />
      ) : (
        <Error />
      )}
    </div>
  );
};

export default DoctorDirect;
