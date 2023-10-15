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
import { MenuItem, Select } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import viewPrescriptions from "../../features/patientSlice";
import { useDispatch, useSelector } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Link } from "react-router-dom";
import { viewAppoints } from "../../features/patientSlice";
import { useEffect, useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
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
          <Box sx={dateTimePickerContainer}>
          
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Appointment start date Schedule"
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                  value={date} // Add this line
                  onChange={(date) => setDate(date)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <span
                onClick={() => {
                  setDate("");
                }}
              >
                <Typography sx={{color:"black"}}>Cancel</Typography>
              </span>
          </Box>

          <Select
          sx={{color:"white",ml:'20px',bg:"white"}}
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

const dateTimePickerContainer = {
  display: "flex",
  alignItems: "right",
  borderRadius: "4px",
  padding: "8px",
  color:'white',
  backgroundColor:'white'
};
