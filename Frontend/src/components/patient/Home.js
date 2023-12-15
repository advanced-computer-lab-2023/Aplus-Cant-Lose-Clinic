import * as React from 'react';
import { Paper, Tooltip, Button, Avatar, Container, Menu, Typography, IconButton, Toolbar, Box, AppBar } from '@mui/material';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import WalletIcon from '@mui/icons-material/Wallet';
import { NavLink } from 'react-router-dom';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import { WalletDialog } from '../WalletDialog.js';
import {useState} from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getNotifications } from '../../features/patientSlice.js';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';


function Home() {
    const styles = {
        marginRight: '10px',
        color: 'white'
    }
    const picstyle = {
        position: 'relative',
        margin: '10px',
        left: '45%',
    }
    const pic2style = {
        margin: '10px',
    }
    const textstyle = {
        position: 'relative',
        padding: '10px',
        right: '53%',
        marginTop: '10%',
    }
    const text2style = {
        padding: '10px',
        marginTop: '10%',
    }
    const divstyle = {
        display: 'flex',

    }


    const patientId = useSelector((state) => state.user.id);
  
    const dispatch= useDispatch();
    useEffect(() => {
     dispatch(getNotifications(patientId));
      console.log("notifiactionsssss");
      console.log(notifications)
    }, [dispatch]);

    const notifications = useSelector((state) => state.patient.notifications);
  

const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

   
   
    

    return (
        <>
        
    
        {/* {notifications.map((notification, index) => (
  <Snackbar key={index} open={true} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} >
    <MuiAlert elevation={6} variant="filled" severity={notification.type}>
      {notification.message}
    </MuiAlert>
  </Snackbar>
))} */}

    <Button
                variant="outlined"
                size="large"
                sx={{ width: "0", ml: "0%", mb: "0.5%",mt:"0px" ,borderRadius:"50%",alignItems: 'center',justifyContent: 'center',display: 'flex', }}
                onClick={handleOpenDialog}>
                   
                    <NotificationsIcon fontSize="small" sx={{color:"grey"}}/>
                
        </Button>

     <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Notifications</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {/* Add your list of notifications here */}
                    Notification 1: Something happened!
                    <br />
                    Notification 2: Another event occurred!
                    {/* Add more notifications as needed */}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
      </Dialog>


        
            <Paper sx={{ width: '60%', marginTop: '40px', marginLeft: '20%', boxShadow: "5px 5px 5px 5px #8585854a", }}>
                <div style={divstyle}>
                    <img src="../doctors.jpg" alt="doctors" width="50%" height="auto" style={picstyle} />
                    <Typography sx={{ margin: '10px' }} style={textstyle}>Here you can find Professional doctors in different specialities,
                        Find your doctor and schadule your appointment with us.
                    </Typography>
                </div>
                <NavLink to='/DoctorsList'>

                    <Button sx={{
                        color: 'white', borderRadius: '25px', backgroundColor: '#004E98',
                        margin: '10px', left: '40%', '&:hover': {
                            backgroundColor: 'grey',
                        },
                    }}>
                        Find Doctors
                    </Button>
                </NavLink>

            </Paper>
            <Paper sx={{ width: '60%', marginTop: '40px', marginLeft: '20%', boxShadow: "5px 5px 5px 5px #8585854a", }}>
                <div style={divstyle}>
                    <img src="https://img.freepik.com/free-photo/nurses-are-well-good-taken-care-elderly-woman-patients-hospital-bed-patients-feel-happiness-medical-healthcare-concept_1150-21696.jpg" alt="health pic" width="50%" height="auto" style={pic2style} />
                    <Typography sx={{ margin: '10px' }} style={text2style}>
                        Don't forget to subscripe to our health membership that will give
                        you and your family discounts to always check your health.
                    </Typography>
                </div>
                <NavLink to='/Home'>
                    <Button sx={{
                        color: 'white', borderRadius: '25px', backgroundColor: '#004E98',
                        margin: '10px', left: '40%', '&:hover': {
                            backgroundColor: 'grey',
                        },
                    }}>
                        Hospital membership
                    </Button>
                </NavLink>
            </Paper>


            <Snackbar open={false} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
      <MuiAlert elevation={6} variant="filled" severity="info">
        appointement is resuchudeled!!
      </MuiAlert>
    </Snackbar>
        </>
    );
}
export default Home;
