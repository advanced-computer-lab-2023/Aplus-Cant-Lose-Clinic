import React, { useEffect, useState } from "react";
import axios from "axios";
import download from "downloadjs"; // Import download function
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import DownloadIcon from '@mui/icons-material/Download';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { useSelector } from "react-redux";
import { API_URL } from "../../Consts.js";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton,Box } from "@mui/material";
const { useNavigate } = require("react-router-dom");
const ContractDetails = () => {
  const iconStyle = {
    color: "blue", // Set the icon color to blue
  };

  const navigate = useNavigate();
  const [contractPath, setContractPath] = useState(null);
  const [contractStat, setContractStat] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSuccess, setSnackbarSuccess] = useState(false); // New state for success color
  const { id,role } = useSelector((state) => state.user);
  useEffect(() => {
    // Load contract details when the component mounts
    axios
      .get(`${API_URL}/doctor/getContract/${id}`)
      .then((response) => {
        setContractPath(response.data.contract.file);
        setContractStat(response.data.contract.accepted);

      })
      .catch((error) => {
        console.error("Error fetching contract details", error);
      });
  }, [id]);

  const handleAcceptContract = () => {
    // Implement the logic to accept the contract using axios
    axios
      .put(`${API_URL}/doctor/acceptContract/${id}`)
      .then((response) => {
        console.log("Contract accepted successfully", response.data);
        setSnackbarSuccess(true);
        setContractStat(true);

        setSnackbarMessage("Contract accepted successfully");
        setSnackbarOpen(true);
        setSnackbarSuccess(true);

        // You may want to update the UI or perform other actions after accepting the contract
      })
      .catch((error) => {
        console.error("Error accepting contract", error);
        setSnackbarMessage("Error accepting contract");
        setSnackbarSuccess(false);
        setSnackbarOpen(true);
      });
  };

  const handleDownloadContract = async () => {
    try {
      const result = await axios.get(`${API_URL}/doctor/download/${id}`, {
        responseType: "blob",
      });
      const filename = "contract"; // Set the filename as needed
      download(result.data, filename);
    } catch (error) {
      console.error("Error while downloading file. Try again later.", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    role==="doctor"?
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
mb:"20px"
      }}
    >
      <Card sx={{mb:"30px",width:"95%",mr:"12px"}} >
        <CardContent>
          <Typography variant="h5" component="div">
            Contract Details
          </Typography>
          {contractPath ? (
            <>
              <Typography variant="body2" color="text.secondary">
                Contract Path: {contractPath}
              </Typography>
              <Button
                onClick={handleAcceptContract}
                variant="contained"
                color="primary"
                disabled={contractStat}
                style={{ width: "150px", marginTop: "20px" }}
              >
                Accept Contract
              </Button>
              <Button
                onClick={handleDownloadContract}
                variant="contained"
                color="secondary"
                style={{
                  marginTop: "20px",
                  marginLeft: "10px",
                }}
                endIcon={<DownloadIcon/>}
              >
                Download Contract
              </Button>
            </>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No contract found
            </Typography>
          )}
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        sx={{
          backgroundColor: snackbarSuccess ? "#4CAF50" : "#f44336", // Set background color based on success state
        }}
      />
  
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
};

export default ContractDetails;
