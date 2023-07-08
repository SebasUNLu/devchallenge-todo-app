export interface ToDo {
  id: number;
  title: string;
  completed: boolean;
}

export interface SavedData {
  savedTodos: ToDo[];
  lastID: number;
}