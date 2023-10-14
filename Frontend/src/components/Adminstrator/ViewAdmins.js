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
import { useEffect } from 'react';
import { viewAdmin, deleteAdmin } from '../../features/adminSlice';
import { AutoFixNormal } from '@mui/icons-material';

export default function ViewAdmins() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewAdmin())
  }, [dispatch]);
  const dummyData = useSelector((state) => state.admin.admins);

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
  const handleDelete = (id) => {
    dispatch(deleteAdmin(id));
  };

  return (
    <TableContainer component={Paper} style={tableStyle}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" style={cellStyle}>username</TableCell>
            <TableCell align="left" style={cellStyle}>remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyData.map((row, index) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left" style={cellStyle}>
                {row.username}
              </TableCell>
              <TableCell>

                <Button
                  sx={{ backgroundColor: '#a80b0b', color: 'white', width: '35%' }}
                  onClick={() => handleDelete(row._id)}  // Pass the admin ID to the handler
                >            <Typography>
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

