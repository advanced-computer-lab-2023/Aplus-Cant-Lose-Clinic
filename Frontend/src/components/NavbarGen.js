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
import { NavLink, useLocation } from "react-router-dom";
import { Badge } from "@mui/icons-material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GroupIcon from "@mui/icons-material/Group";
import WalletIcon from "@mui/icons-material/Wallet";
import { useState } from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import SickIcon from "@mui/icons-material/Sick";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import DoctorProfileDialog from "./doctor/DoctorProfileDialog";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
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
  const [dialogHealthRecord, setOpenDialogHealthRecord] = useState(false);
  const [dialogMedicalHistory, setOpenDialogMedicalHistory] = useState(false);

  const [selectedHealthRecord, setSelectedHealthRecord] = useState(null);
  const [selectedMedicalHistory, setSelectedMedicalHistory] = useState(null);

  // Function to open the health record dialog
  const handleOpenHealthRecordDialog = (healthRecord) => {
    setSelectedHealthRecord(healthRecord);
    setOpenDialogHealthRecord(true);
  };

  // Function to open the medical history dialog
  const handleOpenMedicalHistoryDialog = (medicalHistory) => {
    setSelectedMedicalHistory(medicalHistory);
    setOpenDialogMedicalHistory(true);
  };

  // Function to close the health record dialog
  const handleCloseHealthRecordDialog = () => {
    setSelectedHealthRecord(null);
    setOpenDialogHealthRecord(false);
  };

  // Function to close the medical history dialog
  const handleCloseMedicalHistoryDialog = () => {
    setSelectedMedicalHistory(null);
    setOpenDialogMedicalHistory(false);
  };
  const isActive = (path) => location.pathname === path;
  const location = useLocation(); // Get the current location

  const role = useSelector((state) => state.user.role);
  return (
    <div>
      {role === "doctor" && (
        <>
          <AppBar position="static" sx={{ backgroundColor: "#004E98" }}>
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Box sx={{ flexGrow: 1, display: { xs: "2", md: "flex" } }}>
                  <NavLink
                    to="/PatientsList"
                    isActive={() => isActive("/PatientsList")}
                  >
                    <Button
                      sx={{
                        color: isActive("/PatientsList") ? "#ffd791" : "white",
                      }}
                    >
                      <IconButton>
                        <SickIcon style={styles}></SickIcon>
                      </IconButton>
                      <Typography>My Patients</Typography>
                    </Button>
                  </NavLink>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: "2", md: "flex" } }}>
                  <NavLink
                    to="/DocPatients"
                    isActive={() => isActive("/DocPatients")}
                  >
                    <Button
                      sx={{
                        color: isActive("/DocPatients") ? "#ffd791" : "white",
                      }}
                    >
                      <IconButton>
                        <PendingActionsIcon style={styles}></PendingActionsIcon>
                      </IconButton>
                      <Typography>Appointments</Typography>
                    </Button>
                  </NavLink>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: "2", md: "flex" } }}>
                  <NavLink
                    to="/FollowUpRequests"
                    isActive={() => isActive("/FollowUpRequests")}
                  >
                    <Button
                      sx={{
                        color: isActive("/FollowUpRequests")
                          ? "#ffd791"
                          : "white",
                      }}
                    >
                      <IconButton>
                        <GroupIcon style={styles}></GroupIcon>
                      </IconButton>
                      <Typography>Follow Ups</Typography>
                    </Button>
                  </NavLink>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: "2", md: "flex" } }}>
                  <NavLink to="/Prescription">
                    <Button sx={{ color: "white" }}>
                      <IconButton>
                        <PendingActionsIcon style={styles}></PendingActionsIcon>
                      </IconButton>
                      <Typography>Patient's Prescriptions</Typography>
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
                  <NavLink
                    to="/viewfamilymembers"
                    isActive={() => isActive("/viewfamilymembers")}
                  >
                    <Button
                      sx={{
                        color: isActive("/viewfamilymembers")
                          ? "#ffd791"
                          : "white",
                      }}
                    >
                      <IconButton>
                        <FamilyRestroomIcon style={styles}></FamilyRestroomIcon>
                      </IconButton>
                      <Typography>Family Members</Typography>
                    </Button>
                  </NavLink>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: "2", md: "flex" } }}>
                  <NavLink
                    to="/Appointments"
                    isActive={() => isActive("/Appointments")}
                  >
                    <Button
                      sx={{
                        color: isActive("/Appointments") ? "#ffd791" : "white",
                      }}
                    >
                      <IconButton>
                        <CalendarMonthIcon style={styles}></CalendarMonthIcon>
                      </IconButton>
                      <Typography>My Appointments</Typography>
                    </Button>
                  </NavLink>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: "2", md: "flex" } }}>
                  <NavLink
                    to="/HealthRecords"
                    isActive={() => isActive("/HealthRecords")}
                  >
                    <Button
                      sx={{
                        color: isActive("/HealthRecords") ? "#ffd791" : "white",width:"100%"
                      }}
                      startIcon={<MedicalInformationIcon style={styles} size="small"></MedicalInformationIcon>}
                    >
                    
                      <Typography sx={{width:"70%"}}>Health Records/
                      <br></br>Medical History</Typography>
                    </Button>
                  </NavLink>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: "2", md: "flex" } }}>
                  <NavLink
                    to="/ListOfPrescriptions"
                    isActive={() => isActive("/ListOfPrescriptions")}
                  >
                    <Button
                      sx={{
                        color: isActive("/ListOfPrescriptions")
                          ? "#ffd791"
                          : "white",
                      }}
                    >
                      <IconButton>
                        <VaccinesIcon style={styles}></VaccinesIcon>
                      </IconButton>
                      <Typography>My Percriptions</Typography>
                    </Button>
                  </NavLink>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: "2", md: "flex" } }}>
                  <NavLink
                    to="/ViewHealthPackage"
                    isActive={() => isActive("/ViewHealthPackage")}
                  >
                    <Button
                      sx={{
                        color: isActive("/ViewHealthPackage")
                          ? "#ffd791"
                          : "white",
                      }}
                    >
                      <IconButton>
                        <LocalHospitalIcon style={styles}></LocalHospitalIcon>
                      </IconButton>
                      <Typography>health packages</Typography>
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
