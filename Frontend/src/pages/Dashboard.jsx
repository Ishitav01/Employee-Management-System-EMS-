// Dashboard.jsx
import React, { useState, useMemo } from "react";
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
  FormControl,
  TablePagination
} from "@mui/material";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const initialEmployees = [
{ id: 1, name: "Ankit Rawat", email: "ankit@example.com", designation: "Software Engineer", salary: 65000 },
{ id: 2, name: "Ishita Verma", email: "ishita@example.com", designation: "Data Analyst", salary: 55000 },
{ id: 3, name: "Rohit Kumar", email: "rohit@example.com", designation: "Backend Developer", salary: 60000 },
{ id: 4, name: "Sneha Patel", email: "sneha@example.com", designation: "Frontend Developer", salary: 58000 },
{ id: 5, name: "Karan Mehta", email: "karan@example.com", designation: "DevOps Engineer", salary: 62000 },
{ id: 6, name: "Maya Singh", email: "maya@example.com", designation: "QA Engineer", salary: 50000 },
{ id: 7, name: "Ravi Sharma", email: "ravi@example.com", designation: "Project Manager", salary: 75000 },
{ id: 8, name: "Pooja Nair", email: "pooja@example.com", designation: "UI/UX Designer", salary: 54000 },
{ id: 9, name: "Aman Gupta", email: "aman@example.com", designation: "Cloud Engineer", salary: 68000 },
{ id: 10, name: "Divya Rao", email: "divya@example.com", designation: "HR Manager", salary: 59000 },
{ id: 11, name: "Sarthak Jain", email: "sarthak@example.com", designation: "Mobile Developer", salary: 61000 },
{ id: 12, name: "Neha Kapoor", email: "neha@example.com", designation: "Business Analyst", salary: 52000 },
{ id: 13, name: "Farhan Ali", email: "farhan@example.com", designation: "Software Tester", salary: 48000 },
{ id: 14, name: "Kritika Shah", email: "kritika@example.com", designation: "Marketing Executive", salary: 46000 },
{ id: 15, name: "Suresh Yadav", email: "suresh@example.com", designation: "Network Engineer", salary: 63000 },
{ id: 16, name: "Tanya Bansal", email: "tanya@example.com", designation: "Full Stack Developer", salary: 70000 },
{ id: 17, name: "Harsh Singh", email: "harsh@example.com", designation: "Support Engineer", salary: 45000 },
{ id: 18, name: "Meera Joshi", email: "meera@example.com", designation: "Product Owner", salary: 80000 },
{ id: 19, name: "Varun Desai", email: "varun@example.com", designation: "Scrum Master", salary: 72000 },
{ id: 20, name: "Nikita Reddy", email: "nikita@example.com", designation: "Content Writer", salary: 42000 }
];

  const [employees] = useState(initialEmployees);
  const [searchField, setSearchField] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const filtered = useMemo(() => {
    if (!searchQuery) return employees;
    return employees.filter((emp) =>
      String(emp[searchField]).toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [employees, searchField, searchQuery]);

  // Slice the filtered results for current page
  const visibleRows = useMemo(() => {
    const start = page * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper className="paper-root" elevation={0}>
      <header className="ems-header">
          <div className="ems-logo">EMS</div>
          <Button variant="outlined" className="btn-logout">Logout</Button>
      </header>
      <div className="ems-root">
        <div className="ems-container">
          <div className="toolbar">
            <FormControl fullWidth>
              <InputLabel id="filter-label">Filter by</InputLabel>
              <Select
                labelId="filter-label"
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

            <Button variant="contained" className="btn-add">+ Add Employee</Button>
          </div>

          {/* Table with sticky header and full width */}
          <TableContainer component={Paper} className="table-container">
            <Table stickyHeader aria-label="employee table">
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
                {visibleRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">No employees found.</TableCell>
                  </TableRow>
                ) : (
                  visibleRows.map((emp, idx) => (
                    <TableRow key={`${emp.id}-${idx}`} hover>
                      <TableCell>{emp.id}</TableCell>
                      <TableCell>{emp.name}</TableCell>
                      <TableCell>{emp.email}</TableCell>
                      <TableCell>{emp.designation}</TableCell>
                      <TableCell>{emp.salary.toLocaleString()}</TableCell>
                      <TableCell align="right">
                        <Button size="small" variant="outlined" className="btn-edit">Edit</Button>
                        <Button size="small" variant="contained" className="btn-delete">Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={15}
            component="div"
            count={filtered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </Paper>
  );
}
