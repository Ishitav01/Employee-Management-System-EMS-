import { useEffect, useState } from "react"
import Dashboard from "./Dashboard"
import AddEditEmployee from "../../components/AddEditEmployee";
import { useLoginContext } from "../../context/UserContext";
import { useSnackbar } from "../../context/SnackbarContext";
import { useNavigate } from "react-router-dom";


const DashboardPage = () => {
    
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen,setAddOpen] = useState(false)
    const [employeeData,setEmployeeData] = useState(null);
    const navigate = useNavigate();
    const [user,setUser] = useState(null);

    const {showSnackbar} = useSnackbar();

    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("userData") || "null");
      if(!userData){
        navigate("/");
        showSnackbar("You are not logged in!","error");
      }
      setUser(userData);
    },[])

    return (
        <>
        <Dashboard  user={user} setEditOpen={setEditOpen} setAddOpen={setAddOpen} setEmployeeData={setEmployeeData}/>
        { editOpen && (
                              <AddEditEmployee
                                open={editOpen}
                                handleClose={() => setEditOpen(false)}
                                data={employeeData}
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