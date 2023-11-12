import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ContractDetails = ({ doctorId }) => {
  const [contractPath, setContractPath] = useState(null);

  useEffect(() => {
    // Load contract details when the component mounts
    axios.get(`/api/doctor/getContract/${doctorId}`)
      .then(response => {
        setContractPath(response.data.contract);
      })
      .catch(error => {
        console.error('Error fetching contract details', error);
      });
  }, [doctorId]);

  const handleAcceptContract = () => {
    // Implement the logic to accept the contract using axios
    axios.put(`/api/doctor/acceptContract/${doctorId}`)
      .then(response => {
        console.log('Contract accepted successfully', response.data);
        // You may want to update the UI or perform other actions after accepting the contract
      })
      .catch(error => {
        console.error('Error accepting contract', error);
      });
  };

  const handleDownloadContract = () => {
    try {
      const result = await axios.get(
        `${API_URL}/doctor/download/${fid}/${id}`,
        { responseType: "blob" }
      );
      const split = path.split("/");
      const filename = split[split.length - 1];
      setErrorMsg("");
      // Show Snackbar for download success
      setSnackbarMessage(`File ${filename} downloaded successfully`);
      setSnackbarOpen(true);
      download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("Error while downloading file. Try again later");
      }
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Contract Details
        </Typography>
        {contractPath ? (
          <>
            <Typography variant="body2" color="text.secondary">
              Contract Path: {contractPath}
            </Typography>
            <Button onClick={handleAcceptContract} variant="contained" color="primary">
              Accept Contract
            </Button>
            <Button onClick={handleDownloadContract} variant="contained" color="secondary">
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
  );
};

export default ContractDetails;
