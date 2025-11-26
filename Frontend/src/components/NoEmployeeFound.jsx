import React from "react";
import { Box, Typography, Button } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export default function NoEmployeeFound({ onAddEmployee }) {
  return (
    <Box className="nef-container">
      <SearchOffIcon className="search-off-icon" />

      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        No Employees Found
      </Typography>

      <Typography variant="body1" sx={{ mt: 1, mb: 3 }}>
        Try adding a new employee to get started.
      </Typography>

      <Button
        variant="contained"
        className="add-btn"
        onClick={onAddEmployee}
      >
        Add Employee
      </Button>
    </Box>
  );
}
