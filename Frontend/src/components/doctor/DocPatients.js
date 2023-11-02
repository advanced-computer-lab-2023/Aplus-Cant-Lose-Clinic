import React from "react";
import { useState } from "react";
import {
  Select,
  MenuItem,
  Checkbox,
  Typography,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { appointmentPatients } from "../../features/doctorSlice";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import FreeAppointment from './FreeAppointment';
import FollowUp from "./FollowUp";
export default function DocPatients() {
  const [nameFilter, setNameFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("Any");
  const [upcomingFilter, setUpcomingFilter] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
 
  const handleClose = () => {
    setOpen(false);
    if(open1==true){
      setOpen1(false);
    }
  };
  const dispatch = useDispatch();
  const { id, role } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(appointmentPatients(id));
  }, [dispatch]);

  const appointments = useSelector((state) => state.doctor.appointments);

  console.log(appointments);
  const navigate = useNavigate(-1);
  return (
    (role === "doctor" )&& (
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
              <MenuItem value={"uncompleted"}>uncompleted</MenuItem>
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
                res.pID.name.toLowerCase().includes(nameFilter.toLowerCase())
              );
            })
            .filter((res) => {
              return (
                startDateFilter === "" ||
                new Date(res.startDate) >= new Date(startDateFilter)
              );
            })

            .filter((res) => {
              return statusFilter === "Any" || res.status === statusFilter;
            })
            .filter((res) => {
              return (
                upcomingFilter === false ||
                new Date(res.startDate) - new Date() > 0
              );
            })
            .map((res) => {
              return (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{res.pID.name}</Typography>
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
                      <Typography>{res.pID.name} </Typography>
                    </div>
                    <Divider />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Typography sx={{ width: "300px" }}>
                        Appointment Status:{" "}
                      </Typography>
                      <Typography>{res.status} </Typography>
                    </div>
                    <Divider />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Typography sx={{ width: "300px" }}>
                        Appointment Date:{" "}
                      </Typography>
                      <Typography>{res.startDate} </Typography>
                    </div>
                    <i>
                      <IconButton
                        color="primary"
                        aria-label="Back to Home"
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          right: "10px",
                        }}
                        onClick={() => {
                          navigate(-1);
                        }}
                      >
                        <HomeIcon />
                      </IconButton>
                    </i>
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </div>
      </div>
    )
  );
}
