import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from "@mui/icons-material/Home";
import newfamilymember from './newfamilymember';

////////////////////////////////////////////////////////////////
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';


////////////////////////////////////////////////////////////////////////
const redirectToFamilyMember = async (req, res) => {
  res.redirect(newfamilymember);
};
export default function ButtonAppBar() {
    const iconStyle = {
        color: "white",
        fontSize: "30px",
        marginLeft: "-40px",
        paddingLeft: "0px",
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"  sx={{ backgroundColor: '#004E98' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Link to="/" color="white">
          <Button Speciality="large" >
                <IconButton Speciality = "Large"style = {iconStyle}>
                    <HomeIcon />
                </IconButton>
          </Button>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,marginLeft:'-20px' }}>
            My Family Members
          </Typography>
          <Link to="/Homepage/viewfamilymembers/newfamilymembers" >
                <Button color="inherit" style={{color:'white'}} >Add Family Member</Button>
          </Link>      
        </Toolbar>
      </AppBar>
      <BasicTable />
    </Box>
  );
  }
  //////////////////////////////////////////////////////
  function createData(Name, NationalID, Age, Gender, Relation) {
    return { Name, NationalID, Age, Gender, Relation};
  }
  
  const rows = [
    createData('Ahmed', 12345, 20, 'Male','son' ),
    // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    // createData('Eclair', 262, 16.0, 24, 6.0),
    // createData('Cupcake', 305, 3.7, 67, 4.3),
    // createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  function BasicSelect() {
    const [Gender, setGender] = React.useState('');
  
    const handleChange = (event) => {
      setGender(event.target.value);
    };
  
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{Gender}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Gender}
            label="Gender"
            onChange={handleChange}
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
          </Select>
        </FormControl>
      </Box>
    )};


    function BasicTable() {
        const tableStyle = {
            width: '80%', // Adjust the width as needed
            marginLeft :'50px',
            boxShadow: "5px 5px 5px 5px #8585854a",
            marginTop: '30px', // Increase the margin-top to move it down
            marginBottom: '20px', // Increase the margin-bottom to add space below the table
          };
          
          const cellStyle = {
            fontSize: '14px', // Reduce font size to make the table smaller
          };
    return (
      <TableContainer component={Paper} style={tableStyle}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style = {cellStyle}>Name</TableCell>
              <TableCell align="right" style = {cellStyle}>NationalID</TableCell>
              <TableCell align="right" style = {cellStyle}>Age</TableCell>
              <TableCell align="right" style = {cellStyle}>Gender</TableCell>
              <TableCell align="right" style = {cellStyle}>Relation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.Name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.Name}
                </TableCell>
                <TableCell align="right" style = {cellStyle} >{row.NationalID}</TableCell>
                <TableCell align="right" style = {cellStyle} >{row.Age}</TableCell>
                <TableCell align="right"style = {cellStyle} > <BasicSelect /> </TableCell>
                <TableCell align="right" style = {cellStyle}>{row.Relation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
     
}
