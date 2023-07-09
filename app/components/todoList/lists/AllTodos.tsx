"use client";

import { useTodoContext } from "@/app/utils/context/TodoContext";
import React from "react";
import Todo from "../Todo";

const AllTodos = () => {
  const { todos } = useTodoContext();

  return (
    <div className="w-full">
      {todos.map((todo) => (
        <Todo todoID={todo.id} key={`todo_${todo.id}`} />
      ))}
    </div>
  );
};

export default AllTodos;
