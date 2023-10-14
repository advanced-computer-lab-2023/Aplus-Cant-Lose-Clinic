import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home'; // Import the Home icon
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPatients } from "../../features/doctorSlice";
import { useNavigate } from 'react-router-dom';

const styles = {
  paper: {
    padding: '20px',
    backgroundColor: 'pink',
    marginBottom: '10px'
  },
  mainHeader: {
    fontSize: '35px',
    color: '#200A2A',
  },
  subHeader: {
    fontSize: '30px',
    color: '#3A6EA5',
  },
  text: {
    fontSize: '16px',
    color: 'black',
  },
  button: {
    backgroundColor: '#004E98',
    color: 'white',
  },
};

function PatientDetails() {
  // Dummy patient data (you can replace this with actual data)
  const drId = useSelector((state) => state.user.id);
  const dispatch= useDispatch();
  useEffect(() => {
    dispatch(getPatients(drId));
  }, [dispatch]);

  const rows = useSelector((state) => state.doctor.patientsList);


  const navigate = useNavigate();
  return (
    <div>
      {rows.map((row, index) => (
        <Paper elevation={3} style={styles.paper}  key={index}>
          <i>
            <IconButton
              color="primary"
              aria-label="Back to Home"
              style={{ position: 'absolute', bottom: '10px', right: '10px' }}
              onClick={() => {
                navigate(-1);
              }}
            >
              <HomeIcon />
            </IconButton>
          </i>

          <Typography variant="h4" style={styles.mainHeader}>
            Patient Details
          </Typography>
          <Typography variant="body1" style={styles.text}>
            Name: {row.name}
          </Typography>
          <Typography variant="body1" style={styles.text}>
            email: {row.email}
          </Typography>
          <Typography variant="body1" style={styles.text}>
            Age: {row.age}
          </Typography>
          <Typography variant="body1" style={styles.text}>
            Gender: {row.gender}
          </Typography>
  

          <Typography variant="h5" style={styles.subHeader}>
            Health Records
          </Typography>
          <ul>
            {row.records.map((record, index) => (
              <ul key={index} >
              <li style={styles.text}>
                {record.url}
              </li>
              <li style={styles.text}>
                {record.desc}
              </li>
              
</ul>
            ))}
          </ul>
          <Button
            variant="contained"
            color="primary"
           
            style={styles.button}
          >
            Add Record
          </Button>
        </Paper>))}
    </div>
  );
}

export default PatientDetails;
