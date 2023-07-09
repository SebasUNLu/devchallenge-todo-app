"use client";

import { useTodoContext } from "@/app/utils/context/TodoContext";
import React, { useEffect, useState } from "react";
import Todo from "../Todo";
import { ToDo } from "@/app/utils/types/ToDo";

const CompletedTodos = () => {
  const { todos, getActiveTodos } = useTodoContext();
  const [completedTodos, setCompletedTodos] = useState<ToDo[]>([]);

  useEffect(() => {
    setCompletedTodos(getActiveTodos(true));
  }, [todos]);

  return (
    <div className="w-full">
      <h1>Completed Todos</h1>
      {completedTodos.map((todo) => (
        <Todo todoID={todo.id} key={`todo_${todo.id}`} />
      ))}
    </div>
  );
};

export default CompletedTodos;
