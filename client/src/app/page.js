"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home () {
  const [todos, setTodos] = useState([]);

  const fetchTodos = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <main className="container fade-in">
      <ThemeToggle />
      <h1 className="text-4xl font-bold text-center mb-8 mt-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-success">To-Do App</span>
      </h1>
      <div className="card p-8">
        <TodoForm fetchTodos={fetchTodos} />
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
            Your Tasks
          </h2>
          {todos.length === 0 ? (
            <div className="text-center py-8 rounded-lg border border-dashed border-input-border">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3 text-text-muted">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="9" x2="15" y2="9"></line>
                <line x1="9" y1="12" x2="15" y2="12"></line>
                <line x1="9" y1="15" x2="13" y2="15"></line>
              </svg>
              <p className="text-text-muted">No tasks yet. Add one above!</p>
            </div>
          ) : (
            <TodoList todos={todos} fetchTodos={fetchTodos} />
          )}
        </div>
      </div>
    </main>
  );
};
