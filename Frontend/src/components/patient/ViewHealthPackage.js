
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
import { viewHealthP, deleteHpackages, editPackFront, updatePack } from '../../features/adminSlice';
import { Button, Typography } from "@mui/material";
import { SnackbarContext } from "../../App";

export default function Hpackages() {
  const snackbarMessage = useContext(SnackbarContext);
  const [editRow, setEditRow] = useState({});
  const [id, setId] = useState(-1);
  const [idx, setIdx] = useState(-1);
  const [subscribed, setSubscribed] = useState({}); // Track subscription status

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewHealthP());
  }, [dispatch]);

  const dummyData = useSelector((state) => state.admin.hpackages);

  const handleUnSubscribe = (id) => {
    // Dispatch your unsubscribe logic here
    // Update the subscribed state accordingly
    setSubscribed({ ...subscribed, [id]: false });
  };

  const handleSubscribe = (row, index) => {
    // Implement your subscribe logic here
    // After subscribing, update the subscribed state
    setSubscribed({ ...subscribed, [row._id]: true });
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
                  {!subscribed[row._id] ? (
                    <Button
                      sx={subscribeButtonStyle}
                      onClick={() => {
                        console.log(row);
                        handleSubscribe(row, index);
                      }}
                    >
                      <Typography>
                        Subscribe
                      </Typography>
                    </Button>
                  ) : (
                    <Button
                      sx={unsubscribeButtonStyle}
                      onClick={() => handleUnSubscribe(row._id)}
                    >
                      <Typography>
                        UnSubscribe
                      </Typography>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}