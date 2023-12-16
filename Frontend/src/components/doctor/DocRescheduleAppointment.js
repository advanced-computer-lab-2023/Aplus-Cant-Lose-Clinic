import * as React from 'react';
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import {
    Typography
} from "@mui/material";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { API_URL } from "../../Consts.js";

function RescheduleAppointment({  appointmentID }) {
    const [open, setOpen] = React.useState(false);
    const [endDate, setEndDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const { id, role } = useSelector((state) => state.user);
    const [patients, setPatients] = useState([]);
    const [currentpatient, setCurrentPatient] = useState("");
    var closes = false;

    const getPatientList = async () => {
        try {
            const response = await axios.get(`${API_URL}/doctor/patientsInUpcomingApointments/${id}`);
            const patientsdata = response.data.patients;
            setPatients(patientsdata);
        } catch (error) {
            console.error("Error fetching patient list:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
            }
        }
    };

    // Example code in DocRescheduleAppointment.js
    async function rescheduleAppointment() {
        try {
            const appointmentId = appointmentID;
            
           
            console.log("Attempting to reschedule appointment:", appointmentId,  startDate, endDate);
            if (appointmentId ) {
                const response = await axios.put(
                    `${API_URL}/doctor/rescheduleAppointment/${appointmentId}`, // Use appointmentID directly
                    {
                        startDate,
                        endDate
                    }
                );
                console.log("Response:", response.data);
                // You can handle the response here, e.g., show a success message
            } else {
                console.error("Invalid appointmentId ");
            }
        } catch (error) {
            console.error("Error rescheduling appointment", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
            }
        }
    }
    

    

    const handleClickOpen = async () => {
        setOpen(true);
       // await getPatientList();
      
        // Retrieve appointmentId from the prop or any other source
        // For example, if appointmentId is part of the appointment object passed as prop
        // const appointmentId = appointment._id; // Make sure to pass the correct prop
        // console.log(appointmentId);

        // You can set the appointmentId in the state or use it directly in the rescheduleAppointment function
    };
    const handleClose = () => {
        if (closes) {
            closes = false;
            setOpen(false);
            rescheduleAppointment(); // Change the function call to rescheduleAppointment
        } else {
            if (endDate === "" || startDate === "") {
                alert("Choose dates");
            } else {
                setOpen(false);
                rescheduleAppointment(); // Change the function call to rescheduleAppointment
            }
        }
        window.location.reload();

    };
    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
            Reschedule Appointment
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Reschedule Appointment</DialogTitle>
                <DialogContent>
                    <Typography>Start Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                            components={["DateTimePicker", "DateTimePicker"]}
                        >
                            <DateTimePicker
                                label="Start time"
                                viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                }}
                                value={startDate} // Add this line
                                onChange={(date) => setStartDate(date)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <span
                        onClick={() => {
                            setStartDate("");
                        }}
                    ></span>
                    <Typography>End Date </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                            components={["DateTimePicker", "DateTimePicker"]}
                        >
                            <DateTimePicker
                                label="End time"
                                viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                }}
                                value={endDate}
                                onChange={(date) => setEndDate(date)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <span
                        onClick={() => {
                            setEndDate("");
                        }}
                    ></span>
                    {patients.map((patient) => (
                        <ListItem disableGutters key={patient}>
                            <ListItemButton onClick={() => setCurrentPatient(patient._id)}>
                                {console.log(patients)}
                                <ListItemText primary={patient?.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Reschedule</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default RescheduleAppointment;
