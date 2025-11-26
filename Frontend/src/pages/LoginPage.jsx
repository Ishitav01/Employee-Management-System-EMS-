import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import "../styles/LoginPage.css"
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';
import { DESIGNATIONS } from '../utils/designation';
import { ROLES } from '../utils/roles';

export default function LoginPage() {
    const [login, setLogin] = useState(true);

    const { showSnackbar } = useSnackbar();

    const navigate = useNavigate();

    const handleLoginChange = () => {
        setValue("email", "");
        setValue("name", "");
        setValue("password", "");
        setValue("designation", "");
        setLogin(prevState => !prevState);
    }

    const handleLogin = (data) => {
        console.log("Form Submitted:", data);
        navigate("/dashboard");
        showSnackbar(`Hello ${watch("name") ? watch("name") : watch("email") ? watch("email") : "Anonymous"}, Welcome!`, "success");
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
                <Box className="login-header">
                    <AccountCircleIcon className='icon' />
                    <Typography variant='h5' fontWeight={600} fontStyle={"oblique"}>Employee Management System</Typography>
                </Box>
                {
                    !login && <>
                        <TextField fullWidth id="outlined-basic-0" label="Name" variant="outlined"
                            {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 3,
                                    message: "Name should be at least 3 characters",
                                },
                            })}
                            error={!!errors.name}
                            helperText={errors.name?.message} />
                        <TextField
                            select
                            label="Designation"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            {...register("designation", {
                                required: "Designation is required"
                            })}
                            error={!!errors.designation}
                            helperText={errors.designation?.message}
                            defaultValue={"Developer"}
                        >
                            {
                                DESIGNATIONS.map((d) => (
                                    <MenuItem value={d}>{d}</MenuItem>
                                ))
                            }
                        </TextField>

                        <TextField
                            select
                            label="Roles"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            {...register("roles", {
                                required: "Roles is required"
                            })}
                            error={!!errors.designation}
                            helperText={errors.designation?.message}
                            defaultValue={"user"}
                        >
                            {
                                ROLES.map((temp) => (
                                    <MenuItem value={temp?.value}>{temp?.name}</MenuItem>
                                ))
                            }
                        </TextField>
                    </>
                }
                <TextField id="outlined-basic-1" label="Email" variant="outlined"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format"
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message} />
                <TextField id="outlined-basic-2" label="Password" variant="outlined" type='password' {...register("password", {
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
                    helperText={errors.password?.message} />
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
