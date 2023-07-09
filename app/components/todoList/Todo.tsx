import { useTodoContext } from "@/app/utils/context/TodoContext";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

interface TodoProps {
  todoID: number;
  enableDelete?: boolean;
}

const Todo = ({ todoID, enableDelete }: TodoProps) => {
  const { markTodo, removeTodo, getTodo } = useTodoContext();
  const todo = getTodo(todoID);

  if (!todo) return <h1>No encontrado</h1>;

  const markedStyles = `${todo.completed ? `line-through text-[#333333]` : ``}`;

  return (
    <div className="w-full flex my-6 items-center justify-between">
      <div className="flex">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => {
            markTodo(todo.id);
          }}
          className="w-6 h-6 rounded"
        />
        <p
          className={`${markedStyles} font-medium text-lg leading-5 ml-2 flex items-center`}
        >
          {todo.title}
        </p>
      </div>
      {enableDelete && (
        <div
          className="w-6 h-6 rounded-xl cursor-pointer hover:bg-slate-400 hover:scale-110 transition-all duration-300 hover:w-8 hover:h-8 hover:p-1"
          onClick={() => removeTodo(todo.id)}
        >
          <AiOutlineDelete className="w-full h-full" />
        </div>
      )}
    </div>
  );
};

export default Todo;
