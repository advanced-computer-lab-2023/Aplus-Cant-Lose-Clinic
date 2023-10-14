import React from "react";
import {
    AppBar, Box, Toolbar, Button, IconButton, InputBase, styled, Typography, Checkbox,
    FormControlLabel, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { Link } from 'react-router-dom';

const App = () => {
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
        border: '0',

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

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#004E98' }}>
                <Toolbar>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                            <Link to='/Home'>
                                <Button Speciality="large">
                                    <IconButton>
                                        <HomeIcon style={iconStyle} />
                                    </IconButton>
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">My Prescriptions</Typography>
                        </Grid>
                        <Grid item style={filterStyle}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="default"
                                    />
                                }
                                label="Filled"
                            />
                        </Grid>
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                                    <div style={dateTimePickerContainer}>
                                        <DateTimePicker
                                            label="Prescription Issued In"
                                            viewRenderers={{
                                                hours: renderTimeViewClock,
                                                minutes: renderTimeViewClock,
                                                seconds: renderTimeViewClock,
                                            }}
                                        />
                                    </div>
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Doctor's Name"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </Grid>
                        <Grid item>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Doctor's Speciality"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Paper sx={{ width: '60%', marginTop: '40px', marginLeft: '20%', boxShadow: "5px 5px 5px 5px #8585854a", }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" >Filled</TableCell>
                                <TableCell align="left" >Date</TableCell>
                                <TableCell align="left" >DoctorName</TableCell>
                                <TableCell align="left" >Speciality</TableCell>
                                <TableCell align="left" >View</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow hover role="checkbox" tabIndex={-1} >
                                <TableCell align="left" >{true === true ? <FormControlLabel disabled control={<Checkbox defaultChecked />} label="Disabled" />
                                    : <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                                }
                                </TableCell>
                                <TableCell align="left" >10/10/2003</TableCell>
                                <TableCell align="left" >Dr.Ahmed</TableCell>
                                <TableCell align="left" >Dentistry</TableCell>
                                <TableCell align="left" >
                                    <Link to='/ListOfPrescriptions/Prescriptions'>
                                        <IconButton><VaccinesIcon /></IconButton>
                                    </Link></TableCell>
                            </TableRow>
                            <TableRow hover role="checkbox" tabIndex={-1} >
                                <TableCell align="left" >{false === true ? <FormControlLabel disabled control={<Checkbox defaultChecked />} label="Disabled" />
                                    : <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                                }
                                </TableCell>
                                <TableCell align="left" >9/11/2023</TableCell>
                                <TableCell align="left" >Dr.Maged</TableCell>
                                <TableCell align="left" >Ear,Nose,and Throat</TableCell>
                                <TableCell align="left" >
                                    <Link to='/ListOfPrescriptions/Prescriptions'>
                                        <IconButton><VaccinesIcon /></IconButton>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>
        </Box>

    );
};

export default App;
