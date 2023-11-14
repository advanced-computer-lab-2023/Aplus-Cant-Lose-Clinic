import React from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Error from "./components/Error";

const AdminDirect = () => {
  const { role } = useSelector((state) => state.user);

  return (
    <div>
      {role === "admin" ? (
        <Outlet />
      ) : (
        <Error />
      )}
    </div>
  );
};

export default AdminDirect;
