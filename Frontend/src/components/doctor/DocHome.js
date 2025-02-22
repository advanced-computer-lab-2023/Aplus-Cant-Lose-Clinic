import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Tooltip,
  Button,
  Avatar,
  Container,
  Menu,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";
import { NavLink, Navigate } from "react-router-dom";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GroupIcon from "@mui/icons-material/Group";
import WalletIcon from "@mui/icons-material/Wallet";
import { WalletDialog } from "../WalletDialog.js";
import { useState } from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import SickIcon from "@mui/icons-material/Sick";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import DoctorProfileDialog from "./DoctorProfileDialog";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useEffect } from "react";
import { getNotificationsd } from "../../features/doctorSlice.js";

export default function DocHome() {
  console.log("im hiiim ");
  const user = useSelector((state) => state.user);

  const styles = {
    marginRight: "10px",
    color: "white",
  };
  const picstyle = {
    position: "relative",
    margin: "10px",
    left: "45%",
  };
  const pic2style = {
    margin: "10px",
  };
  const textstyle = {
    position: "relative",
    padding: "10px",
    right: "53%",
    marginTop: "10%",
  };
  const text2style = {
    padding: "10px",
    marginTop: "10%",
  };
  const divstyle = {
    display: "flex",
  };

  const doctorId = useSelector((state) => state.user.id);

  const dispatch = useDispatch();

  useEffect(() => {
    window.location.href = "/DocPatients";
  }, [dispatch]);
  
  const notifications = useSelector((state) => state.doctor.notifications);

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    // <div>DocHome
    // {  console.log(user)}
    // </div>

    <>
      

      <Snackbar
        open={false}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MuiAlert elevation={6} variant="filled" severity="info">
          appointement is resuchudeled!!
        </MuiAlert>
      </Snackbar>
    </>
  );
}
