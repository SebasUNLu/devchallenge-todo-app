"use client";

import { useTodoContext } from "@/app/utils/context/TodoContext";
import React from "react";

const TodoList = () => {
  const { todos, addTodo, markTodo, removeCompletedTodos, removeTodo } =
    useTodoContext();
  console.log('hi')
  return (
    <div className="">
      <h1>TODOS</h1>
      {todos.map((todo) => (
        <div className="my-4" key={`todo_${todo.id}`}>
          <h1>{todo.title}</h1>
          <h2>Id: {todo.id}</h2>
          <h3>Completed: {todo.completed ? "true" : "false"}</h3>
          <button
            className="p-1 bg-green-800"
            onClick={() => {
              markTodo(todo.id);
            }}
          >
            Mark This
          </button>
          <button
            className="p-1 bg-red-800"
            onClick={() => {
              removeTodo(todo.id);
            }}
          >
            Remove this
          </button>
        </div>
      ))}
      <button
        className="p-3 bg-blue-900"
        onClick={() => {
          addTodo("This is a todo");
        }}
      >
        Add Todo
      </button>
      <button
        className="p-3 bg-blue-900"
        onClick={() => {
          removeCompletedTodos();
        }}
      >
        Remove completed
      </button>
    </div>
  );
};

export default TodoList;
