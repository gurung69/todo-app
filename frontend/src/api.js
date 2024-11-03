import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
    baseURL:process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use((config)=>{
    // add access token to each request if exists
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
});

export default api;