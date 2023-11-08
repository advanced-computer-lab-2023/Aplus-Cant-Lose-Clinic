import React from 'react'
import Button from "@mui/material/Button";
import { useState } from 'react';
import {  useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import {

  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Input,
  TextareaAutosize,
   Card ,
 CardContent,
 TextField
} from '@mui/material';


const SubsciptionPayment = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const id = useSelector((state) => state.user.id);
  const location=useLocation();
  const h_id=location.state.myProp;
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiration: "",
    cardHolder: "",
    cvv: "",
  });
  const [isValid, setIsValid] = useState(false);


  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  
  

    const handleWalletButtonClick = async() => {
      try{
        const response=await axios.patch(`http://localhost:8080/api/patient/SubscriptionPayment/${id}/${h_id}`)
      }catch(error)
      {
        console.error('Error:', error);
      }
    
      };
    
      const handleCreditCardButtonClick = () => {
        handleOpenDialog();
      };
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
        handleValidation();
      };
    
      const handleValidation = () => {
        const { cardNumber } = formData;
        // Simple validation for a 16-digit credit card number
        setIsValid(/^\d{16}$/.test(cardNumber));
      };
    
      const handleSubmit = () => {
        handleValidation();
        if (isValid) {
          // You can perform further actions here, e.g., submit the form data to a server.
          console.log("Form data is valid:", formData);
          handleCloseDialog(); // Close the dialog
        }
      };
  return (
    <div>
        <h1>Payment Options</h1>
    <Button variant="contained" color="primary" onClick={handleWalletButtonClick}>
      Wallet
    </Button>
    <Button variant="contained" color="primary" onClick={handleCreditCardButtonClick}>
      Credit Card
    </Button>

    <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Credit Card Information</DialogTitle>
        <DialogContent>
          <TextField
            label="Credit Card Number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="16-digit card number"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Expiration Date"
            name="expiration"
            value={formData.expiration}
            onChange={handleChange}
            placeholder="MM/YY"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cardholder's Name"
            name="cardHolder"
            value={formData.cardHolder}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="CVV"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            placeholder="3 or 4 digits"
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={!isValid}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    
    </div>
  )
}

export default SubsciptionPayment