import { useReducer, useEffect } from "react";
import type { TodoShape, TodoActionObjectType } from "../@types/todos";
import todoReducer from "./todo.reducer";

type localStorageType = [
  TodoShape[],
  React.Dispatch<Partial<TodoActionObjectType>>,
];

function useLocalStorageStateReducer(
  key: string,
  defaultValue: TodoShape[],
  reducer: typeof todoReducer,
): localStorageType {
  function reducerInitializer(defaultValue: TodoShape[]) {
    let localStorageVal;
    try {
      localStorageVal = JSON.parse(
        window.localStorage.getItem(key) || String(defaultValue),
      );
    } catch (e) {
      localStorageVal = defaultValue;
      console.error(e, "error here");
    }
    return localStorageVal;
  }

  const [state, dispatchLocalState] = useReducer(
    reducer,
    defaultValue,
    reducerInitializer,
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, dispatchLocalState];
}

export default useLocalStorageStateReducer;
