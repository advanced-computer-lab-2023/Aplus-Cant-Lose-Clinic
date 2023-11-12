import React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from 'react';
import { API_URL } from "../../Consts.js";
import {NavLink} from 'react-router-dom';




export default function Contract() {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  
  const SetContracts = async () => {
    try {
        const response = await axios.put(`http://localhost:8000/api/doctor/acceptContract/${doctorId}`);
        const ContractsData = response.data.doctor;
        console.log(ContractsData);
        // Redirect back to the  Home (Login as a verification of accepting the contract) page upon accepting the contract
        window.location.href = "/Home"; 
    } catch (error) {
        console.error("Error fetching Contracts:", error);
    }
};


  const getDoctor = async () => {
      try {
          const response = await axios.get(`http://localhost:8000/api/doctor/getDoctor/${doctorId}`);
          const getDoctorData = response.data.doctor;
          setDoctor(getDoctorData);
      } catch (error) {
          console.error("Error fetching Doctor:", error);
      }
  }

  useEffect(() => {
      getDoctor();
  }, []);

  const tableStyle = {
      width: "80%",
      marginLeft: "50px",
      boxShadow: "5px 5px 5px 5px #8585854a",
      marginTop: "30px",
      marginBottom: "20px",
  };

  const cellStyle = {
      fontSize: "14px",
  };

  return (
      <TableContainer component={Paper} style={tableStyle}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                  <TableRow>
                      <TableCell style={cellStyle}>Job Name</TableCell>
                      <TableCell align="left" style={cellStyle}>Accept</TableCell>
                      <TableCell align="left" style={cellStyle}>View</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {doctor && doctor.contract && doctor.contract === 'pending' ? (
                      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                          <TableCell component="th" scope="row">
                              Doctor
                          </TableCell>
                          <TableCell>
                              <Button sx={{ backgroundColor: '#0007a5ab', color: 'white', width: '35%' }} onClick={SetContracts}>
                                  <Typography>
                                      Accept
                                  </Typography>
                              </Button> 
                          </TableCell>
                          <TableCell>
                              <Button sx={{ backgroundColor: '#0007a5ab', color: 'white', width: '35%' }}>
                                  <Typography>
                                      View
                                  </Typography>
                              </Button>
                          </TableCell>
                      </TableRow>
                  ) : null}
              </TableBody>
          </Table>
      </TableContainer>
  );
}
