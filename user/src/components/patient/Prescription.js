import React from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {Button,Typography,Paper,IconButton,Box,Grid} from "@mui/material";
import { Link } from 'react-router-dom';

const App = () => {
    const Info ={
        margin:"20px 20px",
        alignItems: "baseline",
    }
    const Infox ={
        margin:"10px 20px",
    }
    const subInfo ={
        margin:"0px 103px",
    }

    return (
        <>
<Paper sx={{ width: '60%', marginTop: '40px', marginLeft: '20%', boxShadow: "5px 5px 5px 5px #8585854a",}}>
  <Grid container spacing={2}>
    <Grid item xs={12} md={4}>
      <Box style={Info}>
        <Typography sx={{fontSize:'16px' }}>  <strong>Patient Name : </strong>Nardy Michelle</Typography>
        <Typography sx={{fontSize:'16px' }}> <strong>Age : </strong>20y</Typography>
        <Typography sx={{fontSize:'16px' }}> <strong>Gender : </strong>Male</Typography>
        <Typography sx={{fontSize:'16px' }}> <strong>Date : </strong>11/11/2011</Typography>
      </Box>
    </Grid>
    <Grid item xs={12} md={4}>
        <img src="/virtualclinic.png" alt="virtualclinic" width={"200px"} sx={{marginBottom:'50px'}} />
    </Grid>
    <Grid item xs={12} md={4}>
    
      <Box sx={{ margin:"20px 20px 0px 80px",}} >
        <Typography sx={{fontSize:'16px' }}> Dr. Ahmed</Typography>
        <Typography sx={{fontSize:'16px' }}> Dentist</Typography>
      </Box>
    </Grid>
    
  </Grid>

  <Typography style={Infox} sx={{fontSize:'18px' }}>Medicine 1:</Typography>
  <Typography style={subInfo} sx={{fontSize:'16px' }}>This Medicine used for .............</Typography>
  <Typography style={subInfo}sx={{fontSize:'16px' }}>Take after eating twice a day.</Typography>
  <Typography style={subInfo}sx={{fontSize:'16px' }}>For 2 weeks.</Typography>
  <Typography style={Infox} sx={{fontSize:'18px' }}>Medicine 2:</Typography>
  <Typography style={subInfo}sx={{fontSize:'16px' }}>This Medicine used for .............</Typography>
  <Typography style={subInfo}sx={{fontSize:'16px' }}>Take after eating twice a day.</Typography>
  <Typography style={subInfo}sx={{fontSize:'16px' }}>For 2 weeks.</Typography>

  <Paper sx={{ width: '100px', marginTop: '40px', marginLeft: '40%', boxShadow: 'none' ,display:'flex'}}>
    {true ? (
      <img src="/Pharmacy Stamp.png" alt="hospital stamp" width={"100px"} />
    ) : (
      ''
    )}
    <Link to={"/Home"}>
      <Button sx={{margin:'10px 0px 0px 50px',justifyItems:'center',color:'black',border:'black',left: "-350%" }}>
        <IconButton sx={{paddingLeft:'0px', } }>
          <ArrowBackIosIcon />
        </IconButton>
        Back
      </Button>
    </Link>
  </Paper>
</Paper>


        </>
    );
};

export default App;
