import { useEffect, useState } from "react";
import api from "../api";

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
                <input type="checkbox" onChange={(e)=>{toogleComplete(e, task.id)}} checked={task.completed} ></input>
                <span>{task.task}</span>
                <button onClick={()=>{deleteTask(task.id)}}>Delete</button>
            </li>
        )
    })
    return(
        <div>
            <form onSubmit={createTask}>
                <input type="text" value={task} onChange={e=>{setTask(e.target.value)}}></input>
                <button>Add Task</button>
            </form>
            <ul>
                {taskslist}
            </ul>
        </div>
    )
}

export default Home;