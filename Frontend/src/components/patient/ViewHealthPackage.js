

import React, { useState, useContext } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { viewHealthP ,unsubscribeHealthPackage} from '../../features/patientSlice';
import { Button, Typography } from "@mui/material";
import { SnackbarContext } from "../../App";
import { NavLink,Link } from 'react-router-dom';

export default function Hpackages() {
  const snackbarMessage = useContext(SnackbarContext);
  const id = useSelector((state) => state.user.id);
  console.log("patient id is "+id);
 

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewHealthP(id));
  }, [dispatch]);

  const dummyData = useSelector((state) => state.patient.hpackages);

  const handleUnSubscribe = (healthPackageIdd) => {
    // Dispatch your unsubscribe logic here
    
  
    dispatch(unsubscribeHealthPackage({
      Pid:id , 
      healthPackageId:healthPackageIdd
    }));
    


  };

  const handleSubscribe = (row, index) => {
    // Implement your subscribe logic here
  
  };

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

  const subscribeButtonStyle = {
    backgroundColor: '#004E98',
    color: 'white',
    marginRight: '20%',
    width: '70%', // Set the width to the desired value for both buttons
  };

  const unsubscribeButtonStyle = {
    backgroundColor: '#a80b0b', // Red background color for Unsubscribe
    color: 'white',
    marginRight: '20%',
    width: '70%', // Set the width to the desired value for both buttons
  };

  return (
    <>
      <TableContainer component={Paper} style={tableStyle}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={cellStyle}>
                type
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                rate
              </TableCell>
              <TableCell style={cellStyle}>doctorDisc</TableCell>
              <TableCell align="left" style={cellStyle}>
                medicineDisc
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                familyDisc
              </TableCell>
              <TableCell align="left" style={cellStyle}></TableCell>
              <TableCell align="left" style={cellStyle}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((row, index) => (
          
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.type}
                </TableCell>
                <TableCell align="left" style={cellStyle}>
                  {row.rate}
                </TableCell>
                <TableCell align="left" style={cellStyle}>
                  {row.doctorDisc}
                </TableCell>
                <TableCell align="left" style={cellStyle}>
                  {row.medicineDisc}
                </TableCell>
                <TableCell align="left" style={cellStyle}>
                  {row.familyDisc}
                </TableCell>
                
                <TableCell align="left" style={cellStyle}>
                  {
                    
                    
                  !row.isSubscribed ? (
                    <Link to={`/SubscriptionPayment/${row._id}/${row.rate}`}>
                    <Button
                      sx={subscribeButtonStyle}
                      onClick={() => {
                        // handleSubscribe(row, index);
                      }}
                    >
                      <Typography>
                        Subscribe
                      </Typography>
                    </Button>
                  </Link>
                  
                  ) : (
                    <Button
                      sx={unsubscribeButtonStyle}
                      onClick={() => {console.log(row.isSubscribed);
                        handleUnSubscribe(row._id)
                      }}
                    >
                      <Typography>
                        Unsubscribe
                      </Typography>
                    </Button>
                  )
                 
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
