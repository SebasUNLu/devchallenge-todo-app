import { useTodoContext } from "@/app/utils/context/TodoContext";
import React, { useState } from "react";

interface TodoProps {
  todoID: number;
}

const Todo = ({ todoID }: TodoProps) => {
  const { markTodo, removeTodo, getTodo } = useTodoContext();
  const [marked, setMarked] = useState(false);
  const todo = getTodo(todoID);

  if (!todo) return <h1>No encontrado</h1>;

  const todoStyles = `${todo.completed ? `line-through` : ``}`;

  return (
    <div className="w-full flex">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => {
          markTodo(todo.id);
        }}
      />
      <p className={todoStyles}>{todo.title}</p>
    </div>
  );
};

export default Todo;
