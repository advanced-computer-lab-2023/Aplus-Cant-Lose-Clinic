// WalletDialog.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { viewWallet as viewWalletPatient } from "../features/patientSlice";
import { viewWallet as viewWalletDoctor } from "../features/doctorSlice";

import {
  Dialog,
  IconButton,
  Typography,
  Button,
  DialogContent,
} from "@mui/material";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CloseIcon from "@mui/icons-material/Close";
const styles = {
  dialogContent: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // padding: '16px',
    // width: '150px',
  },
  walletAmount: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "12px 0",
  },
  walletIcon: {
    fontSize: "48px",
  },
  cancelButtonContainer: {
    display: "flex",
    justifyContent: "center", // Center the child elements horizontally
    marginTop: "16px",
  },
};

export const WalletDialog = ({ open, onClose}) => {
  const id = useSelector((state) => state.user.id);
  const role = useSelector((state) => state.user.role);

  const dispatch = useDispatch();

  useEffect(() => {
    role === "patient"
      ? dispatch(viewWalletPatient(id))
      : dispatch(viewWalletDoctor(id));
  }, [dispatch]);

  const amount = useSelector((state) =>
    role === "patient" ? state.patient.wallet : state.doctor.wallet
  );
  // const amount = 0;

  return (
    <Dialog open={open} onClose={onClose}>
      <IconButton onClick={onClose} size="small" sx={{ ml: "65%" }}>
        <CloseIcon fontSize="small" />
      </IconButton>
      <DialogContent styles={styles.dialogContent}>
        <IconButton>
          <WalletIcon style={styles.walletIcon} />
        </IconButton>

        <Typography variant="h5" style={styles.walletAmount}>
          Wallet Amount: {amount}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};
