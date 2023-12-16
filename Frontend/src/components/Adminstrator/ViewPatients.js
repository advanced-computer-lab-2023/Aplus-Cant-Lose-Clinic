import React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { viewPatients ,deletePatient} from '../../features/adminSlice';
import { useEffect } from 'react';

export default function ViewPatients() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewPatients())
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePatient(id));
  };

  const dummyData = useSelector((state) => state.admin.patients);
  const tableStyle = {
    width: "100%",
    marginLeft: "50px",
    boxShadow: "5px 5px 5px 5px #8585854a",
    marginTop: "30px",
    marginBottom: "20px",
  };

  const cellStyle = {
    fontSize: "19px",
  };
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
  
    let age = currentDate.getFullYear() - birthDate.getFullYear();
  
    // Adjust age if birthday hasn't occurred yet this year
    if (currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  };
  return (
    <TableContainer component={Paper} style={tableStyle}>
      <Table sx={{ maxWidth: "90%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={cellStyle}>Name</TableCell>
            <TableCell align="left" style={cellStyle}>Email</TableCell>
            <TableCell align="left" style={cellStyle}>Username</TableCell>
            <TableCell align="left" style={cellStyle}>Age</TableCell>
            <TableCell align="left" style={cellStyle}>Gender</TableCell>
            <TableCell align="left" style={cellStyle}>Mobile</TableCell>
            <TableCell align="left" style={cellStyle}>Emergency Contact</TableCell>
            <TableCell align="left" style={cellStyle}>Health Package</TableCell>
            <TableCell align="left" style={cellStyle}>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyData.map((row, index) => (
            <TableRow
              key={row._id}
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
              {calculateAge(row.dBirth)}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {row.gender}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {row.mobile}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {`${row.emergencyContact.fullName}, ${row.emergencyContact.mobile}, ${row.emergencyContact.relation}`}
              </TableCell>
            
              <TableCell align="left" style={cellStyle}>
                {row.hPackage?.type}
              </TableCell>
            
              <TableCell>
                <Button sx={{ backgroundColor: '#a80b0b', color: 'white', width: '35%' }} onClick={() => handleDelete(row._id)} >
              
                <DeleteIcon/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
