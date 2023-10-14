import React, { useEffect } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector,useDispatch} from "react-redux";
import { viewMedicine } from '../../features/adminSlice';

export default function ViewMedicines(){
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(viewMedicine())
  }, [dispatch]);
  const dummyData =  useSelector((state) => state.admin.medicine);
  const tableStyle = {
    width: "80%",
    marginLeft: "50px",
    boxShadow: "5px 5px 5px 5px #8585854a",
    marginTop: "30px",
    marginBottom: "20px",
  };

  const cellStyle = {
    fontSize: "25px",
  };

  return (
    <TableContainer component={Paper} style={tableStyle}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" style={cellStyle}>
            name
            </TableCell>
            <TableCell align="left" style={cellStyle}>
            price
            </TableCell>
            <TableCell align="left" style={cellStyle}>
            use
            </TableCell>
            <TableCell style={cellStyle}>activeElement</TableCell>
            <TableCell align="left" style={cellStyle}>
            amount
            </TableCell>
            <TableCell align="left" style={cellStyle}>
            imgurl
            </TableCell>
            <TableCell align="left" style={cellStyle}>
            sales
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
                {row.price}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {row.use}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {row.activeElement}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {row.amount}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {row.imgurl}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {row.sales}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
