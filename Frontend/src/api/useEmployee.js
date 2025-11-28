import axios from 'axios';
import apiInterceptor from './apiInterceptor';

export const useEmployee = () => {

    const getAllEmployeesCeo = async () => {
    try {
      const response = await apiInterceptor.get("http://localhost:8080/api/ceo/all-employees");
      return response.data; // return employee list
    } catch (error) {
      return {success : false , data : error.response?.data || "Error fetching employees"};
    }
  }
  const getAllEmployeesAdmin = async ({username}) => {
    try {
      const response = await apiInterceptor.get("http://localhost:8080//api/admin/employees",{
        username 
      });
      return response.data; // return employee list
    } catch (error) {
      return {success : false , data : error.response?.data || "Error fetching employees"};
    }
  }

    const addEmployee = async ({emp}) => {
  try {
    const response = await apiInterceptor.post(
      "http://localhost:8080/api/admin/employees",{
          ...emp
      }
    );

    return { success: true, data: response.data||"Employee added" };
  } catch (error) {
    return {
      success: false,
      data: error.response?.data || "Error adding the employee"
    };
  }
};


    const editEmployee = async ({username}) => {
    try {
    const response = await apiInterceptor.put(
      "http://localhost:8080/api/admin/employees",
      {
        username,
        ...update   // spread updated fields
      }
    );
    return { success: true, data: response.data }
  } catch (error) {
    return {
      success: false,
      data: error.response?.data || "Error updating employee"
    }
  }}
    const deleteEmployee = async (username) => {
        try{
            const response = apiInterceptor.delete("http://localhost:8080/api/admin/employees",{
                username
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