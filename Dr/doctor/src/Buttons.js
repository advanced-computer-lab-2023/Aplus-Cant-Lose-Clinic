import * as React from 'react';
import {Button, Typography ,Box} from '@mui/material';

import { Link } from 'react-router-dom';

export default function Buttons() {
  return (
    <Box >
        <Link to="/HomePage/myprofile" style={{ textDecoration: 'none' ,margin :'10px' }}>
          <Button  sx={{ backgroundColor:'#004E98',color:'white'  }} >
            <Typography>
              My Profile
            </Typography>
            </Button>
        </Link>
        <Link to="/HomePage/myappointments" style={{ textDecoration: 'none' ,margin :'10px'  }}>
          <Button  sx={{  backgroundColor:'#004E98',color:'white' }} >
          <Typography>
              My Appointments
            </Typography>
            </Button>
        </Link>
        <Link to="/HomePage/mypatients" style={{ textDecoration: 'none' ,margin :'10px'  }}>
          <Button  sx={{  backgroundColor:'#004E98' ,color:'white'}} >
          <Typography>
              My Patients
            </Typography>
            </Button>
        </Link>
    </Box>
  );
}