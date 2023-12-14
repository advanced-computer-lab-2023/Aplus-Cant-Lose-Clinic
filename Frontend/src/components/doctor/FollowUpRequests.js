import React from "react";
import axios from "axios";
import { API_URL } from "../../Consts.js";
import { SnackbarContext } from "../../App";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { viewFollowUpRequests } from "../../features/doctorSlice";
import { useEffect,useContext } from "react";
import { AutoFixNormal } from "@mui/icons-material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
export default function FollowUpRequests() {
  const snackbarMessage = useContext(SnackbarContext);
  const id = useSelector((state) => state.user.id); 
  const [followUpRequests, setFollowUpRequests] = useState([]);
  const [open,setDialogue]=useState(false);
  const [endDateTime, setEndDateTime] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [row_id,setRow_id]=useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    const getRequests=async()=>
    {
      try{
      const response=await axios.get(`${API_URL}/doctor/FollowUpRequests/${id}`)
      if (Array.isArray(response.data)) {
        setFollowUpRequests(response.data);
      } else {
        console.error("Invalid data format received from the server:", response.data);
        console.log(response.data)
        snackbarMessage("Invalid data format received from the server");
      }
    }
      catch (error) {
        console.error(error);
        snackbarMessage("Failed to fetch follow-up requests");
      }
    }
    getRequests();
    
  }, []);
  
  const handleReject = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/doctor/rejectFollowUp/${id}`);
      snackbarMessage('FollowUp rejected successfully:');
      
    } catch (error) {
      snackbarMessage('Error rejecting FollowUp:');

    }
  };
  const handleOpen=(id)=>
  {
    setRow_id(id);
    setDialogue(true);
  }
  const handleSchedule=async()=>
  {
    if(endDateTime!==""&&startDateTime!=="")
    {
   
      try {
        const id=row_id;
        const response = await axios.post(`${API_URL}/doctor/acceptFollowUp/${id}`, {
          start: new Date(startDateTime),
          end: new Date(endDateTime),
        });
        snackbarMessage('FollowUp Accepted successfully:');
       
      } catch (error) {
        snackbarMessage('Error Accepting FollowUp:');
      }
    }
    setEndDateTime("");
    setStartDateTime("");
    setDialogue(false)
  }
  const handleClose=()=>
  {
    console.log(new Date(startDateTime))
    setEndDateTime("");
    setStartDateTime("");
    setDialogue(false);
  }
  
  
  
  

  const tableStyle = {
    width: "80%",
    marginLeft: "50px",
    boxShadow: "5px 5px 5px 5px #8585854a",
    marginTop: "30px",
    marginBottom: "20px",
  };

  const cellStyle = {
    fontSize: "18px",
  };

  const buttonStyle = {
    backgroundColor: "#1776d1",
    color: "black",
    marginRight: "10px",
    marginBottom: "10px",
    width: "75px", // Set minWidth to "auto" to make the button fit the content
  };

  const redButtonStyle = {
    backgroundColor: "#f44336",
    color: "black",
    marginRight: "10px",
    marginButtom: "10px",
    width: "75px", // Set minWidth to "auto" to make the button fit the content

    minWidth: "auto", // Set minWidth to "auto" to make the button fit the content
  };

  return (
    <>
    <TableContainer component={Paper} style={tableStyle}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {/* ... (rest of your component) */}
        <TableBody>
          {followUpRequests.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* ... (rest of your component) */}
              <TableCell align="left" style={cellStyle}>
                {row.status}
              </TableCell>
              <TableCell>
                <Button sx={buttonStyle} onClick={() => handleOpen(row._id)}>
                  <Typography>Accept</Typography>
                </Button>
                <Button sx={redButtonStyle} onClick={() => handleReject(row._id)}>
                  <Typography>Reject</Typography>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Schedule FollowUp</DialogTitle>
    <DialogContent>                  
        <Typography>Start Date</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={["DateTimePicker", "DateTimePicker"]}
            >
                <DateTimePicker
                    label="Start time"
                    viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                        seconds: renderTimeViewClock,
                    }}
                    value={startDateTime} // Add this line
                    onChange={(date) => setStartDateTime(date)}
                />
            </DemoContainer>
        </LocalizationProvider>
        
        <Typography>End Date </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={["DateTimePicker", "DateTimePicker"]}
            >
                <DateTimePicker
                    label="End time"
                    viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                        seconds: renderTimeViewClock,
                    }}
                    value={endDateTime}
                    onChange={(date) => setEndDateTime(date)}
                />
            </DemoContainer>
        </LocalizationProvider>
       
    </DialogContent>
    <DialogActions>
        <Button onClick={handleSchedule}>Schedule</Button>
    </DialogActions>
</Dialog>
</>
    
  );
}


