import React from "react";
// import DataGridDemo from "./container/SearchListOfDoctors";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import {IconButton
} from "@mui/material";
//import * as React from 'react';
//import { DataGridPro } from '@mui/x-data-grid-pro';
//import { useDemoData } from '@mui/x-data-grid-generator';
import { Link } from 'react-router-dom';
//import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
//import HomeIcon from "@mui/icons-material/Home";
//import Button from "@mui/material/Button";
//import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
//import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
//import VaccinesIcon from '@mui/icons-material/Vaccines';

import Stack from "@mui/material/Stack";
import { lightBlue } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "image",
    headerName: "image",
    width: 550,
    height: 550,
    renderCell: (params) => <img src={params.value} />,
  },
  { field: "id", headerName: "ID", type: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: false,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: false,
  },

  {
    field: "specality",
    headerName: "Specality",
    width: 150,
    editable: false,
  },

  {
    field: "appointmentPrice",
    headerName: "Price (in EGP)",
    type: "number",
    width: 110,
    editable: false,
  },
  {
    field: "dateAndTimeAvailable",
    headerName: "Date and time available",

    width: 160,
    editable: false,
  },
  //{
  // field: 'fullName',
  //  headerName: 'Full name',
  //  description: 'This column has a value getter and is not sortable.',
  //  sortable: false,
  //  width: 160,
  //  valueGetter: (params) =>
  //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

const rows = [
  {
    image:
      "https://image.shutterstock.com/image-photo/small-juicy-hamburger-canapes-on-260nw-570368917.jpg",
    id: 1,
    firstName: "Jon",
    lastName: "Snow",
    specality: "ear",
    appointmentPrice: 35,
    dateAndTimeAvailable: "4/5/2023 , 4:00 pm",
  },
  {
    image:
      "https://image.shutterstock.com/image-photo/small-juicy-hamburger-canapes-on-260nw-570368917.jpg",
    id: 2,
    firstName: "Tim",
    lastName: "Car",
    specality: "eye",
    appointmentPrice: 40,
    dateAndTimeAvailable: "10/5/2023 , 3:00 pm",
  },
];


const iconStyle = {
  color: "white", // Set the icon color to white
};
const filterStyle = {
  marginLeft: "50px", // Set the icon color to white
};

const Search = styled("div")(({ theme }) => ({
  display: "flex", // Add this to make the search fields horizontally centered
  alignItems: "center", // Vertically center the items
  marginLeft: "auto", // Push the search fields to the right
  border: "0",
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
  justifySelf: "center",
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
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

const dateTimePickerContainer = {
  display: "flex",
  alignItems: "center",
  borderRadius: "4px",
  padding: "8px",
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(lightBlue[50]),
  backgroundColor: lightBlue[50],
  "&:hover": {
    backgroundColor: lightBlue[50],
  },
}));
//backgroundColorcolor="#004E98"

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center" spacing={2} sx={{placeItems :'flex-end'}}>
            <Link to='/'>
              <Button Speciality="large">
                <IconButton>
                  <HomeIcon style={iconStyle} />
                </IconButton>
              </Button>
            </Link>
            <Grid item>
              <Typography variant="h5">Doctors list</Typography>
            </Grid>
            <Stack spacing={2} direction="row">
              <Typography variant="title" color="inherit" noWrap>
                &nbsp;
              </Typography>

            </Stack>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid item>
        <Grid item>
          <Typography variant="h5">Filter by date and time: </Typography>
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
            <div style={dateTimePickerContainer}>
              <DateTimePicker
                label="Next free appointment time"
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
              />
            </div>
            <Typography variant="h5">To filter/search a Column click on it's name then the 3 dots then press filter: </Typography>
          </DemoContainer>
        </LocalizationProvider>
      </Grid>

      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      <Link to='/Homepage/DoctorsList/Doctordetails'>
      <Button variant="contained">Select</Button>
      </Link>
    </div>
  );
}

export default App;
