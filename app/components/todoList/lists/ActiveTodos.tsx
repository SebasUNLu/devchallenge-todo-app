"use client";

import { useTodoContext } from "@/app/utils/context/TodoContext";
import React, { useEffect, useState } from "react";
import Todo from "../Todo";
import { ToDo } from "@/app/utils/types/ToDo";

const ActiveTodos = () => {
  const { todos, getActiveTodos } = useTodoContext();
  const [activeTodos, setActiveTodos] = useState<ToDo[]>([]);

  useEffect(() => {
    setActiveTodos(getActiveTodos(false));
  }, [todos]);

  return (
    <div className="w-full">
      <h1>Active Todos</h1>
      {activeTodos.map((todo) => (
        <Todo todoID={todo.id} key={`todo_${todo.id}`} />
      ))}
    </div>
  );
};

export default ActiveTodos;
