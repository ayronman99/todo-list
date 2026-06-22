import { createContext } from "react";
import type { PropsWithChildren } from "react";
import todoReducer from "../reducers/todo.reducer";
import type { dispatcherHandler, TodoActionObjectType, TodoShape } from "../@types/todos";
import useLocalStorageStateReducer from "../reducers/useLocalStorageReducer";

const defaultInitValues = [{ id: "id1", task: "default task", completed: false }];
   
export const TodosContext = createContext<TodoShape[] | null>(null);
export const DispatcherContext = createContext<dispatcherHandler<TodoActionObjectType>| null>(null);

export function TodosContextProvider(props: PropsWithChildren) {
    const [todoState, dispatchTodos] = useLocalStorageStateReducer("todos", defaultInitValues, todoReducer);

    return (
        <TodosContext.Provider value={todoState}>
            <DispatcherContext.Provider value={dispatchTodos}>
                {props.children}
            </DispatcherContext.Provider>
        </TodosContext.Provider>
    )
}

