import { useEffect, useState } from "react"
import Dashboard from "./Dashboard"
import AddEditEmployee from "../../components/AddEditEmployee";
import { useLoginContext } from "../../context/UserContext";
import { useSnackbar } from "../../context/SnackbarContext";
import { useNavigate } from "react-router-dom";
import { useEmployee } from "../../api/useEmployee";
import AdminTable from "../../components/AdminTable";
import CreateOrEditAdminPopup from "../../components/CreateOrEditAdminPopup";
import ProfileCard from "../ProfileCard";
import useAdmin from "../../api/useAdmin";


const DashboardPage = () => {
    
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen,setAddOpen] = useState(false)
    const [employeeData,setEmployeeData] = useState(null);
    const [editEmployee,setEditEmployee] = useState(null);


    const [editAdminOpen,setEditAdminOpen] = useState(false);
    const [addAdminOpen,setAddAdminOpen] = useState(false);
    const [adminData,setAdminData] = useState(null);
    const [editAdmin,setEditAdmin] = useState(null);


    const navigate = useNavigate();
    const [user,setUser] = useState(null);

    const {showSnackbar} = useSnackbar();
    const { getAllEmployeesAdmin,deleteEmployee } = useEmployee();
    const { getAllAdmins,removeAdmin } = useAdmin();

    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("userData") || "null");
      console.log(userData);
      if(!userData){
        navigate("/");
        showSnackbar("You are not logged in!","error");
      }
      setUser(userData);
      if(userData.role !== "ROLE_USER"){
        fetchEmployeeData(); 
      }

      if(userData.role === "ROLE_CEO"){
        fetchAdminData();
      }
    },[addOpen,editOpen])

    const fetchEmployeeData = async () => {
        const employees = await getAllEmployeesAdmin();
        setEmployeeData([...employees]);
    }

    const fetchAdminData = async () => {
      const admins = await getAllAdmins();
      setAdminData([...admins]);
    }

    const handleDelete = async (emp) => {
    await deleteEmployee(emp.id)
    setEmployeeData(prev => prev.filter((temp) => temp.id !== emp.id));
  }

  const handleAdminDelete = async (emp) => {
    await removeAdmin(emp.username);
    setAdminData(prevState => prevState.filter((temp) => emp.username !== temp.username ));
  }

  useEffect(() => {
    console.log(editAdmin);

  },[editAdmin])
  return (
        <>
        {
        (user?.role === "ROLE_CEO" || user?.role === "ROLE_ADMIN") && (
        <Dashboard setEditOpen={setEditOpen} setAddOpen={setAddOpen} setEditEmployee={setEditEmployee} employees={employeeData} handleDelete={handleDelete} />
        )
      }
      {
        user?.role === "ROLE_USER" && (
          <ProfileCard />
        )
      }
        { user?.role === "ROLE_CEO" && editOpen && (
                              <AddEditEmployee
                                open={editOpen}
                                handleClose={() => setEditOpen(false)}
                                data={editEmployee}
                                setEmployeeData={setEmployeeData}
                             
                              />
                            )}
        { user?.role === "ROLE_CEO" && addOpen && (
                              <AddEditEmployee
                                open={addOpen}
                                handleClose={() => setAddOpen(false)}
                                data={null}
                              />
                            )}

          { user?.role === "ROLE_CEO" &&  
                         ( <AdminTable 
                         adminList={adminData}
                         handleDelete={handleAdminDelete}
                         setEditOpen={setEditAdminOpen}
                         setAddOpen={setAddAdminOpen}
                         setEditAdmin={setEditAdmin}
                         /> )
                            }
          {
            user?.role === "ROLE_CEO" && editAdminOpen && (
              <CreateOrEditAdminPopup 
              open={editAdminOpen}
              onClose={() => setEditAdminOpen(false)}
              data = {editAdmin}
              setAdminData = {setAdminData}
              />
            )
          }
          {
            user?.role === "ROLE_CEO" && addAdminOpen && (
              <CreateOrEditAdminPopup 
              open={addAdminOpen}
              onClose={() => setAddAdminOpen(false)}
              data={null}
              />
            )
          }
        </>
    )
}

export default DashboardPage;