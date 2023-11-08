// WalletDialog.js
import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { Dialog, IconButton, Typography, Button } from '@mui/material';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';


const styles = {
    dialogContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px',
    },
    walletAmount: {
      fontSize: '24px',
      fontWeight: 'bold',
      margin: '16px 0',
    },
  };

export const WalletDialog = ({ open, onClose, type}) => {
    const id = useSelector((state) => state.user.id);
   

    const dispatch = useDispatch();
    
    useEffect(() => {
        // type==='patient'?
        // dispatch(viewHealthP(id)):
        // dispatch(viewHealthP(id))
        // ;
      }, [dispatch]);

    // const amount = useSelector((state) => type ==='patient'?state.patient : state.doctor);
    const amount = 0;

  return (
    <Dialog open={open} onClose={onClose}>
      <IconButton>
        <WalletIcon style={styles} />
      </IconButton>
      <Typography>Wallet Amount:</Typography>
      {/* Display the wallet amount here */
      amount
      }
      <Button onClick={onClose}>Cancel</Button>
    </Dialog>
  );
};


