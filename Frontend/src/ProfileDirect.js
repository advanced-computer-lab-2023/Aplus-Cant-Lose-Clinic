import React from 'react'
import { useSelector } from 'react-redux'
import DocProfile from './components/doctor/DocProfile';

export default function ProfileDirect() {
    const { role } = useSelector((state) => state.user);

  return (
    <div>
        {role === "doctor" && <DocProfile/>}
    </div>
  )
}
