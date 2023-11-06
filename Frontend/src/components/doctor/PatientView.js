import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Box } from '@mui/material';
import { addHealthRecord } from "../../features/doctorSlice";
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
import { useNavigate } from 'react-router-dom';

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
    backgroundColor:"#01579b"
  },
};






function PatientDetails() {
  // Dummy patient data (you can replace this with actual data)
  const drId = useSelector((state) => state.user.id);
  const dispatch= useDispatch();
  useEffect(() => {
    console.log(drId);
    dispatch(getPatients(drId));
  }, [dispatch]);

  const rows = useSelector((state) => state.doctor.patientsList);


const [id, setPatientId] = useState(-1);
const [isOpen, setIsOpen] = useState(false);

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
    data1: event.target.elements.labResults.value,
    data2: event.target.elements.medicatons.value,
    data3: event.target.elements.bloodPressure.value,
    data4: event.target.elements.heartRate.value,
    data5: event.target.elements.primaryDiagnosis.value,
    doctorID : drId
   
  };

  console.log("entered handleSubmitHealthRecord");
  console.log("patient id: "+id);

  const response =  dispatch(addHealthRecord({patientID: id ,  healthRecordData:sampleData}));
 

  setIsOpen(false)
  console.log(response);


};


  const navigate = useNavigate();
  return (
    <div>
     < div style={{ paddingBottom: '1.5%',backgroundColor: "#1769aa" }}>
     <IconButton
              color="#FFFFFF"
              backgroundColor="#1266AA"
              aria-label="Back to Home"
              style={{ position: 'absolute' }}
              onClick={() => {
                navigate(-1);
              }}
            >
              <HomeIcon style={{ position: 'absolute', top: '1%', left: '1%' }} />
            </IconButton>
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
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>

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
          </div>

      
        </Paper>))}




         {/* dialogue */}
  <Dialog open={isOpen} fullWidth maxWidth="md" >
  <form onSubmit={handleSubmitHealthRecord} style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', marginLeft:"1%"}}>
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
            <label htmlFor="medicatons"
            >Medicatons</label>
            <input
              type="text"
              id="medicatons"
              name="medicatons"
              defaultValue=""
              style={{ width: '150%' , height:"20px"}} // Adjust the width as needed

              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bloodPressure">Blood Pressure</label>
            <input
              type="number"
              id="bloodPressure"
              name="bloodPressure"
              defaultValue=""
              style={{ width: '180%' }} // Adjust the width as needed

              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="heartRate">Heart Rate</label>
            <input
              type="number"
              id="heartRate"
              name="heartRate"
              defaultValue=""
              style={{ width: '180%' }} // Adjust the width as needed

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




    </div>










  );

}

export default PatientDetails;