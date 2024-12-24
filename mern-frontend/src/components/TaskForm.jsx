import React, { useState } from "react";
import axios from "axios";

function TaskForm({ setTasks }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const addTask = () => {
    if (!name || !description || !dueDate) {
      alert("Please fill in all fields.");
      return;
    }

    const newTask = { name, description, dueDate };
    axios.post("http://localhost:5000/tasks", newTask)
      .then(response => {
        setTasks((prevTasks) => [...prevTasks, response.data]);
        setName("");
        setDescription("");
        setDueDate("");
      })
      .catch(error => console.log("Error adding task:", error));
  };

  return (
    <div>
      <h3>Add Task</h3>
      <input
        type="text"
        placeholder="Task Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
}

export default TaskForm;
