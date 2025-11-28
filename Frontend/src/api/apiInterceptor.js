import { Snackbar } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "../context/SnackbarContext";

const apiInterceptor = axios.create({
  baseURL: "http://localhost:8080",
});

apiInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return token;
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
    const ShowSnackbar={useSnackbar};
    if (error.response && error.response.status === 401) {
      try {
        // Call refresh endpoint
        const refreshResponse = await axios.get(
          "http://localhost:8080/auth/refresh",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
            },
          }
        );

        const newAccessToken = refreshResponse.data.accessToken;
        const newRefreshToken=refreshResponse.data.refreshToken;
        // Store updated token
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        // Retry original request with new token
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return apiInterceptor(error.config);

      } catch (refreshError) {
        ShowSnackbar("Refresh token failed, redirecting to login...");
        localStorage.clear();
        window.location.href = "/";//return to login
      }
    }

    return Promise.reject(error);
  }
);


export default apiInterceptor;
