import React from "react";
import download from "downloadjs"; // Import download function
import axios from "axios";
import { API_URL } from "../../Consts.js";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { viewPendDr, acceptDr, rejectDr } from "../../features/adminSlice";
import { useEffect } from "react";
import { AutoFixNormal } from "@mui/icons-material";

export default function ViewPendingDr() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewPendDr());
  }, [dispatch]);
  const dummyData = useSelector((state) => state.admin.pdoctors);
  const handleAccept = (id) => {
    dispatch(acceptDr(id));
  };
  const handleReject = (id) => {
    dispatch(rejectDr(id));
  };

  const tableStyle = {
    width: "80%",
    marginLeft: "50px",
    boxShadow: "5px 5px 5px 5px #8585854a",
    marginTop: "30px",
    marginBottom: "20px",
  };

  const cellStyle = {
    fontSize: "18px",
  };

  const buttonStyle = {
    backgroundColor: "#1776d1",
    color: "black",
    marginRight: "10px",
    marginBottom: "10px",
    width: "75px", // Set minWidth to "auto" to make the button fit the content
  };

  const redButtonStyle = {
    backgroundColor: "#f44336",
    color: "black",
    marginRight: "10px",
    marginButtom: "10px",
    width: "75px", // Set minWidth to "auto" to make the button fit the content

    minWidth: "auto", // Set minWidth to "auto" to make the button fit the content
  };


  const handleDownload = async (drId) => {
    try {
      const response = await axios.get(`${API_URL}/doctor/downloadf/${drId}`, {
        responseType: 'blob',
      });

      // Extract filename from the Content-Disposition header
      const contentDisposition = response.headers['content-disposition'];
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      const filename = filenameMatch ? filenameMatch[1] : 'files.zip';

      // Download the file using the downloadjs library
      download(response.data, filename, response.headers['content-type']);
    } catch (error) {
      console.error('Error downloading files:', error);
      // Handle error, e.g., show an error message to the user
    }
  };
  return (
    <TableContainer component={Paper} style={tableStyle}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={cellStyle}>name</TableCell>
            <TableCell align="left" style={cellStyle}>
              email
            </TableCell>
            <TableCell align="left" style={cellStyle}>
              username
            </TableCell>
            <TableCell align="left" style={cellStyle}>
              Dbirth
            </TableCell>
            <TableCell align="left" style={cellStyle}>
              gender
            </TableCell>
            <TableCell align="left" style={cellStyle}>
              rate
            </TableCell>
            <TableCell align="left" style={cellStyle}>
              affilation
            </TableCell>
            <TableCell align="left" style={cellStyle}>
              background
            </TableCell>
            <TableCell align="left" style={cellStyle}>
documents            </TableCell>
            <TableCell align="left" style={cellStyle}>
              status
            </TableCell>
            <TableCell align="left" style={cellStyle}>
              Acceptance
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyData.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {row.email}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {row.username}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {row.Dbirth}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {row.gender}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {row.rate}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {row.affilation}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {row.background}
              </TableCell>
              <Button
                sx={ { backgroundColor: "#1776d1",
                color: "black",
                marginRight: "10px",
                marginTop: "45px",

                width: "100px"}}
                onClick={() => handleDownload(row._id)}
              >
                <Typography>download</Typography>
              </Button>
    
              <TableCell align="left" style={cellStyle}>
                {row.status}
              </TableCell>
              <TableCell>
              <Button
                  sx={buttonStyle}
                  onClick={() => handleAccept(row._id)}
                >
                  <Typography>Accept</Typography>
                </Button>
              <Button
                  sx={redButtonStyle}
                  onClick={() => handleReject(row._id)}
                >
                  <Typography>Reject</Typography>
                </Button>
            
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
