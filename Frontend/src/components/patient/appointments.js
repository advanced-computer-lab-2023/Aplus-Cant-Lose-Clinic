import React from "react";
import AppBar from "@mui/material/AppBar";
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

const Dates = ['wednesday 10/10/2010 5:5:4', 'thursday'];

  const handleClickOpen = () => {
    setOpen(true);
};

const handleClose = () => {
  if(pID!=""){

    setOpen(false);
  }else{
    alert('enter Patient ID');
  }

};
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
            <MenuItem value={"uncompleted"}>uncompleted</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
      <BasicTable status={status} date={date} />
      <Fab color="primary" aria-label="add" sx={{ left: "95%", margin: "28% 0 0 0" }}
      onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add An Appointment</DialogTitle>
                <DialogContent>
                    <Typography>Date & TIme</Typography>
                    {Dates.map((date) => (
                        <ListItem disableGutters key={date}>
                            <ListItemButton >
                                <ListItemText primary={date} />
                            </ListItemButton>
                        </ListItem>
                    ))}

                    <span style={{padding:"10px"}}>
                      <Typography>PatientID</Typography>
                        <TextField onChange={(pId) => setPID(pId)}
> </TextField>
                    </span>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Add</Button>
                </DialogActions>
            </Dialog>
        
    </Box>
  );
}
const events = ["completed", "uncompleted", "Any"];

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

