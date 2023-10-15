import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { appointmentPatients } from '../../features/doctorSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function Appointments() {
  const id = useSelector((state) => state.user.id); // Access the counter value from the Redux store
  const navigate=useNavigate();
const dispatch= useDispatch();
useEffect(() => {
  dispatch(appointmentPatients(id));
}, [dispatch]);
const res = useSelector((state) => state.doctor.appointments);

  const [appointments, setAppointments] = useState(res);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('uncompleted');
  const [customDate, setCustomDate] = useState('');

  const handleCheckboxChange = (appointmentId, isChecked) => {
  
    const updatedAppointments = appointments.map((appointment) =>
      appointment._id === appointmentId ? { ...appointment, status: isChecked } : appointment
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
      <i>
            <IconButton
              color="primary"
              aria-label="Back to Home"
              style={{ position: 'absolute', bottom: '10px', right: '10px' }}
              onClick={() => {
                navigate(-1);
              }}
            >
              <HomeIcon />
            </IconButton>
          </i>
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
          
            <MenuItem value="completed">completed</MenuItem>
            <MenuItem value="uncompleted">uncompleted</MenuItem>

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
                <TableRow key={appointment._id}>
                  <TableCell>
                
                  </TableCell>
                  <TableCell>{appointment.startDate}</TableCell>
                  <TableCell>{appointment.pID.name}</TableCell>
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

      </Paper>

    </div>
  );
}

export default Appointments;
