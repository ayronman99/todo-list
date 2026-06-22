import { useContext, useState } from "react";
import type { ReactElement } from "react";
import { TextField, Paper, Button } from "@mui/material";
import useInputState from "./hooks/useInputState";
import { DispatcherContext } from "./context/todos.context";
import type { dispatcherHandler, TodoActionObjectType } from "./@types/todos";

function TodoForm(): ReactElement {
  const [value, handleChange, reset] = useInputState("");
  const dispatchTodos = useContext(
    DispatcherContext,
  ) as dispatcherHandler<TodoActionObjectType>;
  const [isEmptyMsg, setIsEmptyMsg] = useState("");

  return (
    <Paper>
      <p style={{ color: "red" }}>{isEmptyMsg}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (value.trim() === "") {
            setIsEmptyMsg("Todo cannot be empty");
            return;
          }
          dispatchTodos({ type: "ADD", task: value });
          reset();
        }}
      >
        <div className="flex justify-evenly gap-2 p-2">
          <TextField
            className="border-5 border-red-300"
            value={value}
            onChange={handleChange}
            label="Add New Todo"
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="border-5 border-red-300"
            disabled={!value}
          >
            Enter
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default TodoForm;
