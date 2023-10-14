import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { viewFamilyMembers } from "../../features/patientSlice";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const patientId = useSelector((state) => state.user.id);
  console.log(patientId);
  useEffect(() => {
    dispatch(viewFamilyMembers({patientId}));
  }, [dispatch]);


  const iconStyle = {
    color: "white",
    fontSize: "30px",
    marginLeft: "-40px",
    paddingLeft: "0px",
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#004E98" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          />
          <Link to="/Home" color="white">
            <Button Speciality="large">
              <IconButton Speciality="Large" style={iconStyle}>
                <HomeIcon />
              </IconButton>
            </Button>
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginLeft: "-20px" }}
          >
            My Family Members
          </Typography>
          <Link to="/viewfamilymembers/newfamilymembers">
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>{" "}
          </Link>
        </Toolbar>
      </AppBar>
      <BasicTable  />
    </Box>
  );
}

function BasicTable() {
  const rows = useSelector((state) => state.patient.fMembers);
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
            <TableCell align="right" style={cellStyle}>
              NationalID
            </TableCell>
            <TableCell align="right" style={cellStyle}>
              Age
            </TableCell>
            <TableCell align="right" style={cellStyle}>
              Gender
            </TableCell>
            <TableCell align="right" style={cellStyle}>
              Relation
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.fullName}
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                {row.NID}
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                {row.age}
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                {row.gender}
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                {row.relation}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
