// Dashboard.jsx
import React, { useState, useMemo, useEffect } from "react";
import AddEditEmployee from "../../components/AddEditEmployee";
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
  TablePagination,
  Typography
} from "@mui/material";
import useDebounce from "../../hooks/useDebounce";
import { Outlet } from "react-router-dom";
import '../../styles/Dashboard.css'
import { initialEmployees } from "../../utils/initialEmployees";
import NoEmployeeFound from "../../components/NoEmployeeFound";

export default function Dashboard({setEditOpen, setAddOpen,setEmployeeData}) {
  
  const [employees,setEmployees] = useState(initialEmployees);
  const [searchField, setSearchField] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const filtered = useMemo(() => {
    if (!debouncedSearchQuery) return employees;
    return employees.filter((emp) =>
      String(emp[searchField]).toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [employees, searchField, debouncedSearchQuery]);

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
  const handleEditClick = (emp) => {
    setEmployeeData(emp);
    setEditOpen(true);
  };
  const handleAddClick = () => {
  setEmployeeData(null);   
  setAddOpen(true);         
};

  return (
    <Paper className="paper-root" elevation={0}>
      <Outlet />
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

            <Button variant="contained" className="btn-add" onClick={handleAddClick}>+ Add Employee</Button>
          </div>
            <div>
              {
                employees.length > 0 ? <>
                <TableContainer component={Paper} className="table-container">
            <Table stickyHeader aria-label="employee table">
              <TableHead>
                <TableRow>
                  <TableCell><Typography fontWeight={700}>ID</Typography></TableCell>
                  <TableCell><Typography fontWeight={700}>NAME</Typography></TableCell>
                  <TableCell><Typography fontWeight={700}>EMAIL</Typography></TableCell>
                  <TableCell><Typography fontWeight={700}>DESIGNATION</Typography></TableCell>
                  <TableCell><Typography fontWeight={700}>SALARY</Typography></TableCell>
                  <TableCell><Typography fontWeight={700}>ACTIONS</Typography></TableCell>
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
                      <TableCell sx={{
                        display : 'flex',
                        flexDirection : 'row',
                        gap : '20px',
                        alignItems : 'center'
                      }}>
                        <Button
                         size="small" variant="contained" className="btn-edit" onClick={() => handleEditClick(emp)}
                        >Edit</Button>
                        <Button
                        size="small" variant="contained" className="btn-delete">Delete</Button>
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
                </> : <>
                <NoEmployeeFound onAddEmployee={handleAddClick}/>
                </>
              }
            </div>
          
        </div>
      </div>
    </Paper>
  );
}
