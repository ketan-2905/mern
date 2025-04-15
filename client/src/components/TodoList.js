"use client";
import axios from "axios";

const TodoList = ({ todos, fetchTodos }) => {
  const handleToggle = async (id, completed) => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !completed });
      fetchTodos();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      fetchTodos();
    } catch (error) { 
      console.error("Error deleting task:", error);
    }
  };

  return (
    <ul className="space-y-3">
      {todos.map((todo, index) => (
        <li 
          key={todo._id} 
          className={`todo-item flex justify-between items-center ${todo.completed ? "completed" : ""}`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleToggle(todo._id, todo.completed)}
              className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${todo.completed ? "bg-success border-success" : "border-input-border"}`}
            >
              {todo.completed && (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </button>
            <span
              onClick={() => handleToggle(todo._id, todo.completed)}
              className={`task-text cursor-pointer ${todo.completed ? "completed" : ""}`}
            >
              {todo.task}
            </span>
          </div>
          <button 
            onClick={() => handleDelete(todo._id)} 
            className="btn btn-danger py-1 px-3 text-sm"
            aria-label="Delete task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
