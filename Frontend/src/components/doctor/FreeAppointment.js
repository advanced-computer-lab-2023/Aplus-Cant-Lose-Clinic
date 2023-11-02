import * as React from 'react';
import { useState } from "react";
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
function FreeAppointment() {
    const [open, setOpen] = React.useState(false);
    const [endDate, setEndDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

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
                    <Button onClick={handleClose}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default FreeAppointment;
