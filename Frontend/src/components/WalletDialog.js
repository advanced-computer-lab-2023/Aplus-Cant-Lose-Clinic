// WalletDialog.js
import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import {viewWallet as viewWalletPatient}  from '../features/patientSlice'
import {viewWallet as viewWalletDoctor}  from '../features/doctorSlice'

import { Dialog, IconButton, Typography, Button, DialogContent } from '@mui/material';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';

const styles = {
  dialogContent: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // padding: '16px',
    // width: '150px',
  },
  walletAmount: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '12px 0',
  },
  walletIcon: {
    fontSize: '48px',
  },
  cancelButtonContainer: {
    display: 'flex',
    justifyContent: 'center', // Center the child elements horizontally
    marginTop: '16px',
  },
};



export const WalletDialog = ({ open, onClose, type}) => {
    const id = useSelector((state) => state.user.id);
   

    const dispatch = useDispatch();
    
    useEffect(() => {
        type==='patient'?
        dispatch(viewWalletPatient(id)):
        dispatch(viewWalletDoctor(id))
        ;
      }, [dispatch]);

    const amount = useSelector((state) => type ==='patient'? state.patient.wallet : state.doctor.wallet );
    // const amount = 0;

  return (
    <Dialog open={open} onClose={onClose}>

          <DialogContent styles={styles.dialogContent}>
                <IconButton>
                  <WalletIcon style={styles.walletIcon} />
                </IconButton>

                <Typography variant="h5" style={styles.walletAmount}>
                  Wallet Amount: {amount}
                </Typography>

                <div style={styles.cancelButtonContainer}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={onClose}
                      >
                        Cancel
                      </Button>
                </div>
          
          </DialogContent>
    </Dialog>
  );
};


