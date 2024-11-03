import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProtectedRoute({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    async function authorize(){
        // check if user is authorized to visit the page

        const token = localStorage.getItem(ACCESS_TOKEN);

        if (token){
            const decode = jwtDecode(token);
            if (decode.exp <= Date.now()/1000 ){
                // refresh token if token is expired
                await refreshToken();
                return;
            }

            setIsAuthenticated(true);
            return;
        }
        setIsAuthenticated(false);
    }

    async function refreshToken(){
        // refresh access token
        const refresh = localStorage.getItem(REFRESH_TOKEN);

        // request for new access token
        api.post('api/token/refresh',{refresh:refresh})
        .then(res=>{
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            setIsAuthenticated(true);
        })
        .catch(error=>{
            setIsAuthenticated(false);
            console.log(error);
        });
    }

    useEffect(()=>{
        authorize();
    },[]);

    if(isAuthenticated == null){
        return <div>Loading...</div>
    }

    return isAuthenticated? children:<Navigate to='/login'/>
}

export default ProtectedRoute;