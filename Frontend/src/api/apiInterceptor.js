import { Snackbar } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "../context/SnackbarContext";

const apiInterceptor = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

apiInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {

        const refreshResponse = await axios.get(
          `${baseURL}/auth/refresh`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
            },
          }
        );

        const newAccessToken = refreshResponse.data.accessToken;
        const newRefreshToken=refreshResponse.data.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return apiInterceptor(error.config);

      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);


export default apiInterceptor;
