import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Box } from '@mui/material';
import { addHealthRecord } from "../../features/doctorSlice";
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import AccountAvatar from '../Authentication/AccountAvatar';
import {

  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Input,
  TextareaAutosize,
   Card ,
 CardContent
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home'; // Import the Home icon
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPatients } from "../../features/doctorSlice";

const styles = {
  paper: {
    padding: '20px',
    // backgroundColor: 'pink',
    backgroundColor:"#cfd8dc",
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
  card: {
    maxWidth: 400, // Adjust the maximum width as needed
    margin: '10px', // Add margin around each card
    backgroundColor:"#01579b",
    cursor: 'pointer'
  },
};






function PatientDetails() {
  // Dummy patient data (you can replace this with actual data)
  const drId = useSelector((state) => state.user.id);
  const role = useSelector((state) => state.user.role);

  const dispatch= useDispatch();
  useEffect(() => {
    console.log(drId);
    dispatch(getPatients(drId));
  }, [dispatch]);

  const rows = useSelector((state) => state.doctor.patientsList);


const [id, setPatientId] = useState(-1);
const [isOpen, setIsOpen] = useState(false);

const [dialogHealthRecord, setOpenDialogHealthRecord] = useState(false);
const [selectedHealthRecord, setSelectedHealthRecord] = useState(null);

// Function to open the dialog and set the selected health record
const handleOpenDialog = (healthRecord) => {
  setSelectedHealthRecord(healthRecord);
  setOpenDialogHealthRecord(true);
};

// Function to close the dialog
const handleCloseDialog = () => {
  setSelectedHealthRecord(null);
  setOpenDialogHealthRecord(false);
};


const handleAddHealthRecord = (id)=>{
  setPatientId(id);
  setIsOpen(true);
  console.log(id);
}
const handleCancel = () => {
  // Add your cancellation logic here
  // For example, closing the dialog or resetting form data
  setIsOpen(false);

};



const handleSubmitHealthRecord = async(event)=>{
  event.preventDefault();


  const sampleData = {
    data1: event.target.elements.date.value,
    data2: event.target.elements.description.value,
    data3: event.target.elements.labResults.value,
    data4: event.target.elements.medicalInformation.value,
    data5: event.target.elements.primaryDiagnosis.value,
    data6: event.target.elements.treatment.value,
    doctorID : drId
   
  };

  console.log("entered handleSubmitHealthRecord");
  console.log("patient id: "+id);

  const response =  dispatch(addHealthRecord({patientID: id ,  healthRecordData:sampleData}));
 

  setIsOpen(false)
  console.log(response);


};


  const navigate = useNavigate();
  return (role==="doctor" ?

    <div>
          <div>
        <AccountAvatar />
      </div>
     <div style={{ paddingBottom: '4%', backgroundColor: "#004E98" ,marginBottom:"0.5%"}}>
          <IconButton
            color="#FFFFFF"
            backgroundColor="#1266AA"
            aria-label="Back to Home"
            style={{ position: 'absolute' }}
            onClick={() => {
              navigate(-1);
            }}
          >
              <HomeIcon style={{ position: 'absolute', top: '1%', left: '1%',fontSize: '2.5rem' }} />
          </IconButton>

          <span style={{ color: '#FFFFFF', position: 'absolute', top: '1%', left: '50%', transform: 'translateX(-50%)', fontSize: '1.5rem' }}>
            My Patients
          </span>

    </div>
      
      
      {rows.map((row, index) => (
        <Paper elevation={3} style={styles.paper}  key={index}>
          
            

        <Box display="flex" justifyContent="space-between">

       
          <div>
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
          </div>


          <Button
              variant="contained"
              color="primary"
              style={{ fontSize: '90%', width: '20%', height: '20%' }}
              onClick={() => {handleAddHealthRecord(row._id)}}
            >
              ADD HEALTH RECORD
            </Button>


        </Box>

  

          <Typography variant="h5" style={styles.subHeader}>
            Health Records
          </Typography>
          {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>

            {
                row.healthRecords.map((healthRecord, index) => (
                    <Card key={index} style={styles.card}>
                        <CardContent>
                          <Typography variant="h5">Health Record</Typography>
                          {Object.keys(healthRecord).map((key) => (
                            key!="_id" && (
                            <div key={key}>
                              <Typography variant="body1">
                                {key}: {healthRecord[key]}
                              </Typography>
                            </div>
                            )
                          ))}
                        </CardContent>
                    </Card>
                  ))
            }
          </div>  */}
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            
            {/* this is the card before it is clicked */}

                {
                    row.healthRecords.map((healthRecord, index) => (
                        <Card key={index} style={styles.card} onClick={() => handleOpenDialog(healthRecord)} // Open the dialog on card click
                         >
                            <CardContent>
                              <Typography variant="h5">Health Record</Typography>
                              {Object.keys(healthRecord).map((key) => (
                                (key==="date" || key==='description') && (
                                <div key={key}>
                                  <Typography variant="body1">
                                  {key === "date" ? `${key}: ${new Date(healthRecord[key]).toLocaleDateString()}` : `${key}: ${healthRecord[key]}`}
                                  </Typography>
                                </div>
                                )
                              ))}
                            </CardContent>
                        </Card>
                      ))
                }


            <Dialog open={dialogHealthRecord} onClose={handleCloseDialog} fullWidth
                    maxWidth="md"
                    PaperProps={{ style: { minHeight: '70vh', maxHeight: '90vh' } }}
            >
                
                  <CardContent >
                          <Typography variant="h5">Health Record</Typography>
                          {selectedHealthRecord && (
                            // Display detailed health record information here
                            <>
                              {Object.keys(selectedHealthRecord).map((key) => (
                                key !== '_id' && (
                                  <div key={key}>
                                    <Typography variant="body1" style={{ wordWrap: 'break-word' }}>
                                    <span style={{ fontWeight: 'bold' }}>{key}:</span> {selectedHealthRecord[key]}
                                    </Typography>
                                  </div>
                                )
                              ))}

                              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
                                  <Button variant="contained" onClick={handleCloseDialog}>
                                    Cancel
                                  </Button>
                            </div>
                            </>
                          )}
                 </CardContent>
            </Dialog>
                
            </div>

          

          
          

      
        </Paper>))}




         {/* dialogue */}
  <Dialog open={isOpen} fullWidth maxWidth="md" >
  <form onSubmit={handleSubmitHealthRecord} style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginLeft:"1%"}}>


          <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                defaultValue=""
                style={{ width: '180%' }} // Adjust the width as needed

                required
              />
          </div>

          <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                defaultValue=""
                style={{ width: '180%' }} // Adjust the width as needed

                required
              />
          </div>
         
          <div className="form-group">
              <label htmlFor="labResults" style={{marginTop:"5%"}}>LAB RESULTS</label>
              <input
                type="text"
                id="labResults"
                name="labResults"
                defaultValue=""
                style={{ width: '150%', height:"50px"}} // Adjust the width as needed
                required
              />
          </div>

          <div className="form-group">
              <label htmlFor="medicalInformation"
              >Medical Information</label>
              <input
                type="text"
                id="medicalInformation"
                name="medicalInformation"
                defaultValue=""
                style={{ width: '150%' , height:"20px"}} // Adjust the width as needed

                required
              />
          </div>
         
          <div className="form-group">
              <label htmlFor="primaryDiagnosis">Primary Diagnosis</label>
              <input
                type="text"
                id="primaryDiagnosis"
                name="primaryDiagnosis"
                defaultValue=""
                style={{ width: '150%' }} // Adjust the width as needed

                required
              />
          </div>

          <div className="form-group">
              <label htmlFor="treatment">Treatment</label>
              <input
                type="text"
                id="treatment"
                name="treatment"
                defaultValue=""
                style={{ width: '180%' }} // Adjust the width as needed

                required
              />
          </div>


          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:"1%"}}>
              <div className="button-group" style={{ flex: 1, marginRight: '10px' }}>
                <button type="submit" style={{ width: '100%' }} >
                  Save
                </button>

              </div>
              <div className="button-group" style={{ flex: 1, marginLeft: '10px' }}>
                <button  style={{ width: '100%' }} onClick={handleCancel}>
                  Cancel
                </button>
              </div>
          </div>

        </form>

    </Dialog>




    </div>:<>
      <Link to="/Login" sx={{ left: "100%" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "flex" },
            fontSize: "20px",
            maragin: "auto",
          }}
        >
          Login
        </Typography>
      </Link>
    </>










  );

}

export default PatientDetails;