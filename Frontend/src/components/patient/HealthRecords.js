import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import { IconButton, Accordion, AccordionSummary, AccordionDetails, Card, CardContent, Dialog } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../../Consts.js";

const styles = {
  paper: {
    padding: '20px',
    backgroundColor: '#00897b', // New green color
    color: '#fff',
    marginBottom: '10px',
  },
  subHeader: {
    fontSize: '30px',
    color: '#fff',
  },
  accordion: {
    margin: '10px',
    backgroundColor: '#e0f2f1', // New green color for accordion background
  },
  accordionSummary: {
    backgroundColor: '#00897b', // New green color for accordion summary
    color: '#fff',
  },
  card: {
    maxWidth: 400,
    margin: '10px',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
  },
  button: {
    backgroundColor: '#00897b', // New green color for button
    color: '#fff',
  },
};

function HealthRecords() {
  const [selectedHealthRecord, setSelectedHealthRecord] = useState([]);
  const navigate = useNavigate();
  const { id } = useSelector((state) => state.user);

  const getHealthRecords = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/patient/viewPatientHealthRecords/${id}`
      );
      const healthRecords = response.data.HealthRecords.healthRecords;
      setSelectedHealthRecord(healthRecords);
    } catch (error) {
      console.error("Error fetching Health Record:", error);
    }
  };

  return (
    <div>
      <div style={{ paddingBottom: '1.5%', backgroundColor: '#1769aa' }}>
        <IconButton
          color="#FFFFFF"
          backgroundColor="#1266AA"
          aria-label="Back to Home"
          style={{ position: 'absolute' }}
          onClick={() => navigate(-1)}
        >
          <HomeIcon style={{ position: 'absolute', top: '1%', left: '1%' }} />
        </IconButton>
      </div>

      <Paper elevation={3} style={styles.paper}>
        <Typography variant="h5" style={styles.subHeader}>
          Health Records
        </Typography>

        <div>
          <Button onClick={getHealthRecords} style={styles.button}>
            Load Health Records
          </Button>
        </div>

        {selectedHealthRecord.map((healthRecord) => (
          <Accordion key={healthRecord._id} style={styles.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={styles.accordionSummary}
            >
              <Typography>{healthRecord.date}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <Typography variant="h6">Description:</Typography>
                <Typography>{healthRecord.description}</Typography>
              </div>
              <div>
                <Typography variant="h6">Medical Information:</Typography>
                <Typography>{healthRecord.medicalInformation}</Typography>
              </div>
              <div>
                <Typography variant="h6">Primary Diagnosis:</Typography>
                <Typography>{healthRecord.primaryDiagnosis}</Typography>
              </div>
              <div>
                <Typography variant="h6">Treatment:</Typography>
                <Typography>{healthRecord.treatment}</Typography>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </div>
  );
}

export default HealthRecords;
