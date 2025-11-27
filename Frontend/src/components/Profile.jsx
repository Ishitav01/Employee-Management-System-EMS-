import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../pages/ProfileCard.jsx";
import { CircularProgress, Box, Typography } from "@mui/material";

export default function Profile() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userEmail = "anup@example.com"; // ⬅️ replace with logged-in email

  useEffect(() => {
    axios
      .get(`https://your-api.com/employees/email/${userEmail}`)
      .then((res) => {
        setEmployee(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load profile");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" textAlign="center" mt={4} fontSize={18}>
        {error}
      </Typography>
    );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <ProfileCard
        name={employee.name}
        email={employee.email}
        designation={employee.designation}
        salary={employee.salary}
      />
    </Box>
  );
}
