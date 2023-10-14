import { Button } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function Navbar() {
    const navigate = useNavigate()
    const {role } = useSelector((state) => state.user)

  return (
    <div style={{ height: '60px', backgroundColor: '#4477aa', gap: '3px', boxSizing: 'border-box', boxShadow: '2px 2px 30px rgba(0,0,0,0.4)', padding: '4px', display: 'flex', width: '100%'}}>
        <div style={{marginLeft: 'auto'}}></div>
        {
          role === '' &&
          <>
                  <Button onClick={() => {navigate('/RegisterAs')}} sx={{width: '110px', display: 'flex', boxShadow: '2px 2px 30px rgba(0,0,0,0.4)', justifyContent: 'center', height: '85%', color: 'white', backgroundColor: '#1266aa'}}>Register</Button>
        <Button onClick={() => {navigate('/Login')}} sx={{width: '110px', display: 'flex', boxShadow: '2px 2px 30px rgba(0,0,0,0.4)', justifyContent: 'center', height: '85%', color: 'white', backgroundColor: '#1266aa'}}>Login</Button>
          </>
        }
        {role === 'doctor' &&
        <>
        <Button onClick={() => {navigate('/DocPatients')}} sx={{width: '110px', display: 'flex', boxShadow: '2px 2px 30px rgba(0,0,0,0.4)', justifyContent: 'center', height: '85%', color: 'white', backgroundColor: '#1266aa'}}>Patients</Button>
        </>}
        {role !== '' &&
        <>
        <Button onClick={() => {navigate('/Profile')}} sx={{width: '110px', display: 'flex', boxShadow: '2px 2px 30px rgba(0,0,0,0.4)', justifyContent: 'center', height: '85%', color: 'white', backgroundColor: '#1266aa'}}>Profile</Button>
        <Button onClick={() => {navigate('/Logout')}} sx={{width: '110px', display: 'flex', boxShadow: '2px 2px 30px rgba(0,0,0,0.4)', justifyContent: 'center', height: '85%', color: 'white', backgroundColor: '#1266aa'}}>Logout</Button>
        <Button onClick={() => {navigate('/PatientsList')}} sx={{width: '110px', display: 'flex', boxShadow: '2px 2px 30px rgba(0,0,0,0.4)', justifyContent: 'center', height: '85%', color: 'white', backgroundColor: '#1266aa'}}>patients List</Button>
        </>}


    </div>
  )
}
