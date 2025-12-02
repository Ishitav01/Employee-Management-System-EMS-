
import axios from 'axios';
import apiInterceptor from './apiInterceptor';

export const useEmployee = () => {

  const BASE_URL = "http://localhost:8080";

    const getAllEmployeesCeo = async () => {
    try {
      const response = await apiInterceptor.get(`${BASE_URL}/api/ceo/all-employees`);
      return response.data; // return employee list
    } catch (error) {
      return {success : false , data : error.response?.data || "Error fetching employees"};
    }
  }
  const getAllEmployeesAdmin = async () => {
    try {
      const response = await apiInterceptor.get(`${BASE_URL}/api/admin/employees`);
      return response.data; // return employee list
    } catch (error) {
      return {success : false , data : error.response?.data || "Error fetching employees"};
    }
  }

    const addEmployee = async (emp) => {
  try {
    const response = await apiInterceptor.post(
      `${BASE_URL}/api/admin/employees`,emp
    );

    return { success: true, data: response.data||"Employee added" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: error.response?.data || "Error adding the employee"
    };
  }
};


    const editEmployee = async (updatedData) => {
    try {
      
      console.log("Updating employee in hook:", updatedData);
    const response = await apiInterceptor.put(
      `${BASE_URL}/api/admin/employees`,
      {
        ...updatedData  
      }
    );
    return { success: true, data: response.data }
  } catch (error) {
    return {
      success: false,
      data: error.response?.data || "Error updating employee"
    }
  }}
    const deleteEmployee = async (id) => {
        try{
            const response = apiInterceptor.delete(`${BASE_URL}/api/admin/employees`,{
                params : {
                  id
                }
            })
            return { success: true, data: response.data || "Employee deleted" };
        }
        catch(error){
            return {success: false,
      data: error.response?.data || "Error deleting the employee"}
        }
    }

    return {getAllEmployeesAdmin,getAllEmployeesCeo,addEmployee , editEmployee, deleteEmployee};
}
