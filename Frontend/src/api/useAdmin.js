import apiInterceptor from "../api/apiInterceptor"; // adjust path if needed

export const useAdmin = () => {
  const base = "http://13.210.35.0:8080/api/ceo";

  const createAdmin = async ({username,email,name,password}) => {
    // adminReq: { name, username, password, email }
    try {
      const response = await apiInterceptor.post(`${base}/create-admin`, {
        name,
        email,
        password,
        username
      });
      // controller returns created admin object (id,name,username,email)
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        data: error.response?.data || error.message || "Error creating admin",
      };
    }
  };

  const removeAdmin = async (username) => {
    try {
      const response = await apiInterceptor.delete(`${base}/remove-admin`, {
        params: { username },
      });
      // response.data is message
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        data: error.response?.data || error.message || "Error removing admin",
      };
    }
  };

  const updateAdmin = async ({username,email,name,password}) => {
    // adminReq: { name, username, password, email }
    try {
      const response = await apiInterceptor.put(`${base}/update-admin`,{
        name,
        email,
        password,
        username
      } );
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        data: error.response?.data || error.message || "Error updating admin",
      };
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await apiInterceptor.get(`${base}/all-users`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        data: error.response?.data || error.message || "Error fetching users",
      };
    }
  };

  const getAllEmployees = async () => {
    try {
      const response = await apiInterceptor.get(`${base}/all-employees`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        data: error.response?.data || error.message || "Error fetching employees",
      };
    }
  };

  const getAllAdmins = async () => {
  try {
    const response = await apiInterceptor.get(`${base}/all-admins`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      data: error.response?.data || "Error fetching admins"
    };
  }
};

  return {
    createAdmin,
    removeAdmin,
    updateAdmin,
    getAllUsers,
    getAllEmployees,
    getAllAdmins
  };
}
