import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

function DoctorProfile() {
  const initialDoctorInfo = {
    name: 'Dr. John Doe',
    specialty: 'Cardiologist',
    experience: '10 years',
    education: 'Medical School XYZ',
    location: '1234 Elm Street, City, State',
    mail: 'doctor.johndoe@example.com',
    dateOfBirth: 'January 1, 1980',
    hourlyRate: '$200',
    affiliation: 'Medical Association ABC',
  };

  const [doctorInfo, setDoctorInfo] = useState(initialDoctorInfo);
  const [isEditing, setIsEditing] = useState({
    mail: false,
    hourlyRate: false,
    affiliation: false,
  });

  const handleEditClick = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  const handleSaveClick = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: false,
    }));
    // Implement logic to save the edited value here
    // For example, you can update the state with the new value.
  };

  const renderFieldWithEditButton = (label, value, field) => {
    const isEditableField = ['mail', 'affiliation', 'hourlyRate'].includes(field);

    return (
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <Typography variant="h6">{label}:</Typography>
          {isEditing[field] ? (
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={doctorInfo[field]}
              onChange={(e) =>
                setDoctorInfo((prevDoctorInfo) => ({
                  ...prevDoctorInfo,
                  [field]: e.target.value,
                }))
              }
            />
          ) : (
            <Typography variant="body1" style={{ color: 'black' }}>{value}</Typography>
          )}
        </Grid>
        {isEditableField && (
          <Grid item xs={4}>
            {isEditing[field] ? (
              <IconButton
                color="primary"
                aria-label={`Save ${label}`}
                onClick={() => handleSaveClick(field)}
              >
                <SaveIcon />
              </IconButton>
            ) : (
              <IconButton
                color="primary"
                aria-label={`Edit ${label}`}
                onClick={() => handleEditClick(field)}
              >
                <EditIcon />
              </IconButton>
            )}
          </Grid>
        )}
      </Grid>
    );
  };

  return (
    <div>
      <IconButton
        color="primary"
        aria-label="Back"
        style={{ position: 'absolute', bottom: '10px', right: '10px' }}
      >
          <Link to="/">
        <HomeIcon />
        </Link>
      </IconButton>

      <Typography variant="h4" gutterBottom>
        Doctor Profile
      </Typography>

      <Paper elevation={3} style={{ padding: '20px' }}>
        {renderFieldWithEditButton('Name', doctorInfo.name, 'name')}
        {renderFieldWithEditButton('Specialty', doctorInfo.specialty, 'specialty')}
        {renderFieldWithEditButton('Experience', doctorInfo.experience, 'experience')}
        {renderFieldWithEditButton('Education', doctorInfo.education, 'education')}
        {renderFieldWithEditButton('Location', doctorInfo.location, 'location')}
        {renderFieldWithEditButton('Mail', doctorInfo.mail, 'mail')}
        {renderFieldWithEditButton('Date of Birth', doctorInfo.dateOfBirth, 'dateOfBirth')}
        {renderFieldWithEditButton('Hourly Rate', doctorInfo.hourlyRate, 'hourlyRate')}
        {renderFieldWithEditButton('Affiliation', doctorInfo.affiliation, 'affiliation')}
      </Paper>
    </div>
  );
}

export default DoctorProfile;
