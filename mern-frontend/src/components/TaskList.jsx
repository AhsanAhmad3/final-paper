import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  
  // Fetch tasks from the backend
  useEffect(() => {
    axios.get("http://localhost:5000/tasks")
      .then(response => setTasks(response.data))
      .catch(error => console.log("Error fetching tasks:", error));
  }, []);

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(response => {
        // Filter out the task by _id
        setTasks(tasks.filter(task => task._id !== id)); 
      })
      .catch(error => console.log("Error deleting task:", error));
  };

  return (
    <div>
      <h2>Task List</h2>
      <TaskForm setTasks={setTasks} />
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.name}</strong> - {task.description} - {task.dueDate}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
