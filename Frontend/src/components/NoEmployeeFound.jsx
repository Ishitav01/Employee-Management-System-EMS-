import React from "react";
import { Box, Typography, Button } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export default function NoEmployeeFound({ onAddEmployee }) {
  return (
    <Box
      sx={{
        textAlign: "center",
        padding: "40px 20px",
        color: "#555",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
      }}
    >
      <SearchOffIcon sx={{ fontSize: 80, color: "grey.500", mb: 2 }} />

      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        No Employees Found
      </Typography>

      <Typography variant="body1" sx={{ mt: 1, mb: 3 }}>
        Try adding a new employee to get started.
      </Typography>

      <Button
        variant="contained"
        sx={{
          textTransform: "none",
          fontSize: "16px",
          borderRadius: "8px",
        }}
        onClick={onAddEmployee}
      >
        Add Employee
      </Button>
    </Box>
  );
}
