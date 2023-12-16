import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import download from "downloadjs";

import axios from "axios";
import { API_URL } from "../../Consts";
import { Box } from "@mui/material";
import { addHealthRecord } from "../../features/doctorSlice";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";

import { Link } from "react-router-dom";
import AccountAvatar from "../Authentication/AccountAvatar";
import GetAppIcon from "@mui/icons-material/GetApp";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Input,
  TextareaAutosize,
  Card,
  CardContent,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home"; // Import the Home icon
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPatients } from "../../features/doctorSlice";

const styles = {
  paper: {
    display: "flex",
    gap: "40%",
    padding: "20px",
    paddingTop: "20px",

    // backgroundColor: 'pink',
    backgroundColor: "#cfd8dc",
    marginTop: "20px",
    width: "60%",
    marginLeft: "400px",
  },
  buttonGroup: {
    paddingTop: "20px",

    display: "flex",
    flexDirection: "column",
    gap: "40px",
    width: "40%",
  },
  mainHeader: {
    fontSize: "35px",
    color: "#008080",
  },
  subHeader: {
    fontSize: "30px",
    color: "#3A6EA5",
  },
  text: {
    fontSize: "16px",
    color: "black",
  },
  button: {
    backgroundColor: "#004E98",
    color: "white",
  },
  card: {
    maxWidth: 400, // Adjust the maximum width as needed
    margin: "10px", // Add margin around each card
    backgroundColor: "#01579b",
    cursor: "pointer",
  },
};
// Function to handle the download file action
const handleDownloadFile = async (patientId, fileId, path, mimetype) => {
  try {
    console.log(patientId);
    console.log(fileId);
    const result = await axios.get(
      `${API_URL}/patient/download/${fileId}/${patientId}`,
      { responseType: "blob" }
    );
    const split = path.split("/");
    const filename = split[split.length - 1];

    download(result.data, filename, mimetype);
  } catch (error) {
    console.log(error);
  }
};

