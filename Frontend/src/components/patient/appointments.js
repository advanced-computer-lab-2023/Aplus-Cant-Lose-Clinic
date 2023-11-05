import React from "react";
import { useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import axios from "axios";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { MenuItem, Select, TextField } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { useDispatch, useSelector } from "react-redux";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { viewAppoints } from "../../features/patientSlice";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
function BasicTable({ status, date }) {
  const tableContainerStyle = {
    maxWidth: "80%", // Adjust the maximum width as needed
    margin: "0 auto", // Center-align the table horizontally
    marginTop: "20px",
    boxShadow: "5px 5px 5px 5px #8585854a",
  };
  const dispatch = useDispatch();
  const pId = useSelector((state) => state.user.id);
  const rows = useSelector((state) => state.patient.appoints);

  useEffect(() => {
    dispatch(viewAppoints(pId));
  }, [dispatch]);
  return (
    <TableContainer component={Paper} style={tableContainerStyle}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Doctor Name </TableCell>
            <TableCell align="left">Doctor Speciality</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Status </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log(rows)}
          {rows
            .filter((row) => {
              return status === "Any" || status === row.status;
            })
            .filter((row) => {
              return (
                date === "" || new Date(row.startDate) >= new Date(date)
              );
            })
            .map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.drID.name}
                </TableCell>
                <TableCell align="left">{row.drID.speciality}</TableCell>
                <TableCell align="left">
                  {row.startDate &&
                    new Date(row.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="left">{row.status}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default function SearchAppBar() {
  const [status, setStatus] = useState("Any");
  const [date, setDate] = useState("");
  const [open, setOpen] = React.useState(false);
  const [pID, setPID] = React.useState("");
  const [Appointments, setAppointments] = useState([]);
  var noappoints = false;

  const { doctorId } = useParams();
  console.log(doctorId)

  const getAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/patient/freeAppiontmentSlot/${doctorId}`);
      const appointmentsData = response.data.Appointmentss;
      setAppointments(appointmentsData);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
    getAppointments();
  };

  const handleClose = () => {
    if (!noappoints) {

      if (pID != "") {

        setOpen(false);
      } else {
        alert('enter Patient ID');
      }
    } else {
      setOpen(false);
    }

  };
  function formatDateTimeToEnglish(dateTimeString) {
    const date = new Date(dateTimeString);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const dateFormatter = new Intl.DateTimeFormat('en-US', options);
    return dateFormatter.format(date);
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#004E98" }}>
        <Toolbar>
          <Link to="/Home" style={{ color: "white" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Appointments
          </Typography>
          <Box >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]} >
                <DateTimePicker
                  sx={{ color: "white" }}
                  label="Appointment start date Schedule"
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                  value={date}
                  onChange={(date) => setDate(date)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <span
              onClick={() => {
                setDate("");
              }}

            >
              <Typography>Cancel</Typography>
            </span>
          </Box>

          <Select
            sx={{ color: "white", ml: '20px', bg: "white" }}
            value={status}
            label="Status Filter"
            onChange={(event) => {
              setStatus(event.target.value);
            }}
          >
            <MenuItem value={"Any"}>Any</MenuItem>
            <MenuItem value={"completed"}>completed</MenuItem>
            <MenuItem value="upcoming">upcoming</MenuItem>
            <MenuItem value="cancelled">cancelled</MenuItem>
            <MenuItem value="rescheduled">rescheduled</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
      <BasicTable status={status} date={date} />
      <Fab color="primary" aria-label="add" sx={{ left: "95%", margin: "28% 0 0 0" }}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose} PaperProps={{ style: noappoints ? { backgroundColor: '#004e98' } : { backgroundColor: 'white' } }}>
        {Appointments.length === 0 ? noappoints = true && (
          <div style={{ padding: "10px", color: "white", background: "#004e98" }}>
            <h1>There is no Available Appointments</h1>
          </div>
        ) : (
          <>
            <DialogTitle>Add An Appointment</DialogTitle>
            <DialogContent>
              <Typography>Date & Time</Typography>
              {Appointments.map((appointment) => (
                <ListItem disableGutters key={appointment._id}>
                  <ListItemButton>
                    <ListItemText primary={formatDateTimeToEnglish(appointment.startDate)} />
                  </ListItemButton>
                </ListItem>
              ))}
              <div style={{ padding: "10px" }}>
                <Typography>PatientID</Typography>
                <TextField onChange={(pId) => setPID(pId)} />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Add</Button>
              <Button onClick={noappoints = true &&handleClose}>Cancel</Button>
            </DialogActions>
          </>
        )}
      </Dialog>


    </Box>
  );
}

// const Status = [
//   {
//     value: "Completed",
//     label: "Completed"
//   },
//   {
//     value:"Cancelled",
//     label:"Cancelled"
//   },
//   {
//   value:"Rescheduled",
//   label:"Rescheduled"
//   },
//   {
//     value:"Upcoming",
//     label:"Upcoming"
//   }
// ];

// function SelectTextFields() {
//   return (
//     <Box
//       component="form"
//       sx={{
//         '& .MuiTextField-root': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <div>
//         <TextField
//           id="outlined-select-status"
//           select
//           label="Select"
//           helperText="Status"
//         >
//           {Status.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.label}
//             </MenuItem>
//           ))}
//         </TextField>
//       </div>
//     </Box>
//   );
// }

// function NativeSelectDemo() {
//   return (
//     <Box sx={{ minWidth: 120 }}>
//       <FormControl fullWidth>
//         <InputLabel variant="standard" htmlFor="uncontrolled-native">
//           Status
//         </InputLabel>
//         <NativeSelect
//           inputProps={{
//             name: 'Status',
//             id: 'uncontrolled-native',
//           }}
//         >
//           <option value={"Completed"}>Completed</option>
//           <option value={"Cancelled"}>Cancelled</option>
//           <option value={"Rescheduled"}>Rescheduled</option>
//           <option value={"Upcoming"}>Upcoming</option>

//         </NativeSelect>
//       </FormControl>
//     </Box>
//   );
// }

// const dateTimePickerContainer = {
//   display: "flex",
//   alignItems: "right",
//   borderRadius: "4px",
//   padding: "8px",
//   color:'white',
// };

