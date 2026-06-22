import React, { useState, useEffect } from "react";
import { TodoShape } from "../@types/todos";

type localStorageType = [TodoShape[],  React.Dispatch<TodoShape[]>];
const defaultValue = [{ id: "1", task: "none", completed: false }];
function useLocalStorageState(key: string): localStorageType{
  const [state, setState] = useState<TodoShape[]>(() => {
    let localStorageVal;
    try {
        localStorageVal = JSON.parse(window.localStorage.getItem(key) || String(defaultValue));
    } catch (e) {
      console.error(e)
    }
    return localStorageVal;
  });

  return [state, setState];
};

export default useLocalStorageState;
