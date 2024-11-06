import { useEffect, useState } from "react";
import api from "../api";
import "../styles/Home.css"
import { Link } from "react-router-dom";

function Home(){
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    function getTasks(){
        api.get('api/todo/')
        .then(res=>{
            setTasks(res.data)
        })
        .catch(error=>{
            console.log(error);
        })
    }

    function createTask(e){
        e.preventDefault();

        api.post("api/todo/", {task:task})
        .then(res=>{
            getTasks();
        })
        .catch(error=>{
            console.log(error);
        });
    }

    function deleteTask(id){
        api.delete(`api/todo/delete/${id}/`)
        .then(()=>{
            getTasks();
        })
        .catch(error=>{
            console.log(error)
        })
    }

    function toogleComplete(e, id){
        const isComplete=e.target.checked

        api.patch(`api/todo/update/${id}/`, {completed:isComplete})
        .then(()=>{
            getTasks();
            if (isComplete){
                document.getElementById(id).classList.add("completed");
            } else {
                document.getElementById(id).classList.remove("completed");
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        getTasks();
    }, []);

    const taskslist = tasks.map(task=>{
        return(
            <li key={task.id}>
                <input type="checkbox" onChange={(e)=>{toogleComplete(e, task.id)}} checked={task.completed}></input>
                <span id={task.id} className={task.completed?"completed":''} >{task.task}</span>
                <button onClick={()=>{deleteTask(task.id)}} className="delete-btn">Delete</button>
            </li>
        )
    })
    return(
        <div>
            <nav>
                <span>ToDo App</span>
                <Link to="/logout">Log Out</Link>
            </nav>
            <div className="todo-app">
                <form onSubmit={createTask} className="todo-form">
                    <input type="text" value={task} onChange={e=>{setTask(e.target.value)}}></input>
                    <button>Add Task</button>
                </form>
                <ul>
                    {taskslist}
                </ul>
            </div>
        </div>
    )
}

export default Home;