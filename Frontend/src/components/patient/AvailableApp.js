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



 
 
 
 
 
export default function AvailableApp({ status, date, onPayButtonClick }) {
  const tableContainerStyle = {
    maxWidth: "80%",
    margin: "0 auto",
    marginTop: "20px",
    boxShadow: "5px 5px 5px 5px #8585854a",
  };
  const dispatch = useDispatch();
  const pId = useSelector((state) => state.user.id);

  const { doctorId } = useParams();
  const [rows, setRows] = useState([]); 
  const getAppointments = async (doctorId) => {
    try {
      const response = await axios.get(
         `${API_URL}/patient/freeAppiontmentSlot/${doctorId}`
      );
    setRows( response.data.Appointments);
    console.log(doctorId);
    console.log(rows);
     console.log(response);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  useEffect(() => {
    if (doctorId) {
      getAppointments(doctorId);
    }
  }, [doctorId]);

  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);

  const handleOpenPaymentDialog = (appointment) => {
    setOpenPaymentDialog(true);
  };

  const handleClosePaymentDialog = () => {
    setOpenPaymentDialog(false);
  };
  
  const [openCreditCardDialog, setOpenCreditCardDialog] = useState(false);
  const [openWalletDialog, setOpenWalletDialog] = useState(false);
  const [walletBalance, setWalletBalance] = useState(1000);

  const handlePaymentCreditCard = () => {
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
    // You can add more logic here for credit card processing
    setOpenWalletDialog(false);
    handleOpenWalletDialog(); // Close the credit card dialog after processing

  };

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
            {rows
             
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
                  <TableCell align="left">
                    {row.payment}
                    <Button onClick={() => handleOpenPaymentDialog()}>Pay</Button>
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
          <Typography>
            Payment for appointment:{" "}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePaymentCreditCard}>Credit Card</Button>
          <Button onClick={handlePaymentWallet}>Wallet</Button>
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
          {
            <CreditCardForm>
              
            </CreditCardForm>
          }
          
        </DialogContent>
        <DialogActions>
          {/* Add any actions or buttons for credit card processing */}
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
    {/* Add wallet payment content here */}
    <Typography>
      Payment for appointment:{" "}
    </Typography>
  </DialogContent>
  <DialogActions>
    {/* Add wallet payment actions here */}
    <Button>Pay with Wallet</Button>
    <Button onClick={handleCloseWalletDialog}>Cancel</Button>
  </DialogActions>
</Dialog>
    </>
  );
}