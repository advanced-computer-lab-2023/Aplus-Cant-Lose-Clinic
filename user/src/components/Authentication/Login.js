
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const Login = () => {
  return (

       <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
      <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
        />
           <TextField
          id="standard-password-input"
          label="Password"
          type="email"
          autoComplete="current-password"
          variant="standard"
        />
    </div>
      </Box>
  );
}

export default Login;
