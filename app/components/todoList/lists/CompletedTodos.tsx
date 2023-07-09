"use client";

import { useTodoContext } from "@/app/utils/context/TodoContext";
import React, { useEffect, useState } from "react";
import Todo from "../Todo";
import { ToDo } from "@/app/utils/types/ToDo";
import { AiOutlineDelete } from "react-icons/ai";

const CompletedTodos = () => {
  const { todos, getActiveTodos, removeCompletedTodos } = useTodoContext();
  const [completedTodos, setCompletedTodos] = useState<ToDo[]>([]);

  useEffect(() => {
    setCompletedTodos(getActiveTodos(true));
  }, [todos]);

  return (
    <>
      <div className="w-full">
        {completedTodos.map((todo) => (
          <Todo todoID={todo.id} key={`todo_${todo.id}`} enableDelete />
        ))}
      </div>
      {completedTodos.length ? (
        <button
          className="self-end flex items-center px-6 py-3 bg-[#EB5757] hover:bg-[#EB5757E5] text-white rounded"
          onClick={removeCompletedTodos}
        >
          <AiOutlineDelete className="mr-2" />
          Remove all
        </button>
      ) : null}
    </>
  );
};

export default CompletedTodos;
