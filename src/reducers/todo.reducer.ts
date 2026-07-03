import { v4 as uuid } from "uuid";
import type { TodoActionObjectType, TodoShape } from "../@types/todos";

const todoReducer = (
  todoState: TodoShape[],
  action: Partial<TodoActionObjectType>,
): any => {
  switch (action.type) {
    case "ADD":
      return [
        ...todoState,
        {
          id: action.id ?? uuid(),
          task: action.task ?? "",
          completed: action.completed ?? false,
        },
      ];
    case "REMOVE":
      return todoState.filter((todo: TodoShape) => todo.id !== action.id);
    case "TOGGLE":
      return todoState.map((todo: TodoShape) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      );
    case "UPDATE":
      return todoState.map((todo: TodoShape) =>
        todo.id === action.id
          ? { ...todo, task: action.newTask ?? todo.task }
          : todo,
      );
    case "RESTORE": {
      const restoredTodo: TodoShape = {
        id: action.id ?? uuid(),
        task: action.task ?? "",
        completed: action.completed ?? false,
      };
      if (typeof action.index === "number" && action.index >= 0) {
        return [
          ...todoState.slice(0, action.index),
          restoredTodo,
          ...todoState.slice(action.index),
        ];
      }
      return [...todoState, restoredTodo];
    }
    default:
      return todoState;
  }
};

export default todoReducer;
