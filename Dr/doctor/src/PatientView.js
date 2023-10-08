import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home'; // Import the Home icon

const styles = {
  paper: {
    padding: '20px',
    backgroundColor: '#EBEBEB',
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
  const initialPatientData = {
    name: 'John Doe',
    age: 35,
    gender: 'Male',
    registrationDate: '2023-10-15',
    healthRecords: [
      'Checkup - 2023-10-15',
      'Prescription - 2023-10-20',
      'Lab Results - 2023-10-25',
    ],
  };

  const [patientData, setPatientData] = useState(initialPatientData);
  const [newHealthRecord, setNewHealthRecord] = useState('');

  const handleAddRecord = () => {
    if (newHealthRecord.trim() === '') {
      return;
    }
    const updatedHealthRecords = [...patientData.healthRecords, newHealthRecord];
    setPatientData({ ...patientData, healthRecords: updatedHealthRecords });
    setNewHealthRecord('');
  };

  return (
    <div>
      <Paper elevation={3} style={styles.paper}>
        <IconButton
          color="primary"
          aria-label="Back to Home"
          style={{ position: 'absolute', bottom: '10px', right: '10px' }}
          onClick={() => {
            // Implement logic to navigate back to the previous page (e.g., home page)
          }}
        >
          <HomeIcon />
        </IconButton>

        <Typography variant="h4" style={styles.mainHeader}>
          Patient Details
        </Typography>
        <Typography variant="body1" style={styles.text}>
          Name: {patientData.name}
        </Typography>
        <Typography variant="body1" style={styles.text}>
          Age: {patientData.age}
        </Typography>
        <Typography variant="body1" style={styles.text}>
          Gender: {patientData.gender}
        </Typography>
        <Typography variant="body1" style={styles.text}>
          Registration Date: {patientData.registrationDate}
        </Typography>

        <Typography variant="h5" style={styles.subHeader}>
          Health Records
        </Typography>
        <ul>
          {patientData.healthRecords.map((record, index) => (
            <li key={index} style={styles.text}>
              {record}
            </li>
          ))}
        </ul>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddRecord}
          style={styles.button}
        >
          Add Record
        </Button>
      </Paper>
    </div>
  );
}

export default PatientDetails;
