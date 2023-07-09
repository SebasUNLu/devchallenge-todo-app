"use client";

import { createContext, useState, useContext, PropsWithChildren } from "react";
import { ToDo, SavedData } from "../types/ToDo";

const emptySavedData: SavedData = {
  lastID: 0,
  savedTodos: [],
};
const savedData = localStorage.getItem("savedTodos");
// Saca los datos de lo que está guardado en el localstorage.
// Si no hay datos guardados, inicializa ambos
const { lastID, savedTodos }: SavedData = savedData
  ? (JSON.parse(savedData) as SavedData)
  : emptySavedData;

/**
 * Función generadora de IDs
 * @param lastId --> Es el ID inicial por el cual empieza a generar
 */
function* generatorID(lastId: number) {
  // yield --> para emitir valores
  let index = lastId;
  while (index >= 0) {
    // emite valor
    yield index++; // --> {value: 0, done: false}
  }
}
const generador = generatorID(lastID);

interface TodoContextProps {
  todos: ToDo[];
  addTodo: (title: string) => void;
  removeTodo: (todoID: number) => void;
  removeCompletedTodos: () => void;
  markTodo: (todoId: number) => void;
  getTodo: (todoID: number) => ToDo | null;
  getActiveTodos: (complete: boolean) => ToDo[];
}

const TodoContext = createContext<TodoContextProps>({
  todos: [],
  addTodo: () => {},
  markTodo: () => {},
  removeCompletedTodos: () => {},
  removeTodo: () => {},
  getTodo: () => null,
  getActiveTodos: () => [],
});

const TodoContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [todos, setTodos] = useState(savedTodos);

  const addTodo = (title: string) => {
    const newTodo: ToDo = {
      id: generador.next().value as number,
      title: title,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const removeTodo = (todoID: number) => {
    const restOfTodos = todos.filter((todo) => todo.id !== todoID);
    setTodos(restOfTodos);
  };

  const markTodo = (todoID: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoID) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const removeCompletedTodos = () => {
    const nonRemovedTodos = todos.filter((todo) => {
      if (todo.completed) return false;
      return true;
    });
    setTodos(nonRemovedTodos);
  };

  const getTodo = (todoID: number) => {
    let searchedTodo = null;
    todos.forEach((todo) => {
      if (todo.id === todoID) searchedTodo = todo;
    });
    return searchedTodo;
  };

  const getActiveTodos = (complete: boolean) => {
    const filteredTodos = todos.filter((todo) => todo.completed === complete);
    return filteredTodos;
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        removeCompletedTodos,
        removeTodo,
        markTodo,
        getActiveTodos,
        getTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;

export const useTodoContext = () => useContext(TodoContext);
