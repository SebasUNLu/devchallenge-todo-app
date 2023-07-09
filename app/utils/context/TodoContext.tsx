"use client";

import {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useEffect,
} from "react";
import { ToDo, SavedData } from "../types/ToDo";

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
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [lastId, setLastId] = useState(0);

  useEffect(() => {
    const savedData = localStorage.getItem("TodoState");
    if (savedData && JSON.parse(savedData)) {
      console.log("algo encontrado!");
      const savedTodos = JSON.parse(savedData) as SavedData;
      setTodos(savedTodos.savedTodos);
      setLastId(savedTodos.lastID);
    }
  }, []);

  useEffect(() => {
    console.log("Cambió la lista...");
    console.log("Guardando...");
    const savingData: SavedData = {
      savedTodos: todos,
      lastID: lastId,
    };
    localStorage.setItem("TodoState", JSON.stringify(savingData));
    console.log("Guardado!");
  }, [todos]);

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
  const generador = generatorID(lastId);

  const addTodo = (title: string) => {
    const nextId = generador.next().value as number;
    const newTodo: ToDo = {
      id: nextId,
      title: title,
      completed: false,
    };
    setLastId(nextId +1);
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
