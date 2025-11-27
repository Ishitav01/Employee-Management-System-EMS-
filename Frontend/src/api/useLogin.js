import axios from 'axios';
import apiInterceptor from './apiInterceptor';

const useLogin = () => {
    const userLogin = async ({email,password}) => {
        try{
            const response = await apiInterceptor.post("/api/login",{
                email,
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
            return {success : false , data : error.response?.data?.message || "Login failed"};
        }
    }

    const userRegister = async ({username,name,email,roles,password}) => {
        try{

            const response = await apiInterceptor.post("auth/register",{
                email,
                name,
                password,
                username,
                roles
            })

            const accessToken = response.data?.accessToken;
            const refreshToken = response.data?.refreshToken;

            if(accessToken){
                localStorage.setItem("accessToken",accessToken);
                localStorage.setItem("refreshToken",refreshToken);
            }

            return {success : true,data : response?.data};

        }
        catch(error){
            return {success : false , data : error.response?.data?.message || "Login failed"};
        }
    }

    return {userLogin, userRegister};
}