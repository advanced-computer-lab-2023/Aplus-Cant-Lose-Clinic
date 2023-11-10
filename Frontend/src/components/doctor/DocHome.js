import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Paper, Tooltip, Button, Avatar, Container, Menu, Typography, IconButton, Toolbar, Box, AppBar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GroupIcon from '@mui/icons-material/Group';
import WalletIcon from '@mui/icons-material/Wallet';
import { WalletDialog } from '../WalletDialog.js';
import {useState} from 'react'

export default function DocHome() {
console.log('im hiiim ')
const user = useSelector(state => state.user);



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
const [dialogOpen, setDialogOpen] = useState(false);

const handleOpenDialog = () => {
  setDialogOpen(true);
};

const handleCloseDialog = () => {
  setDialogOpen(false);
};




  return (
    // <div>DocHome
    // {  console.log(user)}
    // </div>





    <>
    <AppBar position="static" sx={{ backgroundColor: '#004E98' }}>
        <Container maxWidth="xl">
            <Toolbar disableGutters >
                <Typography
                    variant="h6"
                    sx={{
                        mr: 4,
                        display: { xs: '2', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    HomePage
                </Typography>

              
                <Box sx={{ flexGrow: 1, display: { xs: '2', md: 'flex' } }}>
                    <NavLink to='/PatientsList'>
                        <Button sx={{ color: 'white' }}>
                            <IconButton>
                                <FormatListBulletedIcon style={styles} ></FormatListBulletedIcon>
                            </IconButton>
                            <Typography >My Patients</Typography>
                        </Button>
                    </NavLink>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: '2', md: 'flex' } }}>
                    <NavLink to='/DocPatients'>
                        <Button sx={{ color: 'white' }}>
                            <IconButton>
                                <GroupIcon style={styles} ></GroupIcon>
                            </IconButton>
                            <Typography >Appointments</Typography>
                        </Button>
                    </NavLink>
                </Box>
                
                <Box sx={{ flexGrow: 1, display: { xs: '2', md: 'flex' } }}>
                    <div>
                        <>
                            <Button sx={{ color: 'white' }} onClick={()=>{handleOpenDialog()}}>
                                <IconButton>
                                    <WalletIcon style={styles} ></WalletIcon>
                                </IconButton>
                                <Typography >view wallet</Typography>
                            </Button>
                            <WalletDialog open={dialogOpen} onClose={handleCloseDialog} type='doctor'/>
                        </>
                    </div>
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
    
  
</>
  )
}
