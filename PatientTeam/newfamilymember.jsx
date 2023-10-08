import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from "@mui/icons-material/Home";
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"  sx={{ backgroundColor: '#004E98' }}>
        <Toolbar variant="dense">
          <Link to='/Homepage' >
          <IconButton edge="start"  aria-label="menu" sx={{ mr: 2 }}>
            <HomeIcon style={{color:'white'}}/>
          </IconButton>
          </Link>
          <Typography variant="h6" color="inherit" component="div">
            New Family Member
          </Typography>
        </Toolbar>
      </AppBar>
      <DataInsertion />
    </Box>
  );
}

function DataInsertion() {
  const [name, setName] = useState('');
  const [nationalID, setNationalID] = useState('');
  const [age, setAge] = useState('');
  const [relation, setRelation] = useState('');

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      flexGrow={1} // Allow the component to grow vertically
      marginTop="30px" // Push the component to the bottom of the parent
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '70ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
        type='text'
          value={name}
          required={true}
          label="Enter Name"
          id="outlined-size-normal"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <TextField
          type='integer'
          value={nationalID}
          required={true}
          label="Enter National ID"
          id="outlined-size-normal"
          onChange={(e) => setNationalID(e.target.value)}
          
        />
      </div>
      <div>
        <TextField
          type='integer'
          value={age}
          required={true}
          label="Enter Age"
          id="outlined-size-normal"
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <SelectTextFields />
      <div>
        <TextField
        type='text'
          value={relation}
          required={true}
          label="Relation"
          id="outlined-size-normal"
          onChange={(e) => setRelation(e.target.value)}
        />
      </div>
      <Link to={"/homepage/viewfamilymembers/newfamilymembers"} color='white'>
      <NewFamilyMemberButton /> {/* Call the function to render the button */}
      </Link>
    </Box>
  );
}

const Gender = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  },
];

function SelectTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '70ch' },
        //alignItems: 'flex-start',
      }}
      noValidate
      autoComplete="off"
      alignItems="left"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          helperText="Choose gender"
        >
          {Gender.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}

function NewFamilyMemberButton() {
  return (
    <Button variant="contained" NewFamilyMember sx={{marginTop: '30px'}} >
      Add New Member To Family
    </Button>
  );
}


