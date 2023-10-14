import React from 'react'
import { useState } from 'react'
import {TextField, Select, MenuItem, Checkbox, Typography, Divider} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchPatientList } from '../../features/doctorSlice'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function DocPatients() {
    const [nameFilter, setNameFilter] = useState('')
    const [dateFilter, setDateFilter] = useState('')
    const [statusFilter,setStatusFilter] = useState('Any')
    const [upcomingFilter,setUpcomingFilter] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPatientList());
    },[dispatch])

    const { patientsList } = useSelector((state) => state.doctor);


  return (
    <div style={{ display: 'flex', height: '100%', flexDirection:'row'}}>
        <div style={{display:'flex', flexDirection: 'column', zIndex: '30', gap: '30px', boxSizing: 'border-box', padding: '5px', backgroundColor: 'white', height: '100vh', boxShadow: '5px 5px 5px rgba(0,0,0,0.3)'}}>
            <TextField value={nameFilter} onChange={(event) => {setNameFilter(event.target.value)}} label='Name Filter' />
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
            <Typography>
                    Date Filter
                </Typography>
                <input type='date' value={dateFilter} onChange={(event) => {setDateFilter(event.target.value); console.log(dateFilter)}} />
                <span onClick={() => {setDateFilter('')}}>
                    <Typography >
                        Cancel
                    </Typography>
                </span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
            <Typography>
                    Status Filter
                </Typography>
            <Select
                value={statusFilter}
                label="Status Filter"
                onChange={(event) => {  setStatusFilter(event.target.value); }}
            >
                <MenuItem value={'Any'}>Any</MenuItem>
                <MenuItem value={'Appointment'}>Appointment</MenuItem>
                <MenuItem value={'Follow Up'}>Follow Up</MenuItem>
            </Select>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                <Typography>
                    Upcoming Appointments
                </Typography>
                <Checkbox value={upcomingFilter} onChange={(event) => {setUpcomingFilter(event.target.checked)}}/>
            </div>
        </div>
        <div style={{backgroundColor:'white',  display: 'flex', flexDirection: 'column'}}>
            {patientsList
            .filter((patient) =>{
                return nameFilter === '' || patient.name.toLowerCase().includes(nameFilter.toLowerCase())
            })
            .filter((patient) =>{
                return dateFilter === '' || patient.appointmentDate === dateFilter
            })
            .filter((patient) =>{
                return statusFilter === 'Any' || patient.status === statusFilter
            })
            .filter((patient) =>{
                return upcomingFilter === false || (new Date(patient.appointmentDate) - new Date > 0)
            })
            .map((patient) => {
                return (
                    <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{patient.name}</Typography>
                        <div style={{marginLeft: 'auto'}}></div>
                        <Typography>{patient.status}</Typography>
                        <Typography sx={{marginLeft: '10px'}}>{patient.appointmentDate}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                        <div style={{ display:'flex', flexDirection: 'row'}}>
                            <Typography sx={{width: '300px'}}>Patient Name: </Typography>
                            <Typography >{patient.name} </Typography>
                        </div>
                        <Divider/>
                        <div style={{ display:'flex', flexDirection: 'row'}}>
                            <Typography sx={{width: '300px'}}>Appointment Status: </Typography>
                            <Typography >{patient.status} </Typography>
                        </div>
                        <Divider/>
                        <div style={{ display:'flex', flexDirection: 'row'}}>
                            <Typography sx={{width: '300px'}}>Appointment Date: </Typography>
                            <Typography >{patient.appointmentDate} </Typography>
                        </div>
                    </AccordionDetails>
                    </Accordion>
                )
            })}
        </div>


    </div>
  )
}
