import { useEffect, useState } from "react"
import Dashboard from "./Dashboard"
import AddEditEmployee from "../../components/AddEditEmployee";
import { useLoginContext } from "../../context/UserContext";
import { useSnackbar } from "../../context/SnackbarContext";
import { useNavigate } from "react-router-dom";
import { useEmployee } from "../../api/useEmployee";


const DashboardPage = () => {
    
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen,setAddOpen] = useState(false)
    const [employeeData,setEmployeeData] = useState(null);
    const [editEmployee,setEditEmployee] = useState(null);
    const navigate = useNavigate();
    const [user,setUser] = useState(null);

    const {showSnackbar} = useSnackbar();
    const { getAllEmployeesAdmin,deleteEmployee } = useEmployee();

    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("userData") || "null");
      if(!userData){
        navigate("/");
        showSnackbar("You are not logged in!","error");
      }
      setUser(userData);
      fetchEmployeeData(); 
    },[addOpen,editOpen])

    const fetchEmployeeData = async () => {
        const employees = await getAllEmployeesAdmin();
        setEmployeeData([...employees]);
    }

    const handleDelete = async (emp) => {
    await deleteEmployee(emp.id)
    setEmployeeData(prev => prev.filter((temp) => temp.id !== emp.id));
  }

    return (
        <>
        <Dashboard  user={{role : "ROLE_ADMIN"}} setEditOpen={setEditOpen} setAddOpen={setAddOpen} setEditEmployee={setEditEmployee} employees={employeeData} handleDelete={handleDelete} />
        { editOpen && (
                              <AddEditEmployee
                                open={editOpen}
                                handleClose={() => setEditOpen(false)}
                                data={editEmployee}
                                setEmployeeData={setEmployeeData}
                             
                              />
                            )}
        { addOpen && (
                              <AddEditEmployee
                                open={addOpen}
                                handleClose={() => setAddOpen(false)}
                                data={null}
                              />
                            )}
        </>
    )
}

export default DashboardPage;