import React from 'react'
import { useSelector } from 'react-redux'
import DocProfile from './components/doctor/DocProfile';
import {useNavigate} from 'react-router-dom';
export default function ProfileDirect() {
  const navigate=useNavigate();
    const { role } = useSelector((state) => state.user);

  return (
    <div>
        {role === "doctor"?  <DocProfile/>:navigate("/Login")}
    </div>
  )
}
