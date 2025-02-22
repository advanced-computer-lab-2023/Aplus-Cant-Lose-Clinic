import React, { useEffect, useState } from 'react';
import AccountAvatar from "../Authentication/AccountAvatar";
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
    Container,
} from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { API_URL } from '../../Consts';
import { TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
const Prescriptions = () => {
    const doctorId = useSelector((state) => state.user.id);
    const [patientList, setPatientList] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [prescriptionsList, setPrescriptionsList] = useState([]);
    const [prescriptionid, setPrescriptionid] = useState(null);
    const [AddPrescriptionDialogOpen, setAddPrescriptionDialogOpen] = useState(false);
    const [editdosage, seteditdosage] = useState(false);
    const [newDose, setNewDose] = useState('');
    const [Medid, setMedid] = useState('');
    const [newMed, setnewMed] = useState('');
    const [addMed, setaddMed] = useState(false);
    const [formData, setFormData] = useState({
        medicineName: '',
        dosage: '',
    });
    const Info = {
        margin: '20px 20px',
        alignItems: 'baseline',
    };
    const handleFormSubmit = async () => {
      try {
        // Validate the form data before submitting
        if (!formData.medicineName || !formData.dosage) {
          console.error("Invalid form data");
          return;
        }
  
        // Make an API call to create a new prescription
        const response = await axios.post(`${API_URL}/doctor/addPrescription`, {
          medName: formData.medicineName,
          dosage: formData.dosage,
          patientID: selectedPatient,
          doctorID: doctorId,
          datePrescribed: formData.prescriptionDate || new Date(),
        });
  
        // Check the response and handle accordingly
        console.log("API Response:", response.data);
  
        // Close the form dialog
        setAddPrescriptionDialogOpen(false);
  
        // Optionally, you may want to refresh the prescription list or perform other actions
      } catch (error) {
        console.error("Error submitting prescription:", error);
        // Handle the error (e.g., show an error message to the user)
      }
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



    const updateDosageForMedicine = async (medID, dosage) => {
        try {
            console.log(medID);
            const prescriptionID = prescriptionid._id;
            console.log("prescriptionid:", prescriptionid._id);
            console.log('====================================');
            console.log(dosage);
            console.log('====================================');
            const { response } = await axios.put(
                `${API_URL}/doctor/update/${prescriptionID}`, {
                medID,
                dosage
            }
            );
            console.log("Response:", response);
        } catch (err) {
            console.error("Response data:", err.response.data);

        }
    };

    const addMedicineToPrescription = async (medName, dosage) => {
        try {
            console.log('====================================');
            console.log(medName);
            console.log(dosage);
            const prescriptionID = prescriptionid._id;

            console.log('====================================');
            const { response } = await axios.post(
                `${API_URL}/doctor/add/${prescriptionID}`, {
                medName,
                dosage
            }
            );
            console.log("Response:", response);

        } catch (err) {
            console.error("Response data:", err.response.data);

        }
    };


    const deleteMedicineFromPrescription = async (medID) => {
        try {
            console.log(medID);
            const prescriptionID = prescriptionid._id;
            console.log("prescriptionid:", prescriptionid._id);
            const { response } = await axios.delete(
                `${API_URL}/doctor/delete/${prescriptionID}/${medID}`
            );
        } catch (err) {
            console.error("Response data:", err.response.data);

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
        setAddPrescriptionDialogOpen(true);
    };
    const handleAddPrescriptionClose = () => {
      setAddPrescriptionDialogOpen(false);
  };
  

    useEffect(() => {
        getPatients();
    }, []);



    return (
        <div>

<Dialog
                open={addMed}
                sx={{ width: '100%', height: '100%' }}>
                <DialogContent>
                    <DialogTitle>Add Medicine </DialogTitle>
                    <TextField
                        label="Enter Medicine Name "
                        fullWidth
                        value={newMed}
                        margin='30px'
                        onChange={(e) => setnewMed(e.target.value)}
                        sx={{margin: '10px'}}

                    />
                     <TextField
                        label="Enter Dose "
                        fullWidth
                        value={newDose}
                        onChange={(e) => setNewDose(e.target.value)}
                        sx={{margin: '10px'}}
                    />
                    <Button variant="contained" onClick={() => {addMedicineToPrescription(newMed, newDose);setaddMed(false);}} sx={{ marginTop: "10px" }}>
                        Done
                    </Button>
                    <Button variant="contained" onClick={() => {setaddMed(false);}} sx={{ marginTop: "10px" }}>
                        Back
                    </Button>
                </DialogContent>
            </Dialog>

            <Dialog
                open={editdosage}
                sx={{ width: '100%', height: '100%' }}>
                <DialogContent>
                    <DialogTitle>Edit Dose </DialogTitle>
                    <TextField
                        label="Enter Dose "
                        fullWidth
                        value={newDose}
                        onChange={(e) => setNewDose(e.target.value)}
                    />
                    <Button variant="contained" onClick={() => {updateDosageForMedicine(Medid, newDose);seteditdosage(false);}} sx={{ margin: "10px" }}>
                        Done
                    </Button>
                    <Button variant="contained" onClick={() => {seteditdosage(false);}} sx={{ marginTop: "10px" }}>
                        Back
                    </Button>
                </DialogContent>
            </Dialog>
            <Dialog
                open={AddPrescriptionDialogOpen}
                sx={{ width: '100%', height: '100%' }}>
                {prescriptionid ? (
                    <DialogContent>
                        <DialogTitle>Prescription Details</DialogTitle>
                        <Typography>Prescription ID: {prescriptionid}</Typography>
                    </DialogContent>
                ) : (
                    <DialogContent>
                        <DialogTitle>Add Prescription</DialogTitle>
                        <TextField
                            label="Medicine Name"
                            fullWidth
                            value={formData.medicineName}
                            onChange={(e) => setFormData({ ...formData, medicineName: e.target.value })}
                        />
                        <TextField
                            label="Dosage"
                            fullWidth
                            value={formData.dosage}
                            onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                        />
                          <div>
            <Typography sx={{ marginBottom: '8px' }}>Prescription Date and Time</Typography>
            <DatePicker
              selected={formData.prescriptionDate}
              onChange={(date) => setFormData({ ...formData, prescriptionDate: date })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="Select date and time"
              className="custom-datepicker" // Add your own class for styling
              // ... other props
            />
          </div>
                        {/* Add more form fields as needed */}
                        <Button variant="contained" onClick={handleFormSubmit}>
                            Add Prescription
                        </Button>
                        <Button variant="contained" onClick={handleAddPrescriptionClose}>
                        Back
                    </Button>
                    </DialogContent>)}
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
                                    <DeleteIcon onClick={() => deleteMedicineFromPrescription(medicine.medID._id)} />
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
                                        <EditIcon
                                            sx={{ margin: '-10px 40px 0px 80px' }}
                                            onClick={() => {
                                                seteditdosage(true);
                                                setMedid(medicine.medID._id);
                                            }}
                                        />
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
                            <Button onClick={()=>setaddMed(true)}>
                                Add Medicine
                            </Button>
                        </Paper>
                    </Paper>
                ) : null}
            </Dialog>
            <div sx={{ background: '#004E93' }}>
            <AccountAvatar />
            </div>
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