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
import { NavLink } from "react-router-dom";
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
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const [dialoogOpen, setDialoogOpen] = useState(false);

  const handleOpenDialoog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialoog = () => {
    setDialogOpen(false);
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
