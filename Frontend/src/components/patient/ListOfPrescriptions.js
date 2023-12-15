import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  InputBase,
  styled,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import {useNavigate}  from "react-router-dom";
import AccountAvatar from "../Authentication/AccountAvatar";
// ...
import {
  viewPrescriptions,
  viewPrescription,
} from "../../features/patientSlice";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const App = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [specialityFilter, setSpecialityFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isFilled, setIsFilled] = useState(false);

  const patientId = useSelector((state) => state.user.id);
  const role = useSelector((state) => state.user.role);

  const rows = useSelector((state) => state.patient.presc);

  const iconStyle = {
    color: "white",
  };
  const filterStyle = {
    marginLeft: "40%",
  };

  const Search = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    border: "0",
  }));



  const dateTimePickerContainer = {
    display: "flex",
    alignItems: "center",
    borderRadius: "4px",
    padding: "8px",
  };

  const Info = {
    margin: "20px 20px",
    alignItems: "baseline",
  };

  const [prescriptionid, setPrescriptionid] = useState(null);

  useEffect(() => {
    dispatch(viewPrescriptions(patientId));
  }, [dispatch, patientId]);

  const handleView = (id) => {
    setPrescriptionid(rows.find((row) => row._id === id));
  };

  return (
    role==="patient" ?(
    <Box sx={{ flexGrow: 1 }}>
          <div>
        <AccountAvatar />
      </div>
      <Dialog
        open={Boolean(prescriptionid)}
        sx={{ width: "100%", height: "100%" }}
      >
        {prescriptionid && prescriptionid.patientID ? (
          <Paper
            sx={{
              width: "60%",
              marginTop: "40px",
              marginLeft: "20%",
              boxShadow: "5px 5px 5px 5px #8585854a",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box style={Info}>
                  <Typography sx={{ fontSize: "16px" }}>
                    <strong>Date : </strong>
                    {prescriptionid?.datePrescribed}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <img
                  src="/virtualclinic.png"
                  alt="virtualclinic"
                  width={"200px"}
                  sx={{ marginBottom: "50px" }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ margin: "20px 20px 0px 80px" }}>
                  <Typography sx={{ fontSize: "16px" }}>
                    {prescriptionid.doctorID?.name}
                  </Typography>
                  <Typography sx={{ fontSize: "16px" }}>
                    {prescriptionid.doctorID?.speciality}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ margin: "20px 20px 0px 80px" }}>
                <Typography sx={{ fontSize: "16px" }}>
                  Medicine Name :{prescriptionid.medID?.name}
                </Typography>
                <Typography sx={{ fontSize: "16px" }}>
                  Medicine Active elements:
                  {prescriptionid.medID?.activeElement}
                </Typography>
                <Typography sx={{ fontSize: "16px" }}>
                  Medicine Used for :{prescriptionid.medID?.use}
                </Typography>
                <Typography sx={{ fontSize: "16px" }}>
                  Medicine Frequency :{prescriptionid.dosage}
                </Typography>
              </Box>
            </Grid>
            <Paper
              sx={{
                width: "100px",
                marginTop: "40px",
                marginLeft: "40%",
                boxShadow: "none",
                display: "flex",
              }}
            >
              {prescriptionid.status=="filled" ? (
                <img
                  src="/Pharmacy Stamp.png"
                  alt="hospital stamp"
                  width={"100px"}
                />
              ) : (
                ""
              )}
              <Link to={"/Home"}>
                <Button
                  sx={{
                    margin: "10px 0px 0px 50px",
                    justifyItems: "center",
                    color: "black",
                    border: "black",
                  }}
                >
                  <IconButton sx={{ paddingLeft: "0px" }}>
                    <ArrowBackIosIcon />
                  </IconButton>
                  Back
                </Button>
              </Link>
            </Paper>
          </Paper>
        ) : null}
      </Dialog>
      <AppBar position="static" sx={{ backgroundColor: "#004E98" }}>
        <Toolbar>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Link to="/Home">
                <Button variant="large">
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
            <Checkbox
            label="Filled"
            sx={{color:"black"}}
            value={isFilled}
            onChange={(event) => {
              setIsFilled(event.target.checked);
            }}
          />
          <Typography>filled</Typography>
            </Grid>
            <Grid item sx={{display:"inline-flex"}}> 
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DateTimePicker", "DateTimePicker"]}
                >
                  <div>
                    <DateTimePicker
                      label="Prescription Issued In"
                      viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                        seconds: renderTimeViewClock,
                      }}
                      value={selectedDate} // Add this line
                      onChange={(date) => setSelectedDate(date)}
                    />
                  </div>
                </DemoContainer>
              </LocalizationProvider>
              <span
                onClick={() => {
                  setSelectedDate("");
                }}
              >
                <Typography>Cancel</Typography>
              </span>
            </Grid>
            <Grid item>
              <Search>
                <Grid item>
                  <TextField
                    value={nameFilter}
                    onChange={(e) => {
                      setNameFilter(e.target.value);
                    }}
                    // sx={{
                    //   height: "80%",
                    //   borderRadius: "15px",
                    //   backgroundColor: "white",
                    //   color: "white !important",
                    // }}
                    label="Name..."
                    variant="filled"
                  />
                </Grid>
              </Search>
            </Grid>
            <Grid item>
              <TextField
                value={specialityFilter}
                onChange={(e) => {
                  setSpecialityFilter(e.target.value);
                }}
                // sx={{
                //   height: "80%",
                //   borderRadius: "15px",
                //   backgroundColor: "white",
                //   color: "white !important",
                // }}
                label="Speciality..."
                variant="filled"
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Paper
        sx={{
          width: "60%",
          marginTop: "40px",
          marginLeft: "20%",
          boxShadow: "5px 5px 5px 5px #8585854a",
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Filled</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Doctor Name</TableCell>
                <TableCell align="left">Speciality</TableCell>
                <TableCell align="left">View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .filter((row) => {
                  return (
                    nameFilter === "" ||
                    row.doctorID?.name
                      .toLowerCase()
                      .includes(nameFilter.toLowerCase())

                    // Add this line
                  );
                })
                .filter((row) => {
                  return (
                    specialityFilter === "" ||
                    row.doctorID.speciality
                      .toLowerCase()
                      .includes(specialityFilter.toLowerCase())
                  );
                })
                .filter((row) => {
                  return (
                    selectedDate === "" ||
                    new Date(row.datePrescribed) >=new Date(selectedDate)
                  );
                }).filter((row) => {
                  return (
                    isFilled === false ||
                    row.status==="filled"
                  );
                })
                .map((row, index) => (
                  <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                    <TableCell align="left">
                      <FormControlLabel
                        disabled
                        control={<Checkbox checked={row.status === "filled"} />}
                        label="Disabled"
                      />
                    </TableCell>
                    <TableCell align="left">{row.datePrescribed}</TableCell>
                    <TableCell align="left">{row.doctorID?.name}</TableCell>
                    <TableCell align="left">
                      {row.doctorID?.speciality}
                    </TableCell>
                    <TableCell align="left">
                      <IconButton onClick={() => handleView(row._id)}>
                        <VaccinesIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>): (
    <>
      <Link to="/Login" sx={{ left: "100%" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "flex" },
            fontSize: "20px",
            maragin: "auto",
          }}
        >
          Login
        </Typography>
      </Link>
    </>
  ));
  
};

export default App;
