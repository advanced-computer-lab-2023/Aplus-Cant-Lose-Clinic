import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { viewJoinedDr, deleteJDoctor } from '../../features/adminSlice';

export default function ViewDoctors() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(viewJoinedDr());
  }, [dispatch]);

  const dummyData = useSelector((state) => state.admin.jdoctors);

  const tableStyle = {
    width: "80%",
    marginLeft: "50px",
    boxShadow: "5px 5px 5px 5px #8585854a",
    marginTop: "30px",
    marginBottom: "20px",
  };

  const cellStyle = {
    fontSize: "20px",
  };

  const handleDelete = (id) => {
    dispatch(deleteJDoctor(id));
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
            {/* ... (other table headers) ... */}
          
            <TableCell align="left" style={cellStyle}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyData.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={cellStyle}>
                {row.name}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {row.email}
              </TableCell>
              {/* ... (other table data) ... */}
          
              <TableCell>
                <Button
                  sx={{ backgroundColor: '#a80b0b', color: 'white', width: '35%' }}
                  onClick={() => handleDelete(row._id)}
                >
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
