import axios from 'axios';
import apiInterceptor from './apiInterceptor';

export const useLogin = () => {
    const userLogin = async ({username,password}) => {
        try{
            const response = await axios.post("http://localhost:8080/auth/login",{
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
            return {success : false , data : error.response?.data?.message || "Login failed"};
        }
    }

    const userRegister = async ({username,email,password,name,roles}) => {
        try{

            const response = await axios.post("http://localhost:8080/auth/register",{
                email,
                password,
                username,
                name,
                role : "ROLE_ADMIN"
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