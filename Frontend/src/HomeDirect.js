import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Admin from "./components/Adminstrator/Admin";

import PaHomePage from "./components/patient/Home";
import { Outlet } from "react-router-dom";
import DocHome from "./components/doctor/DocHome";
import Navbar from "./components/Navbar";
import AccountAvatar from "./components/Authentication/AccountAvatar"; // Import the AccountAvatar component
const containerStyles = {
  height: "fit-content",
  maragin: "0 auto",
  backgroundColor: "whitesmoke",
  borderRadius: "7px",
  paddingRight: "15px",
  paddingBottom: "2px",
  paddingTop: "2px", // Center items vertically
};
const HomeDirect = () => {
  const { role } = useSelector((state) => state.user);
  console.log(role);
  return (
    <div>
      {role === "admin" && (
        <>
          <AccountAvatar sx={containerStyles} /> <Admin />
        </>
      )}
      {role === "doctor" && (
        <>
          {" "}
          <AccountAvatar sx={containerStyles} />
          <DocHome />
        </>
      )}
      {role === "patient" && (
        <>
          <AccountAvatar sx={containerStyles} />
          <PaHomePage />
        </>
      )}
    </div>
  );
};

export default HomeDirect;
