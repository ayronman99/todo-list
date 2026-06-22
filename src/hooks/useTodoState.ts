import useLocalStorageState from "./useLocalStorageState";
import { v4 as uuid } from "uuid";
import { TodoShape } from "../@types/todos";
export default () =>{
  
  const [todos, setTodos] = useLocalStorageState("todos");
  
  return {
    todos,
    addTodo: (newTodoText: string)  => {
      setTodos([...todos, { id: uuid(), task: newTodoText, completed: false }]);
    },
    removeTodo: (todoId: string) => {
      //filter out removed todo
      const updatedTodos = todos.filter((todo: TodoShape)=> todo.id !== todoId);
      //call setTodos with new todos array
      setTodos(updatedTodos);
    },
    toggleTodo: (todoId: string) => {
      const updatedTodos = todos.map((todo: TodoShape) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
    },
    updateTodo: (todoId: string, newTask: string) => {
      const updatedTodos = todos.map((todo: TodoShape) =>
        todo.id === todoId ? { ...todo, task: newTask } : todo
      );
      setTodos(updatedTodos);
    }
  };
};
