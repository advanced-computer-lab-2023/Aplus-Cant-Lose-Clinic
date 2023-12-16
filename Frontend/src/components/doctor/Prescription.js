import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography, AppBar, Toolbar, Container } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../../Consts';

const Prescriptions = () => {
  const doctorId = useSelector((state) => state.user.id);
  const [patientList, setPatientList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescriptionsList, setPrescriptionsList] = useState([]);

  const getPatients = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/doctor/getPatientsByDoctorId/${doctorId}`);
      if (Array.isArray(data.patients)) {
        setPatientList(data.patients);
      } else {
        console.error("Data.patients is not an array:", data.patients);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPrescriptions = async (patientId) => {
    try {
      const { data } = await axios.get(`${API_URL}/patient/viewPrescriptions/${patientId}`);
      if (Array.isArray(data.prescriptions)) {
        setPrescriptionsList(data.prescriptions);
        setSelectedPatient(patientId); // Set the selected patient
      } else {
        console.error("Data.prescriptions is not an array:", data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <div>
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
                >
                  Prescription Date: {new Date(prescription.datePrescribed).toLocaleDateString()}
                </Paper>
              ))}
            </Paper>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Prescriptions;
