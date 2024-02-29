import React from 'react';
import { Outlet } from 'react-router-dom';
const Start = ({ children }) => {
  return (
    <>
        <Outlet/>
    </>
  );
}

export default Start;
