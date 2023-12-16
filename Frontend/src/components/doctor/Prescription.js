import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Grid,
  Paper,
  Dialog,
} from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../Consts';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';

const Prescriptions = () => {
  const doctorId = useSelector((state) => state.user.id);
  const [patientList, setPatientList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescriptionsList, setPrescriptionsList] = useState([]);
  const [prescriptionid, setPrescriptionid] = useState(null);
  const [isAddPrescriptionDialogOpen, setAddPrescriptionDialogOpen] = useState(false);

  const Info = {
    margin: '20px 20px',
    alignItems: 'baseline',
  };

  const getPatients = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/doctor/getPatientsByDoctorId/${doctorId}`
      );
      if (Array.isArray(data.patients)) {
        setPatientList(data.patients);
      } else {
        console.error('Data.patients is not an array:', data.patients);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrescriptionClick = (prescriptionId) => {
    console.log('New Prescription ID:', prescriptionId);
    setPrescriptionid(prescriptionId);
    console.log(prescriptionid);
  };

  const getPrescriptions = async (patientId) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/patient/viewPrescriptions/${patientId}`
      );
      if (Array.isArray(data.prescriptions)) {
        setPrescriptionsList(data.prescriptions);
        setSelectedPatient(patientId); // Set the selected patient
      } else {
        console.error('Data.prescriptions is not an array:', data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPrescription = () => {
    // Add logic to open the add prescription dialog or navigate to the prescription form
    setAddPrescriptionDialogOpen(true);
  };

  const handleCloseAddPrescriptionDialog = () => {
    setAddPrescriptionDialogOpen(false);
  };

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <div>
      {/* Add Prescription Dialog */}
      <Dialog open={isAddPrescriptionDialogOpen} onClose={handleCloseAddPrescriptionDialog}>
        {/* Add Prescription Form or relevant content */}
        <Typography>Add Prescription Form or Content</Typography>
      </Dialog>

      <Dialog
        open={Boolean(prescriptionid)}
        sx={{ width: '100%', height: '100%' }}
      >
        {prescriptionid ? (
          <Paper
            sx={{
              width: '100%',
              height: '100%',
              marginTop: '0px',
              marginLeft: '0%',
              boxShadow: '5px 5px 5px 5px #8585854a',
            }}
          >
            {/* Existing content remains unchanged */}
          </Paper>
        ) : null}
      </Dialog>

      <AppBar position="static" sx={{ background: '#004E98' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'center' }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                color: 'white',
                fontSize: 40,
                fontFamily: 'Inter',
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
              Patients Prescriptions
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Container sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {patientList.map((patient) => (
          <div key={patient.id} sx={{ flexGrow: 1 }} onClick={() => getPrescriptions(patient._id)}>
            <Paper sx={{ background: '#004E98', borderRadius: '25%', padding: '10px', margin: '10px', width: 'fit-content' }}>
              <Paper sx={{ background: 'white', borderRadius: '80.48px', margin: '10px', padding: '10px', textAlign: 'center' }} >
                {patient.name}
              </Paper>
              {selectedPatient === patient._id && prescriptionsList.map((prescription) => (
                <Paper
                  key={prescription._id}
                  sx={{
                    background: 'white',
                    borderRadius: '80.48px',
                    margin: '10px',
                    padding: '10px',
                    textAlign: 'center',
                  }}
                  onClick={() => handlePrescriptionClick(prescription)}

                >
                  Prescription Date: {new Date(prescription.datePrescribed).toLocaleDateString()}
                </Paper>
              ))}
              <IconButton
                onClick={handleAddPrescription}
                sx={{ color: 'white', marginLeft: '25%' }}
              >
                <AddIcon />
              </IconButton>
            </Paper>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Prescriptions;
