import React, { useEffect, useState } from 'react';
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
import { useLoginContext } from '../context/UserContext';
import { useLogin } from '../api/useLogin';

export default function LoginPage() {

    const [login, setLogin] = useState(true);
    const [responseData, setResponseData] = useState(null);
    const [responseError, setResponseError] = useState(null);
    // const { userData,setUserData} = useLoginContext();

    const { showSnackbar } = useSnackbar();
    const { userLogin, userRegister } = useLogin();

    const navigate = useNavigate();

    const handleLoginChange = () => {
        setValue("email", "");
        setValue("name", "");
        setValue("password", "");
        setValue("designation", "");
        setValue("username", "");
        setLogin(prevState => !prevState);
        reset();
    }

    const handleLogin = async (data) => {

        var data;
        console.log("comes here")

        if (login) {
            const jsonData = {
                username: watch("username"),
                password: watch("password")
            }

            data = await userLogin(jsonData);
        }
        else {
            console.log("Register here..")
            const jsonData = {
                username: watch("username"),
                email: watch("email"),
                password: watch("password"),
                name: watch("name"),
                role: watch("roles"),
                salary : watch("salary"),
                designation : watch("designation")
            }

            data = await userRegister(jsonData);
        }

        if (data.success) {
            setResponseData(data?.data);
            localStorage.setItem("userData", JSON.stringify(data?.data));
            showSnackbar(`Hello ${watch("username") ? watch("username") : "Anonymous"}, Welcome!`, "success");
            navigate("/dashboard");
        }
        else {
            setResponseError(data?.data)
            showSnackbar(`Login failed : ${data?.data}`, "error");
        }
    };


    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData") || "null");
        if (userData) {
            navigate("/dashboard");
            showSnackbar("You are already logged in!", "success");
        }
    }, [])

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


                        <TextField fullWidth className='text-fields' id="outlined-basic-5" label="Name" variant="outlined"
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
                            className='text-fields'
                            label="Roles"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            {...register("roles", {
                                required: "Roles is required"
                            })}
                            error={!!errors.roles}
                            helperText={errors.roles?.message}
                            defaultValue={"ROLE_USER"}
                        >
                            {
                                ROLES.map((temp) => (
                                    <MenuItem value={temp?.value}>{temp?.name}</MenuItem>
                                ))
                            }
                        </TextField >

                        <TextField
                            select
                            className='text-fields'
                            label="Designation"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            {...register("designation", {
                                required: "Designation is required"
                            })}
                            error={!!errors.designation}
                            helperText={errors.designation?.message}
                            defaultValue={"HR"}
                        >
                            {
                                DESIGNATIONS.map((temp) => (
                                    <MenuItem value={temp}>{temp}</MenuItem>
                                ))
                            }
                        </TextField >
                        <TextField className='text-fields' id="outlined-basic-1" label="Email" variant="outlined"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email format"
                                }
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message} />

                        <TextField fullWidth className='text-fields' id="outlined-basic-5" label="Salary" variant="outlined"
                            {...register("salary", {
                                required: "Salary is required"
                            })}
                            error={!!errors.salary}
                            helperText={errors.salary?.message} />
                    </>
                }
                <TextField className='text-fields' fullWidth id="outlined-basic-0" label="Username" variant="outlined"
                    {...register("username", {
                        required: "Username is required",
                        minLength: {
                            value: 3,
                            message: "Username should be at least 3 characters",
                        },
                    })}
                    error={!!errors.username}
                    helperText={errors.username?.message} />
                <TextField className='text-fields' id="outlined-basic-2" label="Password" variant="outlined" type='password' {...register("password", {
                    required: "Password is required",
                    // minLength: {
                    //     value: 6,
                    //     message: "Password must be at least 6 characters",
                    // },
                    // pattern: {
                    //     value: /^(?=.*[A-Z])(?=.*\d).+$/,
                    //     message: "Must contain 1 uppercase letter & 1 number",
                    // },
                })}
                    error={!!errors.password}
                    helperText={errors.password?.message} />
                {
                    login ? <Typography color={"primary"} sx={{ cursor: "pointer" }} onClick={handleLoginChange} variant="caption">Not a member? Sign up now!</Typography> : <Typography sx={{ cursor: "pointer" }} variant="caption" color={"primary"} onClick={handleLoginChange}>Already a member? Sign in</Typography>
                }
                {
                    login ? <Button className='login-button' onClick={handleSubmit(handleLogin)} variant="contained">Sign in</Button> : <Button className='login-button' variant="contained" onClick={ handleSubmit(handleLogin)}>Register</Button>
                }
            </div>
        </div>
    )
}
