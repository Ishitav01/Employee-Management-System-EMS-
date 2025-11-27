import { useState } from "react"
import Dashboard from "./Dashboard"
import AddEditEmployee from "../../components/AddEditEmployee";


const DashboardPage = () => {
    
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen,setAddOpen] = useState(false)
    const [employeeData,setEmployeeData] = useState(null);
    

    return (
        <>
        <Dashboard setEditOpen={setEditOpen} setAddOpen={setAddOpen} setEmployeeData={setEmployeeData}/>
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