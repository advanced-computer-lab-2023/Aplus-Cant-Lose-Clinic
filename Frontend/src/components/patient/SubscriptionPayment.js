import React from "react";
import Button from "@mui/material/Button";
import { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../Consts.js";
import { SnackbarContext } from "../../App";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Input,
  TextareaAutosize,
  Card,
  CardContent,
  TextField,
} from "@mui/material";

const SubsciptionPayment = ({ open, onClose, h_id, amount }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const id = useSelector((state) => state.user.id);
  const navigate = useNavigate();
  const snackbarMessage = useContext(SnackbarContext);
  //const location=useLocation();

  //const h_id = location.state ? location.state.healthPackageId : null;
  // const amount = location.state ? location.state.rate : null;

  const handleWalletButtonClick = async () => {
    try {
      const body = { amount: amount };
      const response = await axios.patch(
        `${API_URL}/patient/SubscriptionPayment/${id}/${h_id}`,
        body
      );
      snackbarMessage(
        "You have successfully Subscribed to HealthPackage",
        "success"
      );
      navigate("/Home");
    } catch (error) {
      console.error("Error:", error);
      snackbarMessage("No Sufficient Balance!", "error");
    }
  };

  const handleCreditCardButtonClick = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/patient/createCheckoutSession/${id}/${h_id}`
      );
      //should add await here?
      const { url } = response.data;

      window.location = url;
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle>Payment Options</DialogTitle>
      <DialogContent>
        <Button
          variant="contained"
          color="primary"sx={{width:"40%",p:"18px"}}
          onClick={handleWalletButtonClick}
        >
          Wallet
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{width:"50%",ml:"20px"}}
          onClick={handleCreditCardButtonClick}
        >
          Credit Card
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default SubsciptionPayment;
