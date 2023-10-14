import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HomeIcon from '@mui/icons-material/Home'; // Import the Home icon
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';

function Appointments() {
  const [appointments, setAppointments] = useState([
    { id: 1, finished: false, date: '2023-10-10', patient: 'John Doe', status: 'Upcoming' },
    { id: 2, finished: true, date: '2023-10-12', patient: 'Jane Smith', status: 'Completed' },
    { id: 3, finished: false, date: '2023-10-15', patient: 'Bob Johnson', status: 'Upcoming' },
    { id: 4, finished: false, date: '2023-10-20', patient: 'Alice Johnson', status: 'Cancelled' },
    { id: 5, finished: true, date: '2023-10-22', patient: 'Eva Brown', status: 'Completed' },
  ]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('Status');
  const [customDate, setCustomDate] = useState('');

  const handleCheckboxChange = (appointmentId, isChecked) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === appointmentId ? { ...appointment, finished: isChecked } : appointment
    );
    setAppointments(updatedAppointments);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleCustomDateChange = (event) => {
    setCustomDate(event.target.value);
  };

  const handleFilterClick = () => {
    // Filter appointments based on selectedDate and selectedStatus
    const filteredAppointments = appointments.filter((appointment) => {
      const isDateMatch =
        !selectedDate || appointment.date === selectedDate.toISOString().split('T')[0];
      const isStatusMatch = selectedStatus === 'Status' || appointment.status === selectedStatus;
      return isDateMatch && isStatusMatch;
    });

    // Filter by custom date input
    const customDateFilteredAppointments = customDate
      ? filteredAppointments.filter((appointment) => appointment.date === customDate)
      : filteredAppointments;

    // Set the filtered appointments to display
    setAppointments(customDateFilteredAppointments);
  };

  return (
    <div>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <h2>Appointments</h2>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newDate) => handleDateChange(newDate)}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
              )}
              inputFormat="yyyy-MM-dd"
              inputProps={{ endAdornment: <CalendarTodayIcon /> }}
            />
          </LocalizationProvider>

          <Select
            label="Status"
            value={selectedStatus}
            onChange={handleStatusChange}
            variant="outlined"
            style={{ marginLeft: '20px' }}
          >
            <MenuItem value="Status">Status</MenuItem>
            <MenuItem value="Upcoming">Upcoming</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
            <MenuItem value="Rescheduled">Rescheduled</MenuItem>
          </Select>

          <TextField
            label="Custom Date"
            variant="outlined"
            value={customDate}
            onChange={handleCustomDateChange}
            style={{ marginLeft: '20px' }}
            inputProps={{ type: 'date' }}
          />

          <IconButton onClick={handleFilterClick} color="primary">
            <FilterListIcon />
          </IconButton>
        </div>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Finished</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Patient</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <Checkbox
                      checked={appointment.finished}
                      onChange={(e) => handleCheckboxChange(appointment.id, e.target.checked)}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.patient}</TableCell>
                  <TableCell>{appointment.status}</TableCell>
                  <TableCell>
                    {/* Use Link to navigate to the patient details page */}
                    <Link to={"/myappointments/patientdetails"}>
                      <Button variant="outlined" color="primary">
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <IconButton
          color="primary"
          aria-label="Back to Home"
          style={{ position: 'absolute', bottom: '10px', right: '10px' }}
        >
          <Link to="/Home"> {/* Use Link to navigate back to the home page */}
            <HomeIcon />
          </Link>
        </IconButton>
      </Paper>
    </div>
  );
}

export default Appointments;
