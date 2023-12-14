// DoctorProfileDialog.js
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import ContractDetails from "./Contract"; // Import ContractDetails component

import { editDoctorCredentials, getDr } from "../../features/doctorSlice";
import { SnackbarContext } from "../../App";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
const CredentialsEdit = () => {
  const snackbarMessage = useContext(SnackbarContext);
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.id);

  const info = useSelector((state) => state.doctor.info);
  console.log(info.email);
  const [newEmail, setNewEmail] = React.useState(info.email);
  const [newRate, setNewRate] = React.useState(info.rate);
  const [newAffiliation, setNewAffiliation] = React.useState(info.affilation);
  const navigate = useNavigate();

  const handleSave = () => {
    const response = dispatch(
      editDoctorCredentials({
        id: id,
        email: newEmail,
        rate: newRate,
        affilation: newAffiliation,
      })
    );
    response.then((responseData) => {
      console.log(responseData);
      if (responseData.payload === undefined) {
        snackbarMessage(`error: user not found`, "error");
      } else {
        snackbarMessage("You have successfully edited info", "success");
        navigate(-1);
      }
    });
  };

  return (
    <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: "5px", flexDirection: "row" }}>
        <Typography sx={{ width: "300px" }}>Edit Email</Typography>
        <TextField
          value={newEmail}
          onChange={(event) => setNewEmail(event.target.value)}
        />
      </div>
      <div style={{ display: "flex", gap: "5px", flexDirection: "row" }}>
        <Typography sx={{ width: "270px" }}>Edit Hourly Rate</Typography>
        <TextField
        sx={{ml:"30px", width: "190px"}}
          type="number"
          value={newRate}
          onChange={(event) => setNewRate(event.target.value)}
        />
      </div>
      <div style={{ display: "flex", gap: "5px", flexDirection: "row" }}>
        <Typography sx={{ width: "300px" }}>
          Edit Affiliation(Hospital)
        </Typography>
        <TextField
          value={newAffiliation}
          onChange={(event) => setNewAffiliation(event.target.value)}
        />
      </div>
      <Button variant="contained" onClick={() => handleSave()}>
        Save Data
      </Button>
    </div>
  );
};

const DoctorProfileDialog = ({ open, handleClose }) => {
  const [value, setValue] = React.useState("one");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.id);

  useEffect(() => {
    if (open) {
      setOpenn(true);
    } else {
      setOpenn(false);
    }
    dispatch(getDr(id));

  }, [dispatch, id, open]);

  const [openn, setOpenn] = useState(false);

  // Update openn when the open prop changes

  const handleCloseDialog = () => {
    setOpenn(false);
    handleClose();
  };

  return (
    <Dialog open={openn} fullWidth maxWidth="sm" >
      <IconButton
        edge="end"
        color="inherit"
        onClick={handleCloseDialog}
        aria-label="close"
        sx={{ ml: "70%" }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>Doctor Job credentials</DialogTitle>
      <DialogContent>
        <div style={{mb:"10px"}}>
        <ContractDetails />
        </div>
        <CredentialsEdit handleClose={handleClose} />
      </DialogContent>
      <DialogActions>{/* Add your actions here */}</DialogActions>
    </Dialog>
  );
};

export default DoctorProfileDialog;
