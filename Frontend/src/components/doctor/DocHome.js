import React from "react";
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
import { useState ,useEffect} from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import SickIcon from "@mui/icons-material/Sick";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import DoctorProfileDialog from "./DoctorProfileDialog";
import { useGridStatePersistence } from "@mui/x-data-grid/internals";
export default function DocHome() {
  console.log("im hiiim ");
  const user = useSelector((state) => state.user);
const disaptch=useDispatch();
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
  useEffect(() => {

  }, [dialogOpen]);


  return (
    // <div>DocHome
    // {  console.log(user)}
    // </div>

    <>
      <AppBar position="static" sx={{ backgroundColor: "#004E98" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "2", md: "flex" } }}>
              <NavLink to="/PatientsList">
                <Button sx={{ color: "white" }}>
                  <IconButton>
                    <SickIcon style={styles}></SickIcon>
                  </IconButton>
                  <Typography>My Patients</Typography>
                </Button>
              </NavLink>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "2", md: "flex" } }}>
              <NavLink to="/DocPatients">
                <Button sx={{ color: "white" }}>
                  <IconButton>
                    <PendingActionsIcon style={styles}></PendingActionsIcon>
                  </IconButton>
                  <Typography>Appointments</Typography>
                </Button>
              </NavLink>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "2", md: "flex" } }}>
                <Button sx={{ color: "white" }} onClick={handleOpenDialoog}>
                  <IconButton>
                    <BadgeIcon style={styles}></BadgeIcon>
                  </IconButton>
                  <DoctorProfileDialog
                    open={dialogOpen}
                    handleClose={handleCloseDialog}
                  />
                  <Typography> job credentials</Typography>
                </Button>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "2", md: "flex" } }}>
              <NavLink to={`/chats`}>
                <Button sx={{ color: "white" }}>
                  <IconButton>
                    <QuestionAnswerIcon style={styles}></QuestionAnswerIcon>
                  </IconButton>
                  <Typography> My chats</Typography>
                </Button>
              </NavLink>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

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
