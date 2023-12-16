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


        
            <Paper sx={{ width: '60%', marginTop: '40px', marginLeft: '20%', boxShadow: "5px 5px 5px 5px #8585854a", }}>
                <div style={divstyle}>
                    <img src="../doctors.jpg" alt="doctors" width="50%" height="auto" style={picstyle} />
                    <Typography sx={{ margin: '10px',fontSize:"20px" ,ml:"30px"}} style={textstyle}>Here you can find Professional doctors in different specialities,
                        Find your doctor and schadule your appointment with us.
                    </Typography>
                </div>
                <NavLink to='/DoctorsList'>

                    <Button sx={{
                        color: 'white', borderRadius: '25px', backgroundColor: '#004E98',
                        width:"300px",
                        margin: '10px', left: '50%', '&:hover': {
                            backgroundColor: 'grey',
                        },
                    }}>
                        Find Doctors
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
