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
            <TableCell style={cellStyle}>Name</TableCell>
            <TableCell align="left" style={cellStyle}>Email</TableCell>
            <TableCell align="left" style={cellStyle}>Username</TableCell>
            <TableCell align="left" style={cellStyle}>Date of Birth</TableCell>
            <TableCell align="left" style={cellStyle}>Gender</TableCell>
            <TableCell align="left" style={cellStyle}>Mobile</TableCell>
            <TableCell align="left" style={cellStyle}>Emergency Contact</TableCell>
            <TableCell align="left" style={cellStyle}>Family</TableCell>
            <TableCell align="left" style={cellStyle}>Doctors</TableCell>
            <TableCell align="left" style={cellStyle}>Health Package</TableCell>
            <TableCell align="left" style={cellStyle}>Records</TableCell>
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
                {row.Dbirth}
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
                {row.family.map((familyMember) => {
                  return `${familyMember.fullName}, ${familyMember.NID}, ${familyMember.age}, ${familyMember.gender}, ${familyMember.relation}`;
                }).join('\n')}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {row.doctors.map((doctor) => doctor.doctorID).join(', ')}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {row.hPackage}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {row.records.map((record) => `${record.url}, ${record.desc}`).join('\n')}
              </TableCell>
              <TableCell>
                <Button sx={{ backgroundColor: '#a80b0b', color: 'white', width: '35%' }} onClick={() => handleDelete(row._id)} >
                  <Typography>
                    Remove
                  </Typography>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
