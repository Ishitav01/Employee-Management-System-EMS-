import React from 'react'

export default function AdminTable() {
    const [admins, setAdmins] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearch = useDebounce(searchQuery, 500);
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMode, setPopupMode] = useState("create"); // create/edit
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    // --------------------------------------------------
    // Load Admins
    // --------------------------------------------------
    useEffect(() => {
    const dummyAdmins = [
      { id: 1, username: "john_admin", name: "John Doe", email: "john@gmail.com" },
      { id: 2, username: "emma_admin", name: "Emma Watson", email: "emma@gmail.com" },
      { id: 3, username: "mike_admin", name: "Mike Walker", email: "mike@gmail.com" },
      { id: 4, username: "rita_admin", name: "Rita Smith", email: "rita@gmail.com" }
    ];
    setAdmins(dummyAdmins);
  }, []);
    useEffect(() => {
      loadAdmins();
    }, []);
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
      setSelectedAdmin(admin);
      setPopupMode("edit");
      setPopupOpen(true);
    };
    // --------------------------------------------------
    // Add Admin
    // --------------------------------------------------
    const handleAdd = () => {
      setPopupMode("create");
      setSelectedAdmin(null);
      setPopupOpen(true);
    };
    // --------------------------------------------------
    // Delete Admin
    // --------------------------------------------------
    const handleDelete = async (admin) => {
      if (!window.confirm("Do you want to delete this admin?")) return;
      try {
        await fetch(`http://localhost:8080/admin/${admin.id}`, {
          method: "DELETE"
        });
        loadAdmins();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    };
    
    return (
      <>
        {/* Popup */}
        <CreateOrEditAdminPopup
          open={popupOpen}
          onClose={() => {
            setPopupOpen(false);
            loadAdmins();
          }}
          mode={popupMode}
          data={selectedAdmin}
        />
        <div style={{ marginTop: "40px" }}>
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
                {filteredAdmins.length === 0 ? (
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
      </>
    );
  }