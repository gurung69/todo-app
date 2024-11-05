import { useState } from "react";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";

function Form({method, route}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const name = method==="login"? "Log In":"Register"
    const navigate = useNavigate();

    async function hanldeSubmission(e){
        e.preventDefault();

        const userData={
            username: username,
            password: password,
        }

        api.post(route, userData)
        .then((res)=>{
            if (method === "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/');
            }
            else{
                navigate('/login')
            }
        })
        .catch(error=>{
            console.log(error);
        });
    }

    return(
        <div>
            <h1>{name}</h1>
            <form onSubmit={hanldeSubmission}>
                <input type="text" placeholder="User name" value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                <button>{name}</button>
            </form>
        </div>
    )
}

export default Form;