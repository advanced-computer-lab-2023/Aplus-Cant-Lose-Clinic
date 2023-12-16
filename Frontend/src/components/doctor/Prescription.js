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
} from '@mui/material';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import { Link } from 'react-router-dom';
import { API_URL } from '../../Consts';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Container from '@mui/material/Container';

const Prescriptions = () => {
  const doctorId = useSelector((state) => state.user.id);
  const [patientList, setPatientList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescriptionsList, setPrescriptionsList] = useState([]);
  const [prescriptionid, setPrescriptionid] = useState(null);

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

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <div>
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
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box style={Info}>
                  <Typography sx={{ fontSize: '16px' }}>
                    <strong>Date : </strong>
                    {new Date(prescriptionid?.datePrescribed).toLocaleDateString()}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <img
                  src="/virtualclinic.png"
                  alt="virtualclinic"
                  width={'200px'}
                  sx={{ marginBottom: '50px' }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ margin: '20px 20px 0px 80px' }}>
                  <Typography sx={{ fontSize: '16px' }}>
                    {prescriptionid.doctorID?.name}
                  </Typography>
                  <Typography sx={{ fontSize: '16px' }}>
                    {prescriptionid.doctorID?.speciality}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              {prescriptionid?.meds?.map((medicine, index) => (
                <Box sx={{ margin: '20px 20px 0px 80px' }} key={index}>
                  <Typography sx={{ fontSize: '16px' }}>
                    Medicine Name :{medicine.medID?.name}
                  </Typography>
                  <Typography sx={{ fontSize: '16px' }}>
                    Medicine Active elements:
                    {medicine.medID?.activeElement}
                  </Typography>
                  <Typography sx={{ fontSize: '16px' }}>
                    Medicine Used for :{medicine.medID?.use}
                  </Typography>
                  <Typography sx={{ fontSize: '16px' }}>
                    Medicine Frequency :{medicine.medID?.amount}
                  </Typography>
                  <Typography sx={{ fontSize: '16px' }}>
                    Medicine Dosage :{medicine?.dosage}
                  </Typography>
                </Box>
              ))}
            </Grid>
            <Paper
              sx={{
                width: '100px',
                marginTop: '40px',
                marginLeft: '40%',
                boxShadow: 'none',
                display: 'flex',
              }}
            >
              {prescriptionid.status === 'filled' ? (
                <img
                  src="/Pharmacy Stamp.png"
                  alt="hospital stamp"
                  width={'100px'}
                />
              ) : (
                ''
              )}
              <Link to={'/home'}>
                <Button
                  sx={{
                    margin: '10px 0px 0px 50px',
                    justifyItems: 'center',
                    color: 'black',
                    border: 'black',
                  }}
                >
                  <IconButton sx={{ paddingLeft: '0px' }}>
                    <ArrowBackIosIcon />
                  </IconButton>
                  Back
                </Button>
              </Link>
            </Paper>
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
            </Paper>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Prescriptions;