import React, { useState, useEffect } from "react";
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
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useHistory, useNavigate } from "react-router-dom"; // Add this import
import CreditCardForm from './CreditCardForm';
import { API_URL } from "../../Consts.js";
import RescheduleAppointment from "./PatRescheduleAppointment";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AccountAvatar from "../Authentication/AccountAvatar.js";






function BasicTable({ status, date, onPayButtonClick }) {
  const tableContainerStyle = {
    maxWidth: "80%",
    margin: "0 auto",
    marginTop: "20px",
    boxShadow: "5px 5px 5px 5px #8585854a",
  };
  

  const [followUpsRequests, setFollowUpsRequests] = useState([]);
  const dispatch = useDispatch();
  const pId = useSelector((state) => state.user.id);
  const [cancelledAppointments, setCancelledAppointments] = useState([]);

  useEffect(() => {
    dispatch(viewAppoints(pId));
  }, [dispatch]);
  const rows = useSelector((state) => state.patient.appoints);
  console.log(rows);


  const handleCancelAppointment=async(appointment)=>
  {
    setCancelledAppointments([...cancelledAppointments,appointment._id])
    try {
      
      
      const aid=appointment._id
      const did=appointment.drID._id
      const pid=appointment.pID

      const response = await axios.patch(
         `${API_URL}/patient/CancelAppointment/${aid}/${did}/${pid}`
          );
          
         
         // dispatch(viewAppoints(pId));
          

        } catch (error) {
      console.error("Error cancelling appointment", error);
    }
  }
  const handleFollowUpRequest = async (appointment) => {
    if (!followUpsRequests.includes(appointment._id)) {
      setFollowUpsRequests([...followUpsRequests, appointment._id]);
      const did=appointment.drID._id
      const pid=appointment.pID
      try{
      const response=await axios.post(`${API_URL}/patient/requestFollowUp/${pid}/${did}`)
      console.log("Done")}
      catch(error){
        console.log("not okkkkk!!",error)}
      
   
    } else {
      console.log(`Button already clicked for appointment ${appointment._id}`);
    }
  };

  return (
    <>
      <TableContainer component={Paper} style={tableContainerStyle}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
  <TableRow>
    <TableCell>Doctor Name</TableCell>
    <TableCell align="left">Doctor Speciality</TableCell>
    <TableCell align="left">Date</TableCell>
    <TableCell align="left">Status</TableCell>
    <TableCell align="left">Reschedule Appointment</TableCell> {/* Add this line */}
    <TableCell align="left">Cancel Appointment </TableCell>
    <TableCell align="left">Request FollowUp </TableCell>

  </TableRow>
</TableHead>

<TableBody>
  {rows
    .filter((row) => status === "Any" || status === row.status)
    .filter((row) => date === "" || new Date(row.startDate) >= new Date(date))
    .map((row, index) => (
      <TableRow key={index}>
        <TableCell component="th" scope="row">
          {row.drID?.name}
        </TableCell>
        <TableCell align="left">{row.drID?.speciality}</TableCell>
        <TableCell align="left">
          {row.startDate &&
            new Date(row.startDate).toLocaleDateString()}
        </TableCell>
        <TableCell align="left">{row.status}</TableCell>
        <TableCell align="left">
          {row.status === "upcoming" && (
            <RescheduleAppointment appointment={row} />
          )}
        </TableCell>
        <TableCell align="left">
  {row.status === "upcoming" && (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => {handleCancelAppointment(row)}}
      disabled={cancelledAppointments.includes(row._id)}
    >
      {cancelledAppointments.includes(row._id) ? "Done" : "Cancel"}
    </Button>
  )}
</TableCell>
<TableCell align="left">
                {row.status === "completed" && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleFollowUpRequest(row)}
                    disabled={followUpsRequests.includes(row._id)}
                  >
                    {followUpsRequests.includes(row._id) ? "Done" : "FollowUp"}
                  </Button>
                )}
              </TableCell>

      </TableRow>
    ))}
</TableBody>


        </Table>
      </TableContainer>
    </>
  );
}

