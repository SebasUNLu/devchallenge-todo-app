"use client";

import { useTodoContext } from "@/app/utils/context/TodoContext";
import React, { useState } from "react";
import TodoList from "./TodoList";

export interface CurrentView {
  all: boolean;
  active: boolean;
  completed: boolean;
}

const TodoPage = () => {
  // Por default muestra todos
  const [currentView, setCurrentView] = useState<keyof CurrentView>("all");
  const [inputValue, setInputValue] = useState("");

  const { addTodo } = useTodoContext();

  const changeView = (view: keyof CurrentView) => {
    // const newView: CurrentView = {
    //   all: false,
    //   active: false,
    //   completed: false,
    // };
    // newView[view] = true;
    setCurrentView(view);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputValue && addTodo(inputValue);
  };

  return (
    <>
      <div className="w-full flex">
        <div
          className="bg-red-800 w-full text-center"
          onClick={() => {
            changeView("all");
          }}
        >
          All
        </div>
        <div
          className="bg-blue-800 w-full text-center"
          onClick={() => {
            changeView("active");
          }}
        >
          Active
        </div>
        <div
          className="bg-green-800 w-full text-center"
          onClick={() => {
            changeView("completed");
          }}
        >
          Completed
        </div>
      </div>
      <form className="w-full h-14 flex gap-6 my-8" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fname"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add details"
          className="w-9/12 border border-[#BDBDBD] border-solid rounded-xl px-3"
        />
        <input
          type="submit"
          value="Submit"
          className="w-3/12 cursor-pointer bg-[#2F80ED] rounded-xl text-white"
        />
      </form>
      <TodoList currentView={currentView} />
    </>
  );
};

export default TodoPage;
