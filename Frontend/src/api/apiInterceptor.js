import axios from "axios";

const apiInterceptor = axios.create({
  baseURL: "http://localhost:8080",
});

apiInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
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
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized! Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default apiInterceptor;
