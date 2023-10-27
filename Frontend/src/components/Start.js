import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useSelector,useDispatch } from 'react-redux'
const Start = ({ children }) => {
  const user= useSelector((state) => state.user)
  console.log(user);

  return (
    <div>
      <Navbar/>
    
      <Outlet />
    </div>
  );
}

export default Start;
