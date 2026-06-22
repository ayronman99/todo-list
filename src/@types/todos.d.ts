export type TodoShape = {
    id: string;
    task: string;
    completed: boolean;
}

export type useToDoProps = {
    todos: TodoShape[];
    addTodo: (newTodoText: string) => void;
    removeTodo: (todoId: string) => void;
    toggleTodo: (todoId: string) => void;
    updateTodo: (todoId: string, newTask: string) => void;
}

export interface TodoActionObjectType {
    type: "ADD" | "REMOVE" | "TOGGLE" | "UPDATE" ;
    id: string;
    task: string;
    newTask: string;
    completed: boolean;
}

export type dispatcherHandler<T> = React.Dispatch<Partial<T>>;

export interface TodoContextValue {
    todoState: TodoShape[];
    dispatchTodos: dispatcherHandler;
  }