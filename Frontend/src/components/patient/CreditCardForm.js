// CreditCardForm.js

import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const CreditCardForm = ({ onFormSubmit, onCancel }) => {
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCVV] = useState('');

  const handleSubmit = () => {
    // You can perform any validation or additional processing here
    // Send the credit card information to the parent component
    onFormSubmit({ creditCardNumber, expirationDate, cvv });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Credit Card Information
        </Typography>
        <Divider sx={{ my: 2 }} />
        <FormControl fullWidth>
          <FormLabel>Credit Card Number</FormLabel>
          <Input
            value={creditCardNumber}
            onChange={(e) => setCreditCardNumber(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Expiration Date</FormLabel>
          <Input
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>CVV</FormLabel>
          <Input value={cvv} onChange={(e) => setCVV(e.target.value)} />
        </FormControl>
      </CardContent>
      <CardActions>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          pay
        </Button>
      </CardActions>
    </Card>
  );
};

export default CreditCardForm;
