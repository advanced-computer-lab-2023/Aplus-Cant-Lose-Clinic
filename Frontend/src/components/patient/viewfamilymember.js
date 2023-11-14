import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { viewFamilyMembers } from "../../features/patientSlice";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
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

import { useNavigate } from "react-router-dom";
export default function ButtonAppBar() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewFamilyMembers({ patientId }));
  }, [dispatch]);
  const patientId = useSelector((state) => state.user.id);
  const role = useSelector((state) => state.user.role);

  const navigate = useNavigate();
  const iconStyle = {
    color: "white",
    fontSize: "30px",
    marginLeft: "-40px",
    paddingLeft: "0px",
  };

  return role === "patient" ? (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#004E98" }}>
        <Toolbar>
          <Link to="/Home" style={{ color: "white" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}
          >
            My Family Members
          </Typography>
          <Link to="/viewfamilymembers/newfamilymembers" sx={{ left: "100%" }}>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Link>
        </Toolbar>
      </AppBar>
      <BasicTable />
    </Box>
  ) : (
    <>
      <Link to="/Login" sx={{ left: "100%" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "flex" },
            fontSize: "20px",
            maragin: "auto",
          }}
        >
          Login
        </Typography>
      </Link>
    </>
  );
}

function BasicTable() {
  const rows = useSelector((state) => state.patient.fMembers);
  const tableStyle = {
    width: "80%",
    marginLeft: "10%",
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
            <TableCell align="left" style={cellStyle}>
              NationalID
            </TableCell>
            <TableCell align="left" style={cellStyle}>
              Age
            </TableCell>
            <TableCell align="left" style={cellStyle}>
              Gender
            </TableCell>
            <TableCell align="left" style={cellStyle}>
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
              <TableCell align="left" style={cellStyle}>
                {row.NID}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {row.age}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {row.gender}
              </TableCell>
              <TableCell align="left" style={cellStyle}>
                {row.relation}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
