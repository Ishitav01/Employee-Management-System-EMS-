import React, { useEffect, useMemo, useState } from 'react'
import useDebounce from '../hooks/useDebounce';
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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useAdmin } from '../api/useAdmin';

export default function AdminTable({adminData,handleDelete,setEditOpen,setAddOpen,setEditAdmin}) {
    const [admins, setAdmins] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearch = useDebounce(searchQuery, 500);
    

    
useEffect(() => {
  setAdmins(adminData || []);
}, [adminData]);



    // --------------------------------------------------
    // Search Filter
    // --------------------------------------------------
    const filteredAdmins = useMemo(() => {
      if (!debouncedSearch) return admins;
      return admins.filter((a) =>
        `${a.username} ${a.name} ${a.email}`
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase())
      );
    }, [admins, debouncedSearch]);
    // --------------------------------------------------
    // Edit Admin
    // --------------------------------------------------
    const handleEdit = (admin) => {
      setEditAdmin(admin)
      setEditOpen(true);
    };
    // --------------------------------------------------
    // Add Admin
    // --------------------------------------------------
    const handleAdd = () => {
      setEditAdmin(null);
      setAddOpen(true);
    };

    return (
      <>
       
    <Paper className="paper-root" elevation={0}>
    <div className="ems-root">
        <div className="ems-container2">
    <div className="toolbar">
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Admin Management
          </Typography>
          {/* Search */}
          <TextField
            label="Search Admin"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Add Button */}
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            startIcon={<PersonAddIcon />}
            onClick={handleAdd}
          >
            Add Admin
          </Button>
          </div>
          {/* Admin Table */}
          <TableContainer component={Paper} className="table-container">
            <Table stickyHeader aria-label="admin table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>S.No</strong></TableCell>
                  <TableCell><strong>USERNAME</strong></TableCell>
                  <TableCell><strong>FULL NAME</strong></TableCell>
                  <TableCell><strong>EMAIL</strong></TableCell>
                  <TableCell><strong>ACTIONS</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!filteredAdmins || filteredAdmins.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No admins found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAdmins.map((a, index) => (
                    <TableRow key={a.id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{a.username}</TableCell>
                      <TableCell>{a.name}</TableCell>
                      <TableCell>{a.email}</TableCell>
                      <TableCell sx={{ display: "flex", gap: "10px" }}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleEdit(a)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          color="error"
                          onClick={() => handleDelete(a)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
</div>
</div>
        </Paper>
      </>
    );
  }