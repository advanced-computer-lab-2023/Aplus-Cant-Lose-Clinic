import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";
import { SnackbarContext } from "../../App";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";

import {
  deleteMedicine,
  updateMedicineDetails,
  editMedicine,
} from "../../features/pharmacistSlice";
import { AutoFixNormal } from "@mui/icons-material";
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
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
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

export default function E({ medicines }) {
  const [nameFilter, setNameFilter] = useState("");
  const [useFilter, setUseFilter] = useState("");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Medicine List
          </Typography>
          <TextField
            value={nameFilter}
            onChange={(e) => {
              setNameFilter(e.target.value);
            }}
            sx={{
              height: "80%",
              borderRadius: "15px",
              backgroundColor: "white",
              color: "white !important",
            }}
            label="Name..."
            variant="filled"
          />
          <TextField
            value={useFilter}
            onChange={(e) => {
              setUseFilter(e.target.value);
            }}
            sx={{
              height: "80%",
              borderRadius: "15px",
              backgroundColor: "white",
              color: "white !important",
            }}
            label="Use..."
            variant="filled"
          />
        </Toolbar>
      </AppBar>
      <BasicTable
        rows={medicines}
        nameFilter={nameFilter}
        useFilter={useFilter}
      />

      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Link to="/Medicine/add">
          {" "}
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </Box>
    </Box>
  );
}

function createData(name, price, use, activeelements, amount, imagelink) {
  return { name, price, use, activeelements, amount, imagelink };
}

function BasicTable({ rows, nameFilter, useFilter }) {
  const snackbarMessage = useContext(SnackbarContext);
  const [editRow, setEditRow] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [idx, setIdx] = useState(-1);

  const handleSubmit = (event) => {
    event.preventDefault();

    const sampleData = {
      activeElement: event.target.elements.activeElement.value,
      price: event.target.elements.price.value,
      use: event.target.elements.use.value,
      name: event.target.elements.name.value,
      amount: event.target.elements.amount.value,
      imgurl: event.target.elements.imgurl.value,
      _id: editRow._id,
    };

    console.log(sampleData);
    dispatch(editMedicine({ idx: idx, newData: sampleData }));
    const response = dispatch(updateMedicineDetails(sampleData));

    response.then((responseData) => {
      console.log(responseData);
      if (responseData.payload.status < 300) {
        snackbarMessage("You have successfully edited", "success");
      } else {
        snackbarMessage(`error: ${responseData} has occurred`, "error");
      }
    });
    setIsOpen(false);
  };

  const tableContainerStyle = {
    maxWidth: "80%", // Adjust the maximum width as needed
    margin: "0 auto", // Center-align the table horizontally
    marginTop: "40px",
    boxShadow: "5px 5px 5px 5px #8585854a",
  };

  const dispatch = useDispatch();
  const handleEditClick = (row, index) => {
    setIsOpen(true);
    setEditRow(row);
    setIdx(index);
  };
  const formGroupStyle = {
    marginBottom: "15px", // Adjust the margin as needed
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px", // Adjust the margin as needed
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
  };

  return (
    <TableContainer component={Paper} style={tableContainerStyle}>
      <Dialog open={isOpen}>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-body">
            <div style={formGroupStyle}>
              <label style={labelStyle} htmlFor="name">
                Name
              </label>
              <input
                style={inputStyle}
                type="text"
                id="name"
                defaultValue={editRow.name}
                required
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle} htmlFor="activeElement">
                Active Element
              </label>
              <input
                style={inputStyle}
                type="text"
                id="activeElement"
                defaultValue={editRow.activeElement}
                required
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle} htmlFor="use">
                Medicinal Use
              </label>
              <input
                style={inputStyle}
                type="text"
                id="use"
                defaultValue={editRow.use}
                required
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle} htmlFor="price">
                Price
              </label>
              <input
                style={inputStyle}
                type="number"
                id="price"
                required
                defaultValue={editRow.price}
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle} htmlFor="amount">
                Available Quantity
              </label>
              <input
                style={inputStyle}
                type="number"
                id="amount"
                defaultValue={editRow.amount}
                required
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle} htmlFor="imgurl">
                Image URL
              </label>
              <input
                style={inputStyle}
                type="text"
                id="imgurl"
                defaultValue={editRow.imgurl}
                required
              />
            </div>
          </div>

          <div className="footer">
            <button type="submit" >
              Edit
            </button>
          </div>
        </form>
      </Dialog>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Use</TableCell>
            <TableCell align="right">Active Elements</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Image Link</TableCell>
            <TableCell align="right">sales</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows
            .filter((row) => {
              return (
                nameFilter === "" ||
                row.name.toLowerCase().includes(nameFilter.toLowerCase())
              );
            })
            .filter((row) => {
              return (
                useFilter === "" ||
                row.name.toLowerCase().includes(useFilter.toLowerCase())
              );
            })
            .map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.use}</TableCell>
                <TableCell align="right">{row.activeElement}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.imgurl}</TableCell>
                {/* <TableCell align="right">{row.sales}</TableCell> */}
                <Button
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    handleEditClick(row, index);
                  }}
                  align="right"
                >
                  Edit
                </Button>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
