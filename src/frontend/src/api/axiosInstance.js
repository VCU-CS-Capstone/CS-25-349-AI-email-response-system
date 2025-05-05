import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000", // backend local server URL
  timeout: 0,
  headers: { "Content-Type": "application/json" },
}); // create the axios instance

// add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before the request is sent
    // For example, add an authentication token to the headers
    const token = localStorage.getItem("authToken"); // taking auth token from local Storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Handle the error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    //forbidden or unauthorized returned
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem("authToken");
      // redirect to landing page
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
