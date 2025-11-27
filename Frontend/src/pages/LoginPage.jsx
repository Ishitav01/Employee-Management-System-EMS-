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
import {  useLoginContext } from '../context/UserContext';
import { useLogin } from '../api/useLogin';

export default function LoginPage() {

    const [login, setLogin] = useState(true);
    const [responseData, setResponseData] = useState(null);
    const [responseError,setResponseError] = useState(null);
    const { setUserData} = useLoginContext();

    const { showSnackbar } = useSnackbar();
    const {userLogin, userRegister} = useLogin();

    const navigate = useNavigate();

    const handleLoginChange = () => {
        setValue("email", "");
        setValue("name", "");
        setValue("password", "");
        setValue("designation", "");
        setLogin(prevState => !prevState);
        reset();
    }

    const handleLogin = async (data) => {
        
        var data;

        if(login){
            const jsonData = {
            username : watch("username"),
            password : watch("password")
            }

            data= await userLogin(jsonData);
        }
        else{
            const jsonData = {
                username : watch("username"),
                email : watch("email"),
                password : watch("password"),
                name : watch("name"),
                role : watch("roles")
                }
    
            data= await userRegister(jsonData);
        }

        if(data.success){
            setResponseData(data?.data);
            setUserData(data?.data);
            navigate("/dashboard");
        }
        else{
            setResponseError(data?.data)
        }
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
                    {/* <Typography className='animated-gradient' variant='h5'>Employee Management System</Typography> */}
                </Box>
                {
                    !login && <>

                       
                        <TextField fullWidth id="outlined-basic-5" label="Name" variant="outlined"
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
                    </>
                }
                 <TextField fullWidth id="outlined-basic-0" label="Username" variant="outlined"
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 3,
                                    message: "Username should be at least 3 characters",
                                },
                            })}
                            error={!!errors.name}
                            helperText={errors.name?.message} />
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
                    responseError && <Typography color={"error"} variant={"body2"}>{responseError}</Typography>
                }
                {
                    login ? <Button className='login-button' onClick={handleSubmit(handleLogin)} variant="contained">Sign in</Button> : <Button className='login-button' variant="contained" onClick={handleSubmit(handleLogin)}>Register</Button>
                }
            </div>
        </div>
    )
}
