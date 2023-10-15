import React from 'react'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, TextField, Typography } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import { editDoctorCredentials,getDr } from '../../features/doctorSlice';
import { useEffect ,useContext} from 'react';
import { SnackbarContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }


export default function DocProfile() {
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const dispatch = useDispatch()
    const id = useSelector((state) => state.user.id);
    useEffect(() => {
      dispatch(getDr(id));
    }, [dispatch]);
const navigate=useNavigate();
  return (
    <Box
      sx={{ flexGrow: 1, boxSizing: 'border-box', padding: '5px', bgcolor: 'background.paper', display: 'flex', height: '100%' }}
    >

      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ width: '200px', borderColor: 'divider' }}
      >
        <Tab label="Edit Credentials"  />

      </Tabs>
      <TabPanel value={value} index={0}>
        <CredentialsEdit/>
        
      </TabPanel>

    </Box>
  )
}


const CredentialsEdit = () => {

    // TODO: make these states start as the old value of the
    // doctor's credentials.

    const snackbarMessage = useContext(SnackbarContext);

    const dispatch = useDispatch()
    const id = useSelector((state) => state.user.id);
    
    
const info = useSelector((state) => state.doctor.info);
console.log(info.email);
const [newEmail, setNewEmail] = React.useState(info.email)
const [newRate, setNewRate] = React.useState(info.rate)
const [newAffilation, setNewAffilation] = React.useState(info.affilation)
const navigate=useNavigate();
    const handleSave = () => {
        const response = dispatch(editDoctorCredentials({id:id,email: newEmail, rate: newRate, affilation: newAffilation}));
        response.then((responseData) => {
          console.log(responseData);
          if (responseData.payload === undefined) {
            snackbarMessage(`error: user not found`, "error");
          } else {
            snackbarMessage("You have successfully edited info", "success");
            navigate(-1);
        
          }
        });
    
    }


    return (
        <div style={{display: 'flex', gap: '10px', flexDirection: 'column'}}>
            <div style={{display: 'flex', gap:'5px', flexDirection:'row'}}>
                <Typography sx={{width: '300px'}}>
                    Edit Email
                </Typography>
                <TextField value={newEmail} onChange={(event) => {setNewEmail(event.target.value)}}  />
            </div>
            <div style={{display: 'flex', gap:'5px', flexDirection:'row'}}>
            <Typography sx={{width: '300px'}}>
                    Edit Hourly Rate
                </Typography>
                <TextField type='number' value={newRate} onChange={(event) => {setNewRate(event.target.value)}} />
            </div>
            <div style={{display: 'flex', gap:'5px', flexDirection:'row'}}>
            <Typography sx={{width: '300px'}}>
                    Edit Affiliation(Hospital)
                </Typography>
                <TextField value={newAffilation} onChange={(event) => {setNewAffilation(event.target.value)}}  />
            </div>
            <Button variant='contained' onClick={() => {handleSave()}}>Save Data</Button>

        </div>
    )
}
