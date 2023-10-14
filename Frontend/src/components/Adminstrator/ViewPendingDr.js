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
import { useSelector,useDispatch} from "react-redux";
import { viewPendDr } from '../../features/adminSlice';
import { useEffect } from 'react';

export default function ViewPendingDr() {
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(viewPendDr())
  }, [dispatch]);
  const dummyData = useSelector((state) => state.admin.pdoctors);

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
            docs
            </TableCell>
            <TableCell align="left" style={cellStyle}>
            status
            </TableCell>
            <TableCell align = "left"style={cellStyle}>Acceptance</TableCell>

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
              <TableCell align="left" style={cellStyle}>
                {row.docs.map((doc) => {
                  return `${doc.url},${doc.desc}`;
                }).join('\n')}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {row.status}
              </TableCell>
              <TableCell >

              <Button  sx={{ backgroundColor:'#004E98',color:'white'  , marginLeft: '10px'}} onClick={{}}>
                <Typography>
                  Reject
                </Typography>
              </Button> 
              <Button  sx={{ backgroundColor:'#004E98',color:'white'  ,marginRight:'10px'}} onClick={{}}>
                <Typography>
                  Accept
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



