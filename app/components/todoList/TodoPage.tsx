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

  const viewOptionsStyle = `cursor-pointer h-full w-2/12 text-center flex items-center justify-center `;

  return (
    <>
      <div className="w-full h-[50px] flex border-b border-[#BDBDBD] justify-around">
        <div
          className={`${viewOptionsStyle} ${
            currentView === "all"
              ? `border-b-4 border-[#2F80ED]`
              : `hover:border-b-4 hover:border-[#BDBDBD]`
          }`}
          onClick={() => {
            changeView("all");
          }}
        >
          All
        </div>
        <div
          className={`${viewOptionsStyle} ${
            currentView === "active"
              ? `border-b-4 border-[#2F80ED]`
              : `hover:border-b-4 hover:border-[#BDBDBD]`
          }`}
          onClick={() => {
            changeView("active");
          }}
        >
          Active
        </div>
        <div
          className={`${viewOptionsStyle} ${
            currentView === "completed"
              ? `border-b-4 border-[#2F80ED]`
              : `hover:border-b-4 hover:border-[#BDBDBD]`
          }`}
          onClick={() => {
            changeView("completed");
          }}
        >
          Completed
        </div>
      </div>
      <form className="w-full h-14 flex gap-6 my-4" onSubmit={handleSubmit}>
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
          className="w-3/12 cursor-pointer bg-[#2F80ED] hover:bg-[#2F80EDE5] rounded-xl text-white"
        />
      </form>
      <TodoList currentView={currentView} />
    </>
  );
};

export default TodoPage;
