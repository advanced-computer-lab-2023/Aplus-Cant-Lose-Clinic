import React from "react";
import { useState } from "react";

import { Select, MenuItem, Checkbox, Typography, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { appointmentPatients } from "../../features/doctorSlice";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FreeAppointment from "./FreeAppointment";
import FollowUp from "./FollowUp";
import RescheduleAppointment from "./DocRescheduleAppointment";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AccountAvatar from "../Authentication/AccountAvatar";
export default function DocPatients() {
  const [nameFilter, setNameFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("Any");
  const [upcomingFilter, setUpcomingFilter] = useState(false);

  const dispatch = useDispatch();
  const { id, role } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(appointmentPatients(id));
  }, [dispatch]);

  const appointments = useSelector((state) => state.doctor.appointments);

  console.log(appointments);
  const navigate = useNavigate(-1);
  return role === "doctor" ? (
    <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
          <div>
          <AccountAvatar />
        </div>
      <div style={{ display: "flex", height: "100%", flexDirection: "row" }}>
    
        <i>
          <IconButton
            color="primary"
            aria-label="Back to Home"
            style={{ position: "absolute", bottom: "10px", right: "10px" }}
            onClick={() => {
              navigate("/Home");
            }}
          >
            <HomeIcon />
          </IconButton>
        </i>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            zIndex: "30",
            gap: "30px",
            boxSizing: "border-box",
            padding: "5px",
            backgroundColor: "white",
            height: "100vh",
            boxShadow: "5px 5px 5px rgba(0,0,0,0.3)",
          }}
        >
          <TextField
            value={nameFilter}
            onChange={(event) => {
              setNameFilter(event.target.value);
            }}
            label="Name Filter"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Typography>Start Date Filter</Typography>
            <input
              type="date"
              value={startDateFilter}
              onChange={(event) => {
                setStartDateFilter(event.target.value);
              }}
            />
            <span
              onClick={() => {
                setStartDateFilter("");
              }}
            >
              <Typography>Cancel</Typography>
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Typography>Status Filter</Typography>
            <Select
              value={statusFilter}
              label="Status Filter"
              onChange={(event) => {
                setStatusFilter(event.target.value);
              }}
            >
              <MenuItem value={"Any"}>Any</MenuItem>
              <MenuItem value={"completed"}>completed</MenuItem>
              <MenuItem value="upcoming">upcoming</MenuItem>
              <MenuItem value="cancelled">cancelled</MenuItem>
              <MenuItem value="rescheduled">rescheduled</MenuItem>
            </Select>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Typography>Upcoming Appointments</Typography>
            <Checkbox
              value={upcomingFilter}
              onChange={(event) => {
                setUpcomingFilter(event.target.checked);
              }}
            />
          </div>
          <FreeAppointment />
          <FollowUp />
        </div>
        <div
          style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {appointments
            .filter((res) => {
              return (
                nameFilter === "" ||
                (res.pID &&
                  res.pID.name.toLowerCase().includes(nameFilter.toLowerCase()))
              );
            })
            .filter((res) => {
              return (
                startDateFilter === "" ||
                (res.startDate &&
                  new Date(res.startDate) >= new Date(startDateFilter))
              );
            })
            .filter((res) => {
              return (
                statusFilter === "Any" ||
                (res.status && res.status === statusFilter)
              );
            })
            .filter((res) => {
              return (
                upcomingFilter === false ||
                (res.startDate && new Date(res.startDate) > new Date())
              );
            })

            .filter((res) => {
              return (
                upcomingFilter === false ||
                (res.startDate && new Date(res.startDate) - new Date() > 0)
              );
            })
            .map((res) => {
              // Additional checks for undefined properties
              if (!res._id || !res.pID) {
                console.error("Invalid appointment object:", res);
                return null; // Skip rendering if the object is invalid
              }

              return (
                <Accordion key={res._id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{res.pID?.name}</Typography>
                    <div style={{ marginLeft: "auto" }}></div>
                    <Typography>{res.status}</Typography>
                    <Typography sx={{ marginLeft: "10px" }}>
                      {res.startDate}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Typography sx={{ width: "300px" }}>
                        res Name:{" "}
                      </Typography>
                      <Typography>{res.pID?.name} </Typography>
                    </div>
                    <Divider />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Typography sx={{ width: "300px" }}>
                        Reschedule Appointment:{" "}
                      </Typography>
                      {res.status === "upcoming" && res._id && res.pID && (
                        <RescheduleAppointment appointmentID={res?._id} />
                      )}
                    </div>
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </div>

        <Snackbar
          open={false}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MuiAlert elevation={6} variant="filled" severity="info">
            appointement is resuchudeled!!
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  ) : (
    <>
      <Link to="/Login" sx={{ left: "100%" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "flex" },
            fontSize: "20px",
            maragin: "auto",
          }}
        >
          Login
        </Typography>
      </Link>
    </>
  );
}
