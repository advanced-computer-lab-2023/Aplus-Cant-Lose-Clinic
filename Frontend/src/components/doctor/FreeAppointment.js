import * as React from 'react';
import axios from 'axios';
import { useState } from "react";
import { useParams } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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
import { useDispatch, useSelector } from "react-redux";

function FreeAppointment() {
    const [open, setOpen] = React.useState(false);
    const [endDate, setEndDate] = useState("");
    const { id, role } = useSelector((state) => state.user);
    const [startDate, setStartDate] = useState("");
    var closes=false;
    async function addFreeTimeSlots() {
        try {
            const response = await axios.post(`http://localhost:8000/api/doctor/addAppointmentSlot/${id}`, {
                startDate,
                endDate
            });
            console.log(response);
        } catch (error) {
            console.error("Error posting free slots", error);
        }
    }
    
    const handleClose = () => {
        if (closes) {
            closes = false;
            setOpen(false);
            addFreeTimeSlots();
        } else {
            if (endDate === "" || startDate === "") {
                alert("Choose dates");
            } else {
                setOpen(false);
                addFreeTimeSlots();
            }
        }
    }
    

    const handleClickOpen = () => {
        setOpen(true);
    };
    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add free Appointment SLots
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Free Time Slot</DialogTitle>
                <DialogContent>
                    <Typography>Start Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                            components={["DateTimePicker", "DateTimePicker"]}
                        >
                            <DateTimePicker
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
                                viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                }}
                                value={endDate} // Add this line
                                onChange={(date) => setEndDate(date)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <span
                        onClick={() => {
                            setEndDate("");
                        }}
                    ></span>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose }>Add</Button>
                    <Button onClick={closes=true && handleClose}>cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default FreeAppointment;