function PatientDetails() {
  // Dummy patient data (you can replace this with actual data)
  const drId = useSelector((state) => state.user.id);
  const role = useSelector((state) => state.user.role);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(drId);
    dispatch(getPatients(drId));
  }, [dispatch]);

  const rows = useSelector((state) => state.doctor.patientsList);

  const [id, setPatientId] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedHealthRecord, setSelectedHealthRecord] = useState([]);

  // Function to open the dialog and set the selected health record

  // Function to close the dialog
  const handleCloseDialog = () => {
    setSelectedHealthRecord(null);
    setDialogHealthRecord(false);
  };

  const handleAddHealthRecord = (id) => {
    setPatientId(id);
    setIsOpen(true);
    console.log(id);
  };
  const handleCancel = () => {
    // Add your cancellation logic here
    // For example, closing the dialog or resetting form data
    setIsOpen(false);
  };

  const handleSubmitHealthRecord = async (event) => {
    event.preventDefault();

    const sampleData = {
      date: event.target.elements.date.value,
      description: event.target.elements.description.value,
      labResults: event.target.elements.labResults.value,
      medicalInformation: event.target.elements.medicalInformation.value,
      primaryDiagnosis: event.target.elements.primaryDiagnosis.value,
      treatment: event.target.elements.treatment.value,
      doctorID: drId,
    };

    console.log("entered handleSubmitHealthRecord");
    console.log("patient id: " + id);

    const response = dispatch(
      addHealthRecord({ patientID: id, healthRecordData: sampleData })
    );

    setIsOpen(false);
    console.log(response);
  };

  const [dialogHealthRecord, setDialogHealthRecord] = useState(false);
  const [dialogMedicalHistory, setOpenDialogMedicalHistory] = useState(false);

  const [selectedMedicalHistory, setSelectedMedicalHistory] = useState(null);

  // Function to open the health record dialog
  const handleOpenHealthRecordDialog = (healthRecord) => {
    setSelectedHealthRecord(healthRecord);
    console.log(healthRecord);
    setDialogHealthRecord(true);
  };

  // Function to open the medical history dialog
  const handleOpenMedicalHistoryDialog = (row) => {
    setSelectedMedicalHistory(row.medHist);
    setPatientId(row._id);
    setOpenDialogMedicalHistory(true);
  };

  // Function to close the health record dialog
  const handleCloseHealthRecordDialog = () => {
    setSelectedHealthRecord(null);
    setDialogHealthRecord(false);
  };

  // Function to close the medical history dialog
  const handleCloseMedicalHistoryDialog = () => {
    setSelectedMedicalHistory(null);
    setOpenDialogMedicalHistory(false);
  };
  const navigate = useNavigate();
  return role === "doctor" ? (
    <div>
      <div>
        <AccountAvatar />
      </div>
      <div></div>
      {rows.map((row, index) => (
        <Paper elevation={3} style={styles.paper} key={index}>
          <Box display="flex" justifyContent="space-between">
            <div>
              <Typography variant="h4" style={styles.mainHeader}>
                {row.name}
              </Typography>
              <Typography variant="body1" style={styles.text}>
                <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                  Email:
                </span>{" "}
                {row.email}
              </Typography>

              {(() => {
                const today = new Date();
                const birthDate = new Date(row.dBirth);
                let calculatedAge =
                  today.getFullYear() - birthDate.getFullYear();

                // Adjust age if birthday hasn't occurred yet this year
                if (
                  today.getMonth() < birthDate.getMonth() ||
                  (today.getMonth() === birthDate.getMonth() &&
                    today.getDate() < birthDate.getDate())
                ) {
                  calculatedAge--;
                }

                // Display the calculated age
                return (
                  <Typography variant="body1" style={styles.text}>
                    <span
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        marginRight: "4px",
                      }}
                    >
                      Age:
                    </span>
                    {calculatedAge}
                  </Typography>
                );
              })()}

              <Typography variant="body1" style={styles.text}>
                <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                  Gender:
                </span>{" "}
                {row.gender}
              </Typography>
            </div>
          </Box>
          <div style={styles.buttonGroup}>
            <span>
              <Button
                variant="contained"
                sx={{backgroundColor:"#004E98"}}
                onClick={() => handleOpenHealthRecordDialog(row.healthRecords)}
              >
                Health Records
              </Button>
              <IconButton
                sx={{width:"60px"}}
                onClick={() => {
                  handleAddHealthRecord(row._id);
                }}
              >
                <AddCircleIcon />
              </IconButton>
            </span>
            <Button
              variant="contained"
              sx={{backgroundColor:"#004E98"}}

              onClick={() => handleOpenMedicalHistoryDialog(row)}
            >
              Medical History
            </Button>
          </div>
        </Paper>
      ))}
      {/* dialogue */}
      <Dialog open={isOpen} width="lg" >
      <div style={{margin:"20px"}}><h4>Add health Record</h4></div>

        <form
          onSubmit={handleSubmitHealthRecord}
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr", // Label takes auto width, input takes 1fr (remaining width)
            columnGap: "10px", // Adjust the gap between label and input
            margin: "4%",
          }}
        >
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              defaultValue=""
              style={{ width: "100%" }}
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
              style={{ width: "90%" }}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="labResults">LAB RESULTS</label>
            <input
              type="text"
              id="labResults"
              name="labResults"
              defaultValue=""
              style={{ width: "100%" }}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="medicalInformation">Medical Information</label>
            <input
              type="text"
              id="medicalInformation"
              name="medicalInformation"
              defaultValue=""
              style={{ width: "90%" }}
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
              style={{ width: "100%" }}
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
              style={{ width: "90%" }}
              required
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1%",
            }}
          >
            <div
              className="button-group"
              style={{ flex: 1, marginLeft: "40px" }}
            >
              <button type="submit" style={{ width: "100%" }}>
                Save
              </button>
            </div>
            <div
              className="button-group"
              style={{ flex: 1, marginLeft: "40px" }}
            >
              <button style={{ width: "100%" }} onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </Dialog>
      <Dialog
        open={dialogMedicalHistory}
        onClose={handleCloseMedicalHistoryDialog}
        fullWidth
        maxWidth="md"
        PaperProps={{ style: { minHeight: "70vh", maxHeight: "90vh" } }}
      >
        <CardContent>
          <Typography variant="h5">Medical History</Typography>
          {selectedMedicalHistory && (
            // Display detailed medical history information here
            <>
              {selectedMedicalHistory.map((medicalHistory, idx) => (
                <List key={idx}>
                  <ListItem>
                    <ListItemText
                      primary={medicalHistory.title}
                      secondary={medicalHistory.description}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="close"
                        onClick={() => {
                          handleDownloadFile(
                            id,
                            medicalHistory._id,
                            medicalHistory.file_path,
                            medicalHistory.file_mimetype
                          );
                        }}
                      >
                        <GetAppIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              ))}
            </>
          )}
        </CardContent>
      </Dialog>
      {/* Dialog Component for Health Records */}
      <Dialog
        open={dialogHealthRecord}
        onClose={handleCloseHealthRecordDialog}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: {
            minHeight: "70vh",
            maxHeight: "90vh",
            padding: "50px",
            backgroundColor: "	#D3D3D3",
          },
        }}
      >
        {Array.isArray(selectedHealthRecord) ? (
          // Display detailed health record information here
          <>
            {selectedHealthRecord.map((healthRecord, idx) => (
              <Accordion key={idx} style={{ width: "100%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`health-record-${idx}-content`}
                  id={`health-record-${idx}-header`}
                >
                  <div style={{ display: "flex", gap: "35px" }}>
                    <Typography variant="h5">
                      {new Date(healthRecord.date).toLocaleString()}
                    </Typography>
                    <Typography variant="h5">
                      {healthRecord.description}
                    </Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <CardContent>
                    {Object.keys(healthRecord).map(
                      (key) =>
                        key !== "_id" && (
                          <div key={key}>
                            <Typography
                              variant="body1"
                              style={{ wordWrap: "break-word" }}
                            >
                              <span style={{ fontWeight: "bold" }}>{key}:</span>{" "}
                              {healthRecord[key]}
                            </Typography>
                          </div>
                        )
                    )}
                  </CardContent>
                </AccordionDetails>
              </Accordion>
            ))}
          </>
        ) : (
          // Render a message or handle the case where health records is not an array
          <Typography variant="body1">No health records available.</Typography>
        )}
      </Dialog>
      {/* ... your existing code */}
    </div>
  ) : (
    <>
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
