import React from "react";
import { CurrentView } from "./TodoPage";
import { useTodoContext } from "@/app/utils/context/TodoContext";
import AllTodos from "./lists/AllTodos";
import Todo from "./Todo";
import ActiveTodos from "./lists/ActiveTodos";
import CompletedTodos from "./lists/CompletedTodos";

interface todolistProps {
  currentView: keyof CurrentView;
}

const TodoList = ({ currentView }: todolistProps) => {
  const { todos } = useTodoContext();

  if (currentView === "active") return <ActiveTodos />;
  if (currentView === "completed") return <CompletedTodos />;
  return <AllTodos />;
};

export default TodoList;
