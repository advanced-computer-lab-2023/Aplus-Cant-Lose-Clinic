import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { viewDoctors } from "../../features/patientSlice";
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
import {InputBase,  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function ButtonAppBar() {
  const dispatch = useDispatch();
const id= useSelector((state) => state.user.id);
  useEffect(() => {
    dispatch(viewDoctors(id));
  }, [dispatch]);


  const iconStyle = {
    color: "white",
    fontSize: "30px",
    marginLeft: "-40px",
    paddingLeft: "0px",
  };
  const Search = styled("div")(({ theme }) => ({
    display: "flex", // Add this to make the search fields horizontally centered
    alignItems: "center", // Vertically center the items
    marginLeft: "auto", // Push the search fields to the right
    border: "0",
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    justifySelf: "center",
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  
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
            Current Doctors
          </Typography>
          <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Doctor's Name"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
        </Toolbar>
      </AppBar>
      <BasicTable  />
    </Box>
  );
}

function BasicTable() {
  const rows = useSelector((state) => state.patient.doctors);
  console.log(rows);
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
            <TableCell align="right" style={cellStyle}>
            email
            </TableCell>
            <TableCell align="right" style={cellStyle}>
              speciality
            </TableCell>
            <TableCell align="right" style={cellStyle}>
            username
            </TableCell>
            {/* <TableCell align="right" style={cellStyle}>
            Dbirth
            </TableCell> */}
            <TableCell align="right" style={cellStyle}>
            gender
            </TableCell>
            <TableCell align="right" style={cellStyle}>
            rate
            </TableCell>
            <TableCell align="right" style={cellStyle}>
            affilation
            </TableCell>
            <TableCell align="right" style={cellStyle}>
            background
            </TableCell>
            <TableCell align="right" style={cellStyle}>
            docs
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
                {row.name}
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                {row.email}
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                {row.speciality}
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                {row.username}
              </TableCell>
              {/* <TableCell align="right" style={cellStyle}>
                {row.Dbirth}
              </TableCell> */}
              <TableCell align="right" style={cellStyle}>
                {row.gender}
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                {row.rate}
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                {row.affilation}
              </TableCell>
              <TableCell align="right" style={cellStyle}>
                {row.background}
              </TableCell>
              <TableCell align="right" style={cellStyle}>
              {`${row.docs.url}, ${row.docs.desc}`}
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
