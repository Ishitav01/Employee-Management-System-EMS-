import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import "../styles/LoginPage.css"
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [login, setLogin] = useState(true);

    const navigate = useNavigate();

    const handleLoginChange = () => {
        setValue("email","");
        setValue("name","");
        setValue("password","");
        setValue("designation","");
        setLogin(prevState => !prevState);
    }

  const handleLogin = (data) => {
  console.log("Form Submitted:", data);
  navigate("/dashboard");
};


      const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm();

  
    return (
        <div className='login-page'>
            <div className='login-card'>
                {/* <h2>Welcome Back</h2> */}
                {/* <h3>Employee Management System</h3> */}
                <Box className="login-header">
                    {/* <Typography variant='h4'>Welcome Back</Typography> */}
                    <AccountCircleIcon className='icon' />
                    <Typography variant='h5' >Employee Management System</Typography>
                </Box>
                {
                    !login && <Box>
                        <TextField fullWidth id="outlined-basic" label="Name" variant="outlined" 
                        {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name should be at least 3 characters",
                },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}/>
                        <TextField
                            select
                            label="Designation"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            {...register("designation", {
                required: "Designation is required"
              })}
              error={!!errors.designation}
              helperText={errors.designation?.message}
                        >
                            <MenuItem value="HR">HR</MenuItem>
                            <MenuItem value="Developer">Developer</MenuItem>
                            <MenuItem value="Delivery">Delivery</MenuItem>
                            <MenuItem value="Designer">Designer</MenuItem>
                            <MenuItem value="Sales">Sales</MenuItem>
                        </TextField>
                    </Box>
                }
                <TextField id="outlined-basic" label="Email" variant="outlined"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format"
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message} />
                <TextField id="outlined-basic" label="Password" variant="outlined" type='password' {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d).+$/,
              message: "Must contain 1 uppercase letter & 1 number",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}/>
                {
                    login ? <Typography color={"primary"} sx={{ cursor: "pointer" }} onClick={handleLoginChange} variant="caption">Not a member? Sign up now!</Typography> : <Typography sx={{ cursor: "pointer" }} variant="caption" color={"primary"} onClick={handleLoginChange}>Already a member? Sign in</Typography>
                }

                {
                    login ? <Button className='login-button' onClick={handleSubmit(handleLogin)} variant="contained">Sign in</Button> : <Button className='login-button' variant="contained" onClick={handleSubmit(handleLogin)}>Register</Button>
                }
            </div>
        </div>
    )
}
