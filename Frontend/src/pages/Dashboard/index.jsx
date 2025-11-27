import { useEffect, useState } from "react"
import Dashboard from "./Dashboard"
import AddEditEmployee from "../../components/AddEditEmployee";
import { useLoginContext } from "../../context/UserContext";


const DashboardPage = () => {
    
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen,setAddOpen] = useState(false)
    const [employeeData,setEmployeeData] = useState(null);
    const { userData } = useLoginContext();

    useEffect(() => {

      console.log("In dashboard page",userData)
    },[userData])

    return (
        <>
        <Dashboard    user={userData ? userData : null} setEditOpen={setEditOpen} setAddOpen={setAddOpen} setEmployeeData={setEmployeeData}/>
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