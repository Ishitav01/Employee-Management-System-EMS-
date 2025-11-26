import { Button } from '@mui/material'
import React from 'react'

export default function HeaderWrapper({children}) {
  return (
    <>
    <header className="ems-header">
        <div className="ems-logo">EMS</div>
        <Button variant="outlined" className="btn-logout" >Logout</Button>
      </header>
      {children}
    </>
  )
}
