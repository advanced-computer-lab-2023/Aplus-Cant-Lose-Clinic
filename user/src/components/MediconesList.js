import React from "react";
import {
  AppBar, Box, Toolbar, Button, IconButton, InputBase, styled, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from 'react-router-dom';

const App = () => {
  const iconStyle = {
    color: "white", // Set the icon color to white
  };
  const filterStyle = {
    marginLeft: "50px", // Set the icon color to white
  };

  const Search = styled("div")(({ theme }) => ({
    display: "flex", // Add this to make the search fields horizontally centered
    alignItems: "center", // Vertically center the items
    marginLeft: "auto", // Push the search fields to the right
    border: '0',

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

  const dateTimePickerContainer = {
    display: "flex",
    alignItems: "center",
    borderRadius: "4px",
    padding: "8px",
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#004E98' }}>
        <Toolbar>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Link to='/'>
                <Button Speciality="large">
                  <IconButton>
                    <HomeIcon style={iconStyle} />
                  </IconButton>
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Typography variant="h5">Medicones List</Typography>
            </Grid>
            <div item style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', marginLeft: '20%' }}>
              <Grid item>
                <Search >
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Medicine Name"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
              </Grid>
              <Grid item>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Medical Use"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
              </Grid>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
      <Paper sx={{ width: '60%', marginTop: '40px', marginLeft: '20%', boxShadow: "5px 5px 5px 5px #8585854a", }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" >Medicine Name</TableCell>
                <TableCell align="left" >Price</TableCell>
                <TableCell align="left" >Medical Use</TableCell>
                <TableCell align="left" >Active Element</TableCell>
                <TableCell align="left" >Amount</TableCell>
                <TableCell align="left" >Img Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover role="checkbox" tabIndex={-1} >
                <TableCell align="left" >Doliprane </TableCell>
                <TableCell align="left" >2003</TableCell>
                <TableCell align="left" >Headache</TableCell>
                <TableCell align="left" >Cna2 </TableCell>
                <TableCell align="left" >5 left </TableCell>
                <TableCell align="left" >'https://altibbi.com/'</TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>

      </Paper>
    </Box>

  );
};

export default App;
