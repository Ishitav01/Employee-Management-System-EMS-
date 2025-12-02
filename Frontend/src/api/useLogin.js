import axios from 'axios';

export const useLogin = () => {
      const BASE_URL = import.meta.env.VITE_BASE_URL;

    const userLogin = async ({username,password}) => {
        try{
            const response = await axios.post(`${BASE_URL}/auth/login`,{
                username,
                password
            });

            const accessToken = response.data?.accessToken;
            const refreshToken = response.data?.refreshToken;

            if(accessToken){
                localStorage.setItem("accessToken",accessToken);
                localStorage.setItem("refreshToken",refreshToken);
            }

            return {success : true,data : response?.data};
        }
        catch(error){
            return {success : false , data : error.response?.data || "Login failed"};
        }
    }

    const userRegister = async (empData) => {
        try{

            const response = await axios.post(`${BASE_URL}/auth/register`,empData)


            const accessToken = response.data?.accessToken;
            const refreshToken = response.data?.refreshToken;

            if(accessToken){
                localStorage.setItem("accessToken",accessToken);
                localStorage.setItem("refreshToken",refreshToken);
            }

            return {success : true,data : response?.data};

        }
        catch(error){
            return {success : false , data : error?.response?.data || "Login failed"};
        }
    }

    return {userLogin, userRegister};
}