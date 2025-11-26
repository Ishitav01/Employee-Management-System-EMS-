import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function HeaderWrapper({children}) {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/")
  }

  return (
    <>
    <header className="ems-header">
        <div className="ems-logo">EMS</div>
        <Button variant="outlined" className="btn-logout" onClick={handleLogout}>Logout</Button>
      </header>
      {children}
    </>
  )
}