export default function SearchAppBar() {
  const [status, setStatus] = useState("Any");
  const [date, setDate] = useState("");
  const [open, setOpen] = React.useState(false);
  const [pname, setPname] = useState("");
  const [Appointments, setAppointments] = useState([]);
  const [description, setDescription] = useState("");
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [openCreditCardDialog, setOpenCreditCardDialog] = useState(false);
  const [openWalletDialog, setOpenWalletDialog] = useState(false);
  const [walletBalance, setWalletBalance] = useState(1000); // Set an initial wallet balance


  const { doctorId } = useParams();

  const dispatch = useDispatch();
  const pId = useSelector((state) => state.user.id);
  const role = useSelector((state) => state.user.role);

  const rows = useSelector((state) => state.patient.appoints);
  var noappoints = false;

  const getAppointments = async () => {
    try {
      const response = await axios.get(
         `${API_URL}/patient/freeAppiontmentSlot/${doctorId}`
      );
      const appointmentsData = response.data.Appointmentss;
      setAppointments(appointmentsData);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  async function reserveAnAppointment() {
    try {
      console.log("appointmentId:", currentAppointment);
      console.log("username:", pname);
      console.log("Description:", description);

      const response = await axios.patch(
         `${API_URL}/patient/reserveAppointmentSlot/${currentAppointment}`,
        {
          username: pname,
          Description: description,
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error adding the slot", error);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
    getAppointments();
  };

  const handleClose = () => {
    reserveAnAppointment();
    setOpen(false);
  };

  const handleOpenPaymentDialog = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenPaymentDialog(true);
  };

  const handleClosePaymentDialog = () => {
    setSelectedAppointment(null);
    setOpenPaymentDialog(false);
  };

  const handlePaymentCreditCard = () => {
    // Handle credit card payment logic here
    console.log("Credit Card Payment processed for appointment:", selectedAppointment);
    // You can add more logic here for credit card processing
    setOpenCreditCardDialog(false);
    handleOpenCreditCardDialog(); // Close the credit card dialog after processing
  };

  const handleOpenCreditCardDialog = () => {
    setOpenCreditCardDialog(true);
  };

  const handleCloseCreditCardDialog = () => {
    setOpenCreditCardDialog(false);
  };

  const handleOpenWalletDialog = () => {
    setOpenWalletDialog(true);
  };
  
  const handleCloseWalletDialog = () => {
    setOpenWalletDialog(false);
  };

  const handlePaymentWallet = () => {
    console.log("Wallet Payment processed for appointment:", selectedAppointment);
    // You can add more logic here for credit card processing
    setOpenWalletDialog(false);
    handleOpenWalletDialog(); // Close the credit card dialog after processing

  };
 

  function formatDateTimeToEnglish(dateTimeString) {
    const date = new Date(dateTimeString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const dateFormatter = new Intl.DateTimeFormat("en-US", options);
    return dateFormatter.format(date);
  }
const navigate = useNavigate();
  return (
    role==="patient"?(
    <Box sx={{ flexGrow: 1 }}>
        <div>
        <AccountAvatar />
      </div>
      <AppBar position="static" sx={{ backgroundColor: "inherit" ,borderColor:"blue"}}>
        <Toolbar>
          <Link to="/Home" style={{ color: "white" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
            </IconButton>
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" },color: "black" ,ml:"40%",fontSize:"30px"}}
          >
            Appointments
          </Typography>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
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
              <Typography sx={{color:"black"}}>Cancel</Typography>
            </span>
          </Box>

          <Select
            sx={{ color: "white", ml: "20px", bg: "white" }}
            value={status}
            label="Status Filter"
            onChange={(event) => {
              setStatus(event.target.value);
            }}
          >
            <MenuItem sx={{color:"black"}} value={"Any"}>Any</MenuItem>
            <MenuItem value={"completed"}>completed</MenuItem>
            <MenuItem value="upcoming">upcoming</MenuItem>
            <MenuItem value="cancelled">cancelled</MenuItem>
            <MenuItem value="rescheduled">rescheduled</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
      <BasicTable
        status={status}
        date={date}
        onPayButtonClick={handleOpenPaymentDialog}
      />
          <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom:90,
          right: 16,
        }}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: noappoints
            ? { backgroundColor: "#004e98" }
            : { backgroundColor: "white" },
        }}
      >
        {Appointments.length === 0 ? (
          (noappoints = true && (
            <div style={{ padding: "10px", color: "white", background: "#004e98" }}>
              <h1>There is no Available Appointments</h1>
            </div>
          ))
        ) : (
          <>
            <DialogTitle>Add An Appointment</DialogTitle>
            <DialogContent>
              <Typography>Date & Time</Typography>
              {Appointments.map((appointment) => (
                <ListItem disableGutters key={appointment._id}>
                  <ListItemButton>
                    <ListItemText
                      primary={formatDateTimeToEnglish(appointment.startDate)}
                      onClick={() => setCurrentAppointment(appointment._id)}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
              <div style={{ padding: "10px" }}>
                <Typography>Patient User Name</Typography>
                <TextField onChange={(event) => setPname(event.target.value)} />
              </div>
              <div style={{ padding: "10px" }}>
                <Typography>Description</Typography>
                <TextField onChange={(event) => setDescription(event.target.value)} />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Add</Button>
              <Button onClick={(noappoints = true && handleClose)}  >Cancel</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

     
      <Snackbar open={false} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
      <MuiAlert elevation={6} variant="filled" severity="info">
        appointement is resuchudeled!!
      </MuiAlert>
    </Snackbar>
     
     

    </Box>):(
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
  
}
