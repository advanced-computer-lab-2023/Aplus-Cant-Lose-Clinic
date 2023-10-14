import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from "@mui/icons-material/Home";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import viewPrescriptions from '../../features/patientSlice';
import { useDispatch,useSelector } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Link } from 'react-router-dom';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
function BasicTable() {
  const tableContainerStyle = {
    maxWidth: '80%', // Adjust the maximum width as needed
    margin: '0 auto', // Center-align the table horizontally
    marginTop: '20px',
    boxShadow: "5px 5px 5px 5px #8585854a",

  };
  
  return (
    <TableContainer component={Paper} style={tableContainerStyle}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Doctor Name </TableCell>
            <TableCell align="left">Doctor Speciality</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Status </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <TableRow key={row.DoctorName} >
              <TableCell component="th" scope="row">
                {row.DoctorName}
              </TableCell>
              <TableCell align="left">{row.DoctorSpeciality}</TableCell>
              <TableCell align="left">
                {row.Date.toLocaleDateString()}
              </TableCell>
              <TableCell align="left">{row.Status}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default function SearchAppBar() {
  const dispatch=useDispatch();
  const rows=useSelector((state) => state.patient.appoint);

// useEffect(() => {
//   dispatch()

// }, []);



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"  sx={{ backgroundColor: '#004E98' }}>
        <Toolbar>
          <Link to="/Home" style={{color :'white'}}>
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
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Appointments
          </Typography>
          <DateTimePickerContainer 
            marginright="100px"
          />
          <Autocomplete 
      disablePortal
      id="combo-box-demo"
      options={events}
      sx={{ width: 300 ,marginTop:'8px' }}
      renderInput={(params) => <TextField {...params} label="Events" />}
      />
        </Toolbar>
      </AppBar>
      <BasicTable />
    </Box>
  );
}
const events=['Cancelled','Coming','Done','Pending']


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
};

function DateTimePickerContainer() {
  return (
    <Box sx={dateTimePickerContainer}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
          <DateTimePicker
            label="Appointment Schedule"
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}