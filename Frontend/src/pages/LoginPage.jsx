import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import "../styles/LoginPage.css"
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

export default function LoginPage() {
    const [login,setLogin] = useState(true);

    const handleLoginChange = () => {
        setLogin(prevState => !prevState);
    }

    const handleLogin = () => {

        
    }

  return (
    <div className='login-page'>
        <div className='login-card'>
            {/* <h2>Welcome Back</h2> */}
            {/* <h3>Employee Management System</h3> */}
            <Typography variant='h4'>Welcome Back</Typography>
            <Typography variant='body1'>Employee Management System</Typography>
            {
                !login && <Box>
                    <TextField fullWidth id="outlined-basic" label="Name" variant="outlined" />
                    <TextField
                    select
                    label="Designation"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                >
                    <MenuItem value="HR">HR</MenuItem>
                    <MenuItem value="Developer">Developer</MenuItem>
                    <MenuItem value="Delivery">Delivery</MenuItem>
                    <MenuItem value="Designer">Designer</MenuItem>
                    <MenuItem value="Sales">Sales</MenuItem>
                </TextField>
                    </Box>
            }
            <TextField id="outlined-basic" label="Email" variant="outlined" />
            <TextField id="outlined-basic" label="Password" variant="outlined" />
            {
                login ? <Typography color={"primary"} sx={{cursor : "pointer"}} onClick={handleLoginChange} variant="caption">Not a member? Sign up now!</Typography> : <Typography sx={{cursor : "pointer"}} variant="caption" color={"primary"} onClick={handleLoginChange}>Already a member? Sign in</Typography>
            }
            
            {
                login ? <Button className='login-button' onClick={handleLogin} variant="contained">Sign in</Button> : <Button className='login-button' variant="contained" onClick={handleLogin}>Register</Button>
            }
        </div>
    </div>
  )
}
