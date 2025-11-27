import { Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginContext } from '../context/UserContext';

export default function HeaderWrapper({children}) {

  const navigate = useNavigate();
  const {setUserData} = useLoginContext();



  const handleLogout = () => {
    localStorage.setItem("userData","null");
    navigate("/")
  }

  return (
    <>
    <header className="ems-header">
        <Typography variant='h6'>Employee Management System</Typography>
        <Button variant="outlined" className="btn-logout" onClick={handleLogout}>Logout</Button>
      </header>
      {children}
    </>
  )
}
