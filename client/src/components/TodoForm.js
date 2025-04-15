"use client";
import { useState } from "react";
import axios from "axios";

const TodoForm = ({ fetchTodos }) => {
  const [task, setTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      await axios.post("http://localhost:5000/api/todos", { task });
      setTask("");
      fetchTodos(); // Refresh the list
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6 fade-in">
      <input
        type="text"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="p-3 rounded-lg"
      />
      <button type="submit" className="btn btn-primary min-w-[80px]">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
