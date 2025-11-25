import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import "../styles/LoadingPage.css"

export default function LoadingPage() {
  return (
    <Box className="loading-page">
        <CircularProgress size={70} thickness={20}/>
    </Box>
  )
}
