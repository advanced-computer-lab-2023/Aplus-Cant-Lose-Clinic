import React from 'react'
import Button from "@mui/material/Button";

const SubsciptionPayment = () => {
    const handleWalletButtonClick = () => {
        alert("You clicked the Wallet button.");
        // const user=await ();
        // //get
        // if()
      };
    
      const handleCreditCardButtonClick = () => {
        alert("You clicked the Credit Card button.");
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