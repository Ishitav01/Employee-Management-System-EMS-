import axios from 'axios';
import apiInterceptor from './apiInterceptor';

export const useLogin = () => {
    const userLogin = async ({username,password}) => {
        try{
            const response = await axios.post("http://13.210.35.0:8080/auth/login",{
                username,
                password
            });

            const accessToken = response.data?.accessToken;
            const refreshToken = response.data?.refreshToken;

            console.log(response);
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

            const response = await axios.post("http://13.210.35.0:8080/auth/register",empData)


            const accessToken = response.data?.accessToken;
            const refreshToken = response.data?.refreshToken;

            console.log(response);
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