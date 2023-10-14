import * as React from 'react';
import {Button, Typography ,Box} from '@mui/material';

import { Link } from 'react-router-dom';

export default function Buttons() {
  return (
    <Box  sx={{ width:'80%', display:'fit' , }}>
        <Link to="/HomePage/myprofile" style={{ textDecoration: 'none' ,margin :'10px' }}>
          <Button  sx={{ backgroundColor:'#004E98',color:'white' , width:'35%' }} >
            <Typography>
              My Profile
            </Typography>
            </Button>
        </Link>
        <Link to="/HomePage/myappointments" style={{ textDecoration: 'none' ,margin :'10px'  }}>
          <Button  sx={{  backgroundColor:'#004E98',color:'white'  , width:'30%'}} >
          <Typography>
              My Appointments
            </Typography>
            </Button>
        </Link>
        <Link to="/patientList" style={{ textDecoration: 'none' ,margin :'10px'  }}>
          <Button  sx={{  backgroundColor:'#004E98' ,color:'white' , width:'30%'}} >
          <Typography>
              My Patients
            </Typography>
            </Button>
        </Link>
    </Box>
  );
}