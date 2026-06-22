import { Paper, List, Divider } from "@mui/material";
import { useContext } from "react";
import type { TodoShape } from "./@types/todos";
import { TodosContext } from "./context/todos.context";
import Todo from "./Todo";

function TodoList() {
  const todoState = useContext(TodosContext) as TodoShape[];

  if (todoState.length >= 1) {
    return (
      <Paper>
        <List>
          {todoState.map((todoItems: TodoShape, index) => (
            <div key={todoItems.id}>
              <Todo {...todoItems} key={todoItems.id} />
              {index < todoState.length - 1 && (
                <Divider key={todoItems.id + index} />
              )}
            </div>
          ))}
        </List>
      </Paper>
    );
  } else {
    return (
      <Paper>
        <section className="hero">
          <div className="hero-body">
            <p className="title">Uh Oh! 😔</p>
            <p className="subtitle">You seem to have nothing to do.</p>
          </div>
        </section>
      </Paper>
    );
  }
}

export default TodoList;
