import React from 'react'
import Button from "@mui/material/Button";
import { useState } from 'react';
import {  useSelector } from "react-redux";
import { useLocation ,useParams,useNavigate} from 'react-router-dom';
import { API_URL } from "../../Consts.js";
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
  const navigate = useNavigate();
  //const location=useLocation();
 
  //const h_id = location.state ? location.state.healthPackageId : null;
 // const amount = location.state ? location.state.rate : null;
 const { h_id, amount } = useParams();
 


  
  
  

    const handleWalletButtonClick = async() => {
      try{
        const body={amount:amount};
        const response=await axios.patch(`${API_URL}/patient/SubscriptionPayment/${id}/${h_id}`,body)
        navigate('/Home');

      }catch(error)
      {
        console.error('Error:', error);
        alert("No Sufficient Balance!")
      }
     
     
    
      };
    
      const handleCreditCardButtonClick = async() => {
        try{
        const response = await axios.post(`${API_URL}/patient/createCheckoutSession/${id}/${h_id}`)
       //should add await here?
        const { url } = response.data;
     
           window.location = url;
        
      }
        catch (error) {
          console.error(error.response.data.error);
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
    </div>
  )
}

export default SubsciptionPayment