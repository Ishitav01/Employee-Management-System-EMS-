import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const initialEmployees = [
    { id: 1, name: "Ankit Rawat", email: "ankit@example.com", designation: "Software Engineer", salary: 65000 },
    { id: 2, name: "Ishita Verma", email: "ishita@example.com", designation: "Data Analyst", salary: 55000 },
    { id: 3, name: "Rohit Kumar", email: "rohit@example.com", designation: "Backend Developer", salary: 60000 },
  ];

  const [employees] = useState(initialEmployees);
  const [searchField, setSearchField] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = employees.filter((emp) =>
    String(emp[searchField]).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ems-root">
      <header className="ems-header">
        <div className="ems-logo">EMS</div>
        <Button variant="outlined" className="btn-logout" style={{ color: "white", borderColor: "white" }}>Logout</Button>
      </header>

      <div className="ems-container">
        <div className="toolbar">
          <FormControl fullWidth>
            <InputLabel>Filter by</InputLabel>
            <Select
              value={searchField}
              label="Filter by"
              onChange={(e) => setSearchField(e.target.value)}
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="designation">Designation</MenuItem>
              <MenuItem value="id">ID</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label={`Search by ${searchField}`}
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
          />

          <Button variant="contained" className="btn-add" style={{ backgroundColor: "#008080" }}>+ Add Employee</Button>
        </div>

        <TableContainer component={Paper} className="table-wrap">
          <Table className="ems-table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">No employees found.</TableCell>
                </TableRow>
              ) : (
                filtered.map((emp) => (
                  <TableRow key={emp.id} hover>
                    <TableCell>{emp.id}</TableCell>
                    <TableCell>{emp.name}</TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>{emp.designation}</TableCell>
                    <TableCell>{emp.salary.toLocaleString()}</TableCell>
                    <TableCell align="right">
                      <Button size="small" variant="outlined" style={{ marginRight: "8px", borderColor: "#008080", color: "#008080" }}>Edit</Button>
                      <Button size="small" variant="contained" style={{ backgroundColor: "#d9534f" }}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}