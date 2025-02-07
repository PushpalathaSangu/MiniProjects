import { useState, useEffect } from "react";
import Create from "./Create";
import axios from "axios";
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";
import "../App.css";

export default function Home() {
    const [todos, setTodos] = useState([]);

    // Helper function to fetch the todos from the backend
    const fetchTodos = () => {
        axios.get("http://localhost:3001/get")
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleEdit = (id) => {
        // Added missing slash in the URL and refetch todos after update
        axios.put("http://localhost:3001/update/" + id)
            .then(result => {
                location.reload(result);
                fetchTodos();
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        // Call the delete endpoint and refetch todos after deletion
        axios.delete("http://localhost:3001/delete/" + id)
            .then(result => {
                console.log(result);
                fetchTodos();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="home">
            <h2>Todo List</h2>
            <Create />
            {
                todos.length === 0
                    ? <div><h3>No Record</h3></div>
                    : todos.map((todo, index) => (
                        <div className="task" key={index}>
                            <div className="checkbox" onClick={() => handleEdit(todo._id)}> 
                                {
                                    todo.done ?
                                    <BsFillCheckCircleFill className="icon" /> :
                                    <BsCircleFill className="icon" />
                                } 
                                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                            </div>
                            <div>
                                <span onClick={() => handleDelete(todo._id)}>
                                    <BsFillTrashFill className="icon" />
                                </span>
                            </div>
                        </div>
                    ))
            }
        </div>
    );
}
