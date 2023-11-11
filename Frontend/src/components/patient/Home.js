import * as React from 'react';
import { Paper, Tooltip, Button, Avatar, Container, Menu, Typography, IconButton, Toolbar, Box, AppBar } from '@mui/material';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import WalletIcon from '@mui/icons-material/Wallet';
import { NavLink } from 'react-router-dom';
import { WalletDialog } from '../WalletDialog.js';
import {useState} from 'react'

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

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
      setDialogOpen(true);
    };
  
    const handleCloseDialog = () => {
      setDialogOpen(false);
    };


    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#004E98' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters >
                        <Typography
                            variant="h6"
                            sx={{
                                mr: 2,
                                display: { xs: '2', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            HomePage
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                            </IconButton>
                            <Menu

                            >
                            </Menu>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: '2', md: 'flex' } }}>
                            <NavLink to='/viewfamilymembers'>
                                <Button sx={{ color: 'white' }}>
                                    <IconButton>
                                        <FamilyRestroomIcon style={styles}></FamilyRestroomIcon>
                                    </IconButton>
                                    <Typography >view Family Members</Typography>
                                </Button>
                            </NavLink>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: '2', md: 'flex' } }}>
                            <NavLink to='/Appointments'>
                                <Button sx={{ color: 'white' }}>
                                    <IconButton>
                                        <CalendarMonthIcon style={styles}  ></CalendarMonthIcon>
                                    </IconButton>
                                    <Typography >My Appointments</Typography>
                                </Button>
                            </NavLink>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: '2', md: 'flex' } }}>
                            <NavLink to='/Home'>
                                <Button sx={{ color: 'white' }}>
                                    <IconButton>
                                        <MedicalInformationIcon style={styles} ></MedicalInformationIcon>
                                    </IconButton>
                                    <Typography >My Health Records</Typography>
                                </Button>
                            </NavLink>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: '2', md: 'flex' } }}>
                            <NavLink to='/ListOfPrescriptions'>
                                <Button sx={{ color: 'white' }}>
                                    <IconButton>
                                        <VaccinesIcon style={styles} ></VaccinesIcon>
                                    </IconButton>
                                    <Typography >My Percriptions</Typography>
                                </Button>
                            </NavLink>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: '2', md: 'flex' } }}>
                            <NavLink to='/ViewHealthPackage'>
                                <Button sx={{ color: 'white' }}>
                                    <IconButton>
                                        <VaccinesIcon style={styles} ></VaccinesIcon>
                                    </IconButton>
                                    <Typography >view health packages</Typography>
                                </Button>
                            </NavLink>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: '2', md: 'flex' } }}>
                            <NavLink to='/MedHist'>
                                <Button sx={{ color: 'white' }}>
                                    <IconButton>
                                        <VaccinesIcon style={styles} ></VaccinesIcon>
                                    </IconButton>
                                    <Typography >Medical History </Typography>
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
                                    <WalletDialog open={dialogOpen} onClose={handleCloseDialog} type='patient'/>
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
        </>
    );
}
export default Home;
