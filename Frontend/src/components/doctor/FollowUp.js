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
function FollowUp() {
    const [open, setOpen] = React.useState(false);
    const [endDate, setEndDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const { id, role } = useSelector((state) => state.user);
    const [patients, setPatients] = useState([]);
    const [currentpatient, setCurrentPatient] = useState("");
    var closes = false;
       //to get list of doctors patients so he can choose the name of the patient he want to schedule follow up with
    const getPatientList = async () => {
        try {
            const response = await axios.get(`${API_URL}/doctor/patientsInUpcomingApointments/${id}`);
            const patientsdata = response.data.patients;
            setPatients(patientsdata);
        } catch (error) {
            console.error("Error fetching patientlist", error);
        }
    }
    //that is the function that addes the follow up slot for selected patient
    async function addFollowUp() {
        try {
            console.log(currentpatient);

            const response = await axios.post( `${API_URL}/doctor/createFollowUpAppointment/${id}?patientID=${currentpatient}`, {
                startDate,
                endDate
            });
            console.log(response);
        } catch (error) {
            console.error("Error posting free slots", error);
        }
    }
    const handleClickOpen = async () => {
        setOpen(true);
        await getPatientList();
    };

    const handleClose = () => {
        if (closes) {
            closes = false;
            setOpen(false);
            addFollowUp();
        } else {
            if (endDate === "" || startDate === "") {
                alert("Choose dates");
            } else {
                setOpen(false);
                addFollowUp();
            }
        }
    };
    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Create a Follow up appointment
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Follow up Appointment</DialogTitle>
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
                    <Button onClick={handleClose}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default FollowUp;
