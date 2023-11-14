import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
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
import CreditCardForm from "./CreditCardForm";
import { API_URL } from "../../Consts.js";
import { SnackbarContext } from "../../App";
import { useContext } from "react";
export default function AvailableApp({ status, date, onPayButtonClick }) {
  const snackbarMessage = useContext(SnackbarContext);
  const navigate=useNavigate();

  const tableContainerStyle = {
    maxWidth: "80%",
    margin: "0 auto",
    marginTop: "20px",
    boxShadow: "5px 5px 5px 5px #8585854a",
  };
  const dispatch = useDispatch();
  const pId = useSelector((state) => state.user.id);
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const { doctorId } = useParams();
  const [rows, setRows] = useState([]);
  const [aid, setAid] = useState(0);

  const getAppointments = async (doctorId) => {

    try {
      const response = await axios.get(
        `${API_URL}/patient/freeAppiontmentSlot/${doctorId}`
      );
      setRows(response.data.Appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
      getAppointments(doctorId);
}, [doctorId]);

  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);

  const handleOpenPaymentDialog = async (appointment) => {
    try {
      const response = await axios.get(
        `${API_URL}/patient/calculateAmount/${doctorId}/${pId}`
      );
      const calculatedAmount = response.data.amount;
      setCalculatedAmount(calculatedAmount);
      setSelectedAppointmentId(appointment._id); // Assuming _id is the appointment ID
      setOpenPaymentDialog(true);
      // Assuming _id is the appointment ID

      setAid(appointment._id);
    } catch (error) {
      console.error("Error calculating amount:", error);
    }
    setOpenPaymentDialog(true);
  };

  const handleClosePaymentDialog = () => {
    setOpenPaymentDialog(false);
  };

  const [openCreditCardDialog, setOpenCreditCardDialog] = useState(false);
  const [openWalletDialog, setOpenWalletDialog] = useState(false);

  const [walletBalance, setWalletBalance] = useState(1000);

  const handlePaymentCreditCard = () => {};

  const handleCloseCreditCardDialog = () => {
    setOpenCreditCardDialog(false);
  };

  const handleOpenWalletDialog = () => {
    setOpenWalletDialog(true);
  };

  const handleCloseWalletDialog = () => {
    setOpenWalletDialog(false);
  };

  const handlePaymentWallet = async () => {
    try {
      // Check if an appointment is selected
      if (!selectedAppointmentId) {
        console.error("No appointment selected for payment");
        return;
      }

      // Fetch the calculated amount for the selected appointment
      const response = await axios.get(
        `${API_URL}/patient/calculateAmount/${doctorId}/${pId}`
      );
      const calculatedAmount = response.data.amount;
      console.log(calculatedAmount);
      // Check if the calculated amount is valid
      if (!calculatedAmount || calculatedAmount <= 0) {
        console.error("Invalid calculated amount");
        return;
      }

      // Perform the wallet payment
      const body = {
        patientID: pId,
        amount: calculatedAmount,
        drID: doctorId,
        appointmentID: selectedAppointmentId,
      };

      const paymentResponse = await axios.post(
        `${API_URL}/patient/payAppWithWallet/`,
        body
      );
      if (response) {
        snackbarMessage("You have successfully edited", "success");
      } else {
        snackbarMessage(`error: ${response} has occurred`, "error");
      }
      // Handle the payment response as needed
      console.log(paymentResponse.data);
      navigate('/Home');

      // Close the payment dialog
      handleClosePaymentDialog();
    } catch (error) {
      console.error("Error making wallet payment:", error);
      // Handle error
    }
  };

///
  const handleOpenCreditCardDialog = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/patient/createAppointmentCheckoutSession/${calculatedAmount}/${aid}/${pId}`
      );
      //should add await here?
      const { url } = response.data;

      window.location = url;
    } catch (error) {
      console.error(error.response.data.error);
    }
  };
///
  return (
    <>
    
      <TableContainer component={Paper} style={tableContainerStyle}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Doctor Name </TableCell>
              <TableCell align="left">Doctor Speciality</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Status </TableCell>
              <TableCell align="left">Payment </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
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
                <TableCell align="left">
                  {row.payment}
                  <Button onClick={() => handleOpenPaymentDialog(row)}>
                    Pay
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openPaymentDialog}
        onClose={handleClosePaymentDialog}
        PaperProps={{
          style: { backgroundColor: "white" },
        }}
      >
        <DialogTitle>Payment</DialogTitle>
        <DialogContent>
          <Typography>Payment for appointment: </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenCreditCardDialog}>Credit Card</Button>
          <Button onClick={handleOpenWalletDialog}>Wallet</Button>
          <Button onClick={handleClosePaymentDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openCreditCardDialog}
        onClose={handleCloseCreditCardDialog}
        PaperProps={{
          style: { backgroundColor: "white" },
        }}
      >
        <DialogTitle>Credit Card Information</DialogTitle>
        <DialogContent>
          <CreditCardForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreditCardDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openWalletDialog}
        onClose={handleCloseWalletDialog}
        PaperProps={{
          style: { backgroundColor: "white" },
        }}
      >
        <DialogTitle>Wallet Payment</DialogTitle>
        <DialogContent>
          <Typography>Payment for appointment: </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePaymentWallet}>Pay with Wallet</Button>
          <Button onClick={handleCloseWalletDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Link to="/Home" style={{ color: "white" }}>
            <IconButton
              size="large"
              color="blue"
              aria-label="open drawer"
              sx={{ mr: 2 ,pisition:"fixed",top:"0px"}}
            >
              <HomeIcon />
            </IconButton>
          </Link>
    </>
  );
}
