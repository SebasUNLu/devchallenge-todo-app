import Image from "next/image";
import Header from "./components/header/Header";
import TodoList from "./components/todoList/TodoPage";

export default function Home() {
  return (
    <main className="flex min-h-screen max-w-xl flex-col items-center m-auto p-4">
      <Header />
      <TodoList />
    </main>
  );
}
