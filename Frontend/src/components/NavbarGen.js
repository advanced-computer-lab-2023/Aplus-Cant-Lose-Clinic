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
import { Badge } from "@mui/icons-material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GroupIcon from "@mui/icons-material/Group";
import WalletIcon from "@mui/icons-material/Wallet";
import { useState } from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import SickIcon from "@mui/icons-material/Sick";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import DoctorProfileDialog from "./doctor/DoctorProfileDialog";
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import { useEffect } from "react";

const NavbarGen = () => {
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
  const role = useSelector((state) => state.user.role);
  return (
    <div>
      {role === "doctor" && (
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
                  <NavLink to="/FollowUpRequests">
                    <Button sx={{ color: "white" }}>
                      <IconButton>
                        <GroupIcon style={styles}></GroupIcon>
                      </IconButton>
                      <Typography>Follow Ups</Typography>
                    </Button>
                  </NavLink>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: "2", md: "flex" } }}>
                  <Button sx={{ color: "white" }} onClick={handleOpenDialog}>
                    <IconButton>
                      <Badge badgeContent={1} color="error">
                        <BadgeIcon style={styles}></BadgeIcon>
                      </Badge>
                    </IconButton>
                    <Typography>Job Credentials</Typography>
                  </Button>
                  <DoctorProfileDialog
                    open={dialogOpen}
                    handleClose={handleCloseDialog}
                  />
                </Box>
              </Toolbar>
            </Container>
          </AppBar>

          <Snackbar
            open={false}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <MuiAlert elevation={6} variant="filled" severity="info">
              Appointment is rescheduled!!
            </MuiAlert>
          </Snackbar>
        </>
      )}
      {role === "patient" && (
        <>
          <AppBar position="static" sx={{ backgroundColor: "#004E98" }}>
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  ></IconButton>
                  <Menu></Menu>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: "2", md: "flex" } }}>
                  <NavLink to="/viewfamilymembers">
                    <Button sx={{ color: "white" }}>
                      <IconButton>
                        <FamilyRestroomIcon style={styles}></FamilyRestroomIcon>
                      </IconButton>
                      <Typography>Family Members</Typography>
                    </Button>
                  </NavLink>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: "2", md: "flex" } }}>
                  <NavLink to="/Appointments">
                    <Button sx={{ color: "white" }}>
                      <IconButton>
                        <CalendarMonthIcon style={styles}></CalendarMonthIcon>
                      </IconButton>
                      <Typography>My Appointments</Typography>
                    </Button>
                  </NavLink>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: "2", md: "flex" } }}>
                  <NavLink to="/HealthRecords">
                    <Button sx={{ color: "white" }}>
                      <IconButton>
                        <MedicalInformationIcon
                          style={styles}
                        ></MedicalInformationIcon>
                      </IconButton>
                      <Typography>My Health Records</Typography>
                    </Button>
                  </NavLink>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: "2", md: "flex" } }}>
                  <NavLink to="/ListOfPrescriptions">
                    <Button sx={{ color: "white" }}>
                      <IconButton>
                        <VaccinesIcon style={styles}></VaccinesIcon>
                      </IconButton>
                      <Typography>My Percriptions</Typography>
                    </Button>
                  </NavLink>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: "2", md: "flex" } }}>
                  <NavLink to="/ViewHealthPackage">
                    <Button sx={{ color: "white" }}>
                      <IconButton>
                        <VaccinesIcon style={styles}></VaccinesIcon>
                      </IconButton>
                      <Typography>health packages</Typography>
                    </Button>
                  </NavLink>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: "2", md: "flex" } }}>
                  <NavLink to="/MedHistList">
                    <Button sx={{ color: "white" }}>
                      <IconButton>
                        <VaccinesIcon style={styles}></VaccinesIcon>
                      </IconButton>
                      <Typography>Medical History </Typography>
                    </Button>
                  </NavLink>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: "2", md: "flex" } }}>
                  <NavLink to="/chats">
                    <Button sx={{ color: "white" }}>
                      <IconButton>
                        <PermPhoneMsgIcon style={styles}></PermPhoneMsgIcon>
                      </IconButton>
                      <Typography>Chats/Calls</Typography>
                    </Button>
                  </NavLink>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </>
      )}
    </div>
  );
};

export default NavbarGen;
