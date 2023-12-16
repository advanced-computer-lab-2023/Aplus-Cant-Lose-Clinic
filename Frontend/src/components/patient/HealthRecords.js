import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import h from "./h.png";
import m from "./m.png";
import {
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Dialog,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import MedHistList from "./MedHistList.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../../Consts.js";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AccountAvatar from "../Authentication/AccountAvatar.js";
const styles = {
  paper: {
    padding: "20px",
    width: "40%",
    marginBottom: "10px",
  },
  subHeader: {
    fontSize: "30px",
    color: "#fff",
  },
  accordion: {
    margin: "10px",
    backgroundColor: "#fffffc",
    width: "95%", // New green color for accordion background
  },
  accordionSummary: {
    backgroundColor: "#7251b5", // New green color for accordion summary
    color: "#fff",
  },
  card: {
    maxWidth: 400,
    margin: "10px",
    cursor: "pointer",
  },
  button: {
    color: "#fff",
  },
};
// ... (imports remain unchanged)

function HealthRecords() {
  const [selectedHealthRecord, setSelectedHealthRecord] = useState([]);
  const navigate = useNavigate();
  const { id, role } = useSelector((state) => state.user);
  useEffect(() => {
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

    // Call the function when the component mounts
    getHealthRecords();
  }, [id]); // Add any dependencies that are used in the function, like 'id'

  return role === "patient" ? (
    <div>
      <div>
        <AccountAvatar />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* Image to the left of the Health Records accordion */}
            <img
              src={h}
              alt="Left Image"
              style={{ marginRight: "200px", width: "20%", height: "20%" }}
            />
            <Paper elevation={3} style={styles.paper}>
              <h1 >
                Health Records
              </h1>

              {selectedHealthRecord.map((healthRecord) => (
                <Accordion key={healthRecord._id} style={styles.accordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={styles.accordionSummary}
                  >
                    <Typography sx={{ mr: "50%" }}>
                      {new Date(healthRecord.date).toLocaleString()}
                    </Typography>
                    <Typography>{healthRecord.description}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {/* Your existing Accordion content */}
                  </AccordionDetails>
                </Accordion>
              ))}
            </Paper>
          </div>
          {/* Image to the right of the Health Records accordion */}
          <div style={{ display: "flex" }}>
            <div style={{marginTop:"240px",marginLeft:"40px"}}>
            <h1 >
              Medical History
              </h1>

          <MedHistList />
          </div>
            <img
              src={m}
              alt="Left Image for MedHistList"
              style={{ marginRight: "10px", width: "40%", height: "50%" }}
            />
            {/* Image to the left of the MedHistList component */}
          </div>
        </div>
      </div>
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

export default HealthRecords;
